import React from 'react';
import Select from 'react-select';
import './form.theme.scss';

export default function MultiSelect({
  height = 40,
  width = 200,
  isClearable = true,
  isSearchable = true,
  isDisabled = false,
  isLoading = false,
  isRtl = false,
  onChange,
  value,
  options = [],
  defaultValue,
  grouped = false,
  fontSize = "s",
  placeholder = "Select...",
}) {
  const formatGroupLabel = (data) => (
    <div className="text-gray-700 text-sm font-semibold">
      {data.label}
    </div>
  );

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "8px",
      border:"none",
      height: `${height}px`,
      minHeight: "36px",
      display: "flex",
      alignItems: "center",
    }),
    valueContainer: (base) => ({
      ...base,
      width: `${width}px`,
      padding: "8px",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: `var(--ps-txt-${fontSize})`,
      display: "flex",
      alignItems: "center",
    }),
    input: (base) => ({
      ...base,
      fontSize: `var(--ps-txt-${fontSize})`,
      padding: "0",
      margin: "0",
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: `var(--ps-txt-${fontSize})`,
      color: "#9ca3af",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      zIndex: 10,
    }),
    option: (base, state) => ({
      ...base,
      fontSize: `var(--ps-txt-${fontSize})`,
      backgroundColor: state.isSelected ? "#2563eb" : state.isFocused ? "#dbeafe" : "white",
      color: state.isSelected ? "white" : "black",
      padding: "10px",
    }),
  };

  return (
    <div className="w-full">
      <Select
        isMulti
        className="basic-multi-select"
        classNamePrefix="custom-select"
        styles={customStyles}
        placeholder={placeholder}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="multi-select"
        onChange={(value) => onChange(value)}
        options={options}
        value={value}
        formatGroupLabel={grouped ? formatGroupLabel : undefined}
      />
    </div>
  );
}
