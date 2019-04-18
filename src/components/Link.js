import React from 'react';

const Link = ({destinations, switcher, children, to}) => (
  <div>
    <button
      onClick={()=>switcher(to || destinations[children])}
    >
      {children}
    </button>
  </div>
);

export default Link;
