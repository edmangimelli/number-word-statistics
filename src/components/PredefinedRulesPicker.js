import React from "react";
import rules from "../predefinedRules";

const PredefinedRulesList = ({ setAndResetTable, className }) => (
  <div className={className}>
    predefined rule sets:
    {Object.entries(rules).map(([nameOfRuleSet, rules]) => (
      <div className={className}>
        <button onClick={() => setAndResetTable(rules)}>{nameOfRuleSet}</button>
      </div>
    ))}
  </div>
);

export default PredefinedRulesList;
