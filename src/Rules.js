import React from 'react';
import NumberInput from './components/NumberInput';
import Input from './components/Input';
import Checkbox from './components/Checkbox';

const createSetter = (get, set, i) => obj => {
  const rules = get();
  set([
    ...rules.slice(0, i),
    {...rules[i], ...obj},
    ...rules.slice(i+1, rules.length),
  ]);
}

const Rules = ({set: setRules, get, collapse}) => (
  <table>{
    get().map(({value, word, multiplier}, i) => {
      const set = createSetter(get, setRules, i);
      return (
        <tr>{
          [
            <NumberInput set={value => set({value})} name={i} />,
            <Input onChange={word => set({word})} />,
            <Checkbox for={{multiplier}} set={set} />,
          ].map(element => <td>{element}</td>)
        }</tr>
      );
   })
 }</table>
);

export default Rules;
