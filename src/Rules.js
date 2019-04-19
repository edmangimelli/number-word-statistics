import React from 'react';
import NumberInput from './components/NumberInput';
import Input from './components/Input';
import Checkbox from './components/Checkbox';

const createSetter = (rules, set, i) => obj => {
  set([
    ...rules.slice(0, i),
    {...rules[i], ...obj},
    ...rules.slice(i+1, rules.length),
  ]);
}

const Rules = ({set: setRules, rules, collapse}) => (
  <table>{
    rules.map(({value, word, multiplier}, i) => {
      const set = createSetter(rules, setRules, i);
      return (
        <tr>{
          [
            <NumberInput set={value => set({value})} name={i} value={value} />,
            <Input onChange={word => set({word})} value={word} />,
            <Checkbox for={{multiplier}} set={set} />,
          ].map(element => <td>{element}</td>)
        }</tr>
      );
   })
 }</table>
);

export default Rules;
