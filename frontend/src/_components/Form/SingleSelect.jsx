import React, { useState } from 'react';
import Select from 'react-select';
import './form.theme.scss';

export default function SingleSelect({
  height = 40,
  isClearable,
  isSearchable,
  isDisabled,
  isLoading,
  isRtl,
  onChange,
  value,
  options,
  defaultValue,
  grouped = false,
}) {
  const formatGroupLabel = (data) => (
    <div
      style={{
        fontSize: 'var(--ps-txt-m)',
        color: 'var(--slate-700)',
      }}
    >
      <span>{data.label}</span>
    </div>
  );
  return (
    <>
      <Select
        className="custom-select"
        classNamePrefix="custom-select"
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: '8px',
            border: 'none',
            height: `${height}px`,
            minHeight: `30px`,
            flexWrap: 'nowrap',
            padding: 0,
          }),
          valueContainer: (base, state) => ({
            ...base,
            flexWrap: 'nowrap',
            padding: '8px',
          }),
          singleValue: (base, state) => ({
            ...base,
            height: `${height - 16}px`,
            fontSize: `var(--ps-txt-s)`,
            alignItem: 'center',
            display: 'flex',
          }),
          input: (base, state) => ({
            ...base,
            height: `${height - 16}px`,
            fontSize: `var(--ps-txt-s)`,
            padding: '0',
            margin: '0',
          }),
          placeholder: (base, state) => ({
            ...base,
            fontSize: `var(--ps-txt-s)`,
          }),
          menu: (base, state) => ({
            ...base,
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            borderRadius: 'none',
          }),
          option: (base, state) => ({
            ...base,
            height: `${height - 16}px`,
            fontSize: `var(--ps-txt-s)`,
            flexWrap: 'nowrap',
            padding: '5px',
          }),
        }}
        classNames={{
          control: (state) =>
            `custom-select__control ${state.isFocused ? 'is-focused' : ''}`,
          option: (state) =>
            `custom-select__option ${state.isFocused ? 'is-focused' : ''} ${state.isSelected ? 'is-selected' : ''}`,
        }}
        placeholder="Occupation"
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
        value={value}
        formatGroupLabel={grouped && formatGroupLabel}
      />
    </>
  );
}
