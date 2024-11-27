import React, { useState } from 'react';
import './form.theme.scss';
import SolidThemeIcon from '../../_icons/svgs/SolidThemeIcons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function InputField({
  leftIcon,
  type,
  id,
  placeholder,
  required,
  inputProps,
  width,
  customContainerStyle,
  customInputStyle,
  height,
  onChange,
  value,
}) {
  const [onFocus, setOnFocus] = useState(false);

  const renderInputField = () => {
    const containerStyle = {
      ...(width && { width: `${width}px` }),
      ...(!width && { width: '100%' }),
      ...customContainerStyle,
      ...(onFocus &&
        type == 'phone' && {
          borderColor: 'var(--ps-dark-blue)',
          boxShadow: '0 0 5px var(--ps-green-bright)',
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
      ...(!leftIcon && {
        // paddingLeft: '10px',
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
      }),
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
              inputProps={inputProps}
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
                <SolidThemeIcon name={leftIcon} />
              </div>
            )}
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              required={required}
              style={inputStyle}
              onChange={(event) => {
                const inputValue = event.target.value;
                onChange(inputValue);
              }}
              value={value}
            />
          </div>
        );
    }
  };

  return renderInputField();
}
