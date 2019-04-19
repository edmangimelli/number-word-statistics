import React from 'react';

const Checkbox = ({for: obj, set}) => {
  const [key, value] = Object.entries(obj)[0];
  return (
    <input type='checkbox' checked={value} onClick={() => set({[key]: !value})} />
  );
}

export default Checkbox;
