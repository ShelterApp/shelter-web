import { useState } from 'react';

const useToggle: Function = (initial: boolean) => {
  const [isToggle, setToggle] = useState(initial);
  const toggle = (newValue: boolean) => {
    if (newValue != null) {
      setToggle(newValue);
    }
    setToggle(!isToggle);
  };
  return [isToggle, toggle];
};

export default useToggle;
