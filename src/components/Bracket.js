import React from "react";

const Bracket = props => {
  const { set, get, includeStr, excludeStr } = props;
  const include = get();
  return (
    <input
      readOnly
      className="bracket"
      onClick={() => set(!include)}
      value={include ? includeStr : excludeStr}
    />
  );
};

export default Bracket;
