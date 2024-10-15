// components/BacktestHeader.js
import React, { useState, useContext, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption } from '../../../../_stores/Builderheader.reducer';
import lineData from '../../../../assets/candelstick_data'; // Import the lineData array
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Button } from '@/components/ui/button';
import {
  fetchStockName,
  updateRightDrawerJourneyState,
  updateTitleState,
} from '../../../../_stores/right-drawer.reducer';
import { fetchStock } from '../../../../_stores/right-drawer.reducer';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { step2 } from '../../../../Utility/DriverSteps';
import { VisualBuilderContext } from '../../VisualBuilder';
import { updateSelectedStock } from '../../../../_stores/right-drawer.reducer';

const options = [
  {
    id: 1,
    stock: 'AAPL',
  },
  {
    id: 2,
    stock: 'MSFT',
  },
  {
    id: 3,
    stock: 'Reliance',
  },
  {
    id: 4,
    stock: 'Tata',
  },
];

const BacktestHeader = () => {
  const { subRoute } = useContext(VisualBuilderContext);
  const driverObj = driver({
    showProgress: true,
    steps: step2,
    allowClose: true,
    allowInteractions: true,
  });

  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state) => state?.rightDrawerData?.selectedStock,
  );
  const stockList = useSelector(
    (state) => state.rightDrawerData.data?.stockList,
  );
  const loading = useSelector((state) => state?.rightDrawerData?.data?.loading);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedOption);

  const handleSelectionChange = (currentValue) => {
    dispatch(updateSelectedStock(currentValue));
    dispatch(fetchStock(currentValue));
    dispatch(updateRightDrawerJourneyState('back-test'));
    dispatch(updateTitleState('Strategy list'));
    setOpen(false);
    if (subRoute === 'back-test') {
      driverObj.drive();
    }
  };

  useEffect(() => {
    dispatch(fetchStockName());
  }, []);

  return (
    <div className="w-full flex gap-1 justify-end items-center pr-10 m-5">
      <div>
        {!loading && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="stockDropdown"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between"
              >
                {selectedOption
                  ? stockList.find((item) => item.symbol === selectedOption)
                      ?.symbol
                  : 'Select Stock'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Select Stock" />
                <CommandList>
                  <CommandEmpty>No stock found.</CommandEmpty>
                  <CommandGroup>
                    {stockList &&
                      stockList.map((item, index) => (
                        <CommandItem
                          key={item.id}
                          value={item.symbol}
                          onSelect={() => handleSelectionChange(item.symbol)}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedOption === item.stock
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {item.symbol}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default BacktestHeader;
