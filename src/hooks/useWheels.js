/**
 * @file useWheels.js
 * Hook to help connect wheels to a vehicle. This can then be used
 * for React Three Fiber (R3F) Cannon physics.
 * @see https://chowdera.com/2021/02/20210202065428276l.html
 */

/**
 * chassisBody – Represents the rigid body of a car body
 * indexForwardAxis – Front axle index 0 = x,1 = y,2 = z
 * indexRightAxis – Front axle index 0 = x,1 = y,2 = z
 * indexUpAxis – Front axle index 0 = x,1 = y,2 = z
 */
import * as React from 'react';

export const useWheels = (
  chassis = {
    // chassis - wheel connection helpers
    chassisWidth: 1.6,
    chassisHeight: -0.2, // ground clearance
    chassisFront: 1.55,
    chassisBack: -1.35,
  },
  details = {
    radius: 0.4,
    directionLocal: [0, -1, 0], // same as Physics gravity
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    frictionSlip: 5,
    rollInfluence: 0.01,
    axleLocal: [-1, 0, 0], // wheel rotates around X-axis, invert if wheels rotate the wrong way
    chassisConnectionPointLocal: [1, 0, 1],
    isFrontWheel: false,
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
  },
) => {
  const wheel_1 = React.useRef();
  const wheel_2 = React.useRef();
  const wheel_3 = React.useRef();
  const wheel_4 = React.useRef();

  const { chassisWidth, chassisHeight, chassisFront, chassisBack } = chassis;

  // wheels
  const wheels = React.useMemo(() => [wheel_1, wheel_2, wheel_3, wheel_4], []);
  const wheelInfos = React.useMemo(() => {
    // FrontLeft [-X,Y,Z]
    const wheelDetail_1 = {
      ...details,
      chassisConnectionPointLocal: [
        -chassisWidth / 2,
        chassisHeight,
        chassisFront,
      ],
      isFrontWheel: true,
    };
    // FrontRight [X,Y,Z]
    const wheelDetail_2 = {
      ...details,
      chassisConnectionPointLocal: [
        chassisWidth / 2,
        chassisHeight,
        chassisFront,
      ],
      isFrontWheel: true,
    };
    // BackLeft [-X,Y,-Z]
    const wheelDetail_3 = {
      ...details,
      chassisConnectionPointLocal: [
        -chassisWidth / 2,
        chassisHeight,
        chassisBack,
      ],
      isFrontWheel: false,
    };
    // BackRight [X,Y,-Z]
    const wheelDetail_4 = {
      ...details,
      chassisConnectionPointLocal: [
        chassisWidth / 2,
        chassisHeight,
        chassisBack,
      ],
      isFrontWheel: false,
    };

    return [wheelDetail_1, wheelDetail_2, wheelDetail_3, wheelDetail_4];
  }, [chassisBack, chassisFront, chassisHeight, chassisWidth, details]);

  return [wheels, wheelInfos];
};
