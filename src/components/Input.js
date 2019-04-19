import React from 'react';

const Input = props => {
  const onChange =  props.onChange && ({target}) => props.onChange(target.value);
  return <input {...{...props, ...onChange && {onChange}}} />;
}

export default Input;
