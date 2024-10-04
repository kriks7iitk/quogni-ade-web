'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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

const backtestings = [
  {
    value: 'Back Test 1',
    label: 'Back Test 1',
  },
  {
    value: 'Back Test 2',
    label: 'Back Test 2',
  },
];

export default function OptionsOverlay({ onSelectOption }) {
     const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="Ghost"
           role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
           + Add Backtesting
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] justify-start p-0">
        <Command>
          <CommandInput placeholder="Search for Backtesting..." />
          <CommandList>
            <CommandEmpty>No Tests found.</CommandEmpty>
            <CommandGroup>
              {backtestings.map((backtesting) => (
                <CommandItem
                  key={backtesting.value}
                  value={backtesting.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);

                   
                    onSelectOption(backtesting.label);
                  }}
                >
                  {backtesting.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
