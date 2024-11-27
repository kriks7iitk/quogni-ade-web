// components/BacktestHeader.js
import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption } from '../../../../_stores/Builderheader.reducer';
import lineData from '../../../../assets/candelstick_data';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import {
  fetchStockName,
  updateRightDrawerJourneyState,
  updateTitleState,
} from '../../../../_stores/right-drawer.reducer';
import { fetchStock } from '../../../../_stores/right-drawer.reducer';
import { cn } from '@/lib/utils';
import Select from 'react-select';
import { step2 } from '../../../../Utility/DriverSteps';
import { VisualBuilderContext } from '../../VisualBuilder';
import { updateSelectedStock } from '../../../../_stores/right-drawer.reducer';

const BackTestHeader = () => {
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
    <div className="w-full flex gap-1 justify-start items-center pr-10 m-5">
      <div>
        {!loading && (
          <Select
            className="back-test-select"
            classNamePrefix="select"
            defaultValue={stockList ? stockList[0].symbol : null}
            isDisabled={false}
            isLoading={loading}
            isClearable={true}
            isSearchable={true}
            name="benchmark"
            placeholder="Select the filter"
            options={
              stockList ? stockList.map((item, index) => item.symbol) : []
            }
          />
        )}
      </div>
    </div>
  );
};

export default BackTestHeader;
