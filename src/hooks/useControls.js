/**
 * @file useControls.js
 */
import * as React from 'react';
// EXAMPLE USAGE:
// const { forward, backward, left, right, jump } = useControls()

export const useControls = () => {
  const keys = React.useMemo(
    () => ({
      KeyW: 'forward',
      ArrowUp: 'forward',
      KeyS: 'backward',
      ArrowDown: 'backward',
      KeyA: 'left',
      ArrowLeft: 'left',
      KeyD: 'right',
      ArrowRight: 'right',
      Space: 'jump',
    }),
    [],
  );

  const moveFieldByKey = React.useCallback(key => keys[key], [keys]);

  const [movement, setMovement] = React.useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  React.useEffect(() => {
    const handleKeyDown = e => {
      setMovement(m => ({ ...m, [moveFieldByKey(e.code)]: true }));
    };
    const handleKeyUp = e => {
      setMovement(m => ({ ...m, [moveFieldByKey(e.code)]: false }));
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [moveFieldByKey]);

  return movement;
};
