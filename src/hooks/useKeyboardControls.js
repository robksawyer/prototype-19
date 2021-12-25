/**
 * @file useKeyboardControls.js
 */
import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store';

/**
 * useKeyPress
 * @param {*} target
 * @param {*} mode
 * @returns
 */
function useKeyPress(target, mode) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  // If pressed key is our target key then set to true
  const downHandler = e => {
    e.preventDefault();
    return e.key === target ? setKeyPressed(true) : null;
  };
  const upHandler = ({ key }) => (key === target ? setKeyPressed(false) : null);
  React.useEffect(() => {
    if (mode === 'keyboard') {
      // Add event listeners
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return keyPressed;
}

export const useKeyboardControls = (vehicleRef, resetPosition, clearPath) => {
  const { mode, setGauges } = useStore();
  const forward = useKeyPress('w', mode);
  const backward = useKeyPress('s', mode);
  const left = useKeyPress('a', mode);
  const right = useKeyPress('d', mode);
  const forwardArrow = useKeyPress('ArrowUp', mode);
  const backwardArrow = useKeyPress('ArrowDown', mode);
  const leftArrow = useKeyPress('ArrowLeft', mode);
  const rightArrow = useKeyPress('ArrowRight', mode);
  const brake = useKeyPress(' ', mode); // space bar
  const reset = useKeyPress('r', 'keyboard');

  useFrame(() => {
    if (reset) {
      resetPosition();
      clearPath();
    }
    if (mode !== 'keyboard' || !vehicleRef.current?.api) return;

    // if (chassisRef.current.position.y <= -192) {
    //   resetPosition();
    //   clearPath();
    //   return;
    // }

    let steering = 0;
    let braking = 0;
    let engine = 0;
    if ((left || leftArrow) && !right && !rightArrow) {
      steering = 0.5;
    } else if ((right || rightArrow) && !left && !leftArrow) {
      steering = -0.5;
    }

    if ((forward || forwardArrow) && !backward && !backwardArrow) {
      engine = -1500;
    } else if ((backward || backwardArrow) && !forward && !forwardArrow) {
      engine = 1500;
    }

    if (brake) {
      braking = 50;
    }

    vehicleRef.current.api.applyEngineForce(engine, 2);
    vehicleRef.current.api.applyEngineForce(engine, 3);

    vehicleRef.current.api.setSteeringValue(steering, 0);
    vehicleRef.current.api.setSteeringValue(steering, 1);

    for (let i = 0; i < 4; i++) {
      vehicleRef.current.api.setBrake(braking, i);
    }

    setGauges({
      steering: -steering * 2,
      accel: braking ? -1 : engine ? -engine / 1500 : 0,
    });
  });
};
