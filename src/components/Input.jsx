import React from 'react';

const Input = ({ data, handleChange, name, defaultValue, placeholder, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      defaultValue={data !== null ? defaultValue : ''}
      onChange={handleChange}
    />
  );
};

export default Input;
