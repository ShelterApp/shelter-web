import { useState, useEffect } from "react";
export const useBeforeFirstRender = (f: Function) => {
  const [hasRendered, setHasRendered] = useState(false);
  useEffect(() => setHasRendered(true), [hasRendered]);
  if (!hasRendered) {
    f();
  }
};
