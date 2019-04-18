import React from 'react';
import LINK from './components/Link';
import Main from './Main';

const Settings = ({switcher}) => {
  const Link = ({to, children}) => LINK({destinations: {Main}, to, switcher, children});
  return (
    <div>
      <Link to={Main}>Back</Link>
      <div>Settings:</div>;
    </div>
  );
}

export default Settings;
