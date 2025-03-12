import React, { useState, useEffect } from 'react';
import './form.theme.scss';
import SolidThemeIcon from '../../_icons/svgs/SolidThemeIcons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function InputField({
  leftIcon,
  type,
  id,
  isError = false,
  placeholder,
  required,
  inputProps,
  width,
  customContainerStyle,
  customInputStyle,
  height,
  disable,
  onChange,
  onBlur = () => {},
  value,
}) {
  const [onFocus, setOnFocus] = useState(false);

  const renderInputField = () => {
    const containerStyle = {
      ...(width && { width: `${width}px` }),
      ...(!width && { width: '100%' }),
      ...customContainerStyle,
      ...(onFocus &&
        !isError &&
        type == 'phone' && {
          borderColor: 'var(--gray-900)',
          boxShadow: '0 0 5px var(--slate-300)',
        }),
      ...(isError && {
        borderColor: 'var(--gray-900)',
        boxShadow: '0 0 5px var(--ps-error)',
      }),
      display: 'flex',
      flexDirection: 'row',
    };

    const inputStyle = {
      ...(width && { width: `${width}px` }),
      ...(!width && type == 'phone' && { width: `100%` }),
      ...(height && { height: `${height}px` }),
      ...(type == 'phone' && { border: 'none' }),
      ...customInputStyle,
      ...(type == 'date' && { paddingLeft: '10px' }),
      ...(!leftIcon && {
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
      }),
      paddingLeft:'10px',
      ...(isError && {}),
    };

    const buttonStyle = {
      border: 'none',
      background: 'var(--ps-white-1)',
    };

    switch (type) {
      case 'phone':
        return (
          <div>
            <PhoneInput
              country={'in'}
              preferredCountries={['us', 'in']}
              inputProps={{ ...inputProps, required }}
              containerStyle={containerStyle}
              inputStyle={inputStyle}
              buttonStyle={buttonStyle}
              onFocus={() => {
                setOnFocus(true);
              }}
              value={value}
              onChange={(value) => {
                onChange(value);
              }}
              onBlur={() => {
                setOnFocus(false);
                
              }}
            />
          </div>
        );
      default:
        return (
          <div className="input-field" style={containerStyle}>
            {leftIcon && (
              <div className="input-icon">
                <SolidThemeIcon name={leftIcon} width='18' />
              </div>
            )}
            <input
              type={type}
              id={id}
              disabled={disable}
              placeholder={placeholder}
              required={required}
              style={inputStyle}
              onChange={(event) => {
                const inputValue = event.target.value;
                onChange(inputValue);
              }}
              onBlur={onBlur}
              value={value}
            />
          </div>
        );
    }
  };

  return renderInputField();
}
