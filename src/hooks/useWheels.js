/**
 * @file useWheels.js
 * Hook to help connect wheels to a vehicle. This can then be used
 * for React Three Fiber (R3F) Cannon physics.
 */
import * as React from 'react';

const DEFAULT_SETTINGS = {
  // chassis - wheel connection helpers
  chassis: {
    width: 1.6,
    height: -0.15, // ground clearance
    front: 1.3,
    back: -1.35,
  },
  suspension: {
    stiffness: 30,
    restLength: 0.3,
    maxForce: 1e4,
    maxTravel: 0.3,
  },
  damping: {
    relaxation: 2.3,
    compression: 4.4,
  },
  wheel: {
    radius: 0.3,
    directionLocal: [0, -1, 0], // same as Physics gravity
    chassisConnectionPointLocal: [1, 0, 1],
    axleLocal: [-1, 0, 0], // wheel rotates around X-axis, invert if wheels rotate the wrong way
    frictionSlip: 5,
    rollInfluence: 0.01,
    isFrontWheel: false,
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
  },
};

export const useWheels = (wheelDetail = DEFAULT_SETTINGS) => {
  const wheel_1 = React.useRef();
  const wheel_2 = React.useRef();
  const wheel_3 = React.useRef();
  const wheel_4 = React.useRef();

  const { chassis, suspension, damping, wheel } = wheelDetail;
  const { width, height, front, back } = chassis;

  // wheels
  const wheels = React.useMemo(() => [wheel_1, wheel_2, wheel_3, wheel_4], []);
  const wheelData = React.useMemo(() => {
    // FrontLeft [-X,Y,Z]
    const wheelDetail_1 = {
      ...wheel,
      ...chassis,
      ...damping,
      ...suspension,
      chassisConnectionPointLocal: [-width / 2, height, front],
      isFrontWheel: true,
    };
    // FrontRight [X,Y,Z]
    const wheelDetail_2 = {
      ...wheel,
      ...chassis,
      ...damping,
      ...suspension,
      chassisConnectionPointLocal: [width / 2, height, front],
      isFrontWheel: true,
    };
    // BackLeft [-X,Y,-Z]
    const wheelDetail_3 = {
      ...wheel,
      ...chassis,
      ...damping,
      ...suspension,
      chassisConnectionPointLocal: [-width / 2, height, back],
      isFrontWheel: false,
    };
    // BackRight [X,Y,-Z]
    const wheelDetail_4 = {
      ...wheel,
      ...chassis,
      ...damping,
      ...suspension,
      chassisConnectionPointLocal: [width / 2, height, back],
      isFrontWheel: false,
    };
    return [wheelDetail_1, wheelDetail_2, wheelDetail_3, wheelDetail_4];
  }, [damping, suspension, wheel, chassis, width, height, front, back]);

  return [wheels, wheelData];
};
