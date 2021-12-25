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
// import { useTweaks, makeFolder } from 'use-tweaks';

export const useWheels = (
  chassis = {
    // chassis - wheel connection helpers
    chassisWidth: 1.9,
    chassisHeight: 0, // ground clearance
    chassisFront: 1.3,
    chassisBack: -1.35,
  },
  details = {
    radius: 0.3,
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
  // const {
  //   chassisWidth,
  //   chassisHeight,
  //   chassisFront,
  //   chassisBack,
  //   radius,
  //   directionLocal,
  //   suspensionStiffness,
  //   suspensionRestLength,
  //   maxSuspensionForce,
  //   maxSuspensionTravel,
  //   dampingRelaxation,
  //   dampingCompression,
  //   frictionSlip,
  //   rollInfluence,
  //   axleLocal,
  //   chassisConnectionPointLocal,
  //   isFrontWheel,
  //   useCustomSlidingRotationalSpeed,
  //   customSlidingRotationalSpeed,
  // } = useTweaks('Vehicle', {
  //   ...makeFolder(
  //     'Chassis',
  //     {
  //       chassisWidth: { value: chassis.chassisWidth, min: -2, max: 2 },
  //       chassisHeight: { value: chassis.chassisHeight, min: -2, max: 2 },
  //       chassisFront: { value: chassis.chassisFront, min: -2, max: 2 },
  //       chassisBack: { value: chassis.chassisBack, min: -2, max: 2 },
  //     },
  //     true,
  //   ),
  //   ...makeFolder(
  //     'Details',
  //     {
  //       radius: { value: details.radius, min: -2, max: 2 },
  //       directionLocal: { value: JSON.stringify(details.directionLocal) },
  //       suspensionStiffness: {
  //         value: details.suspensionStiffness,
  //         min: -100,
  //         max: 100,
  //       },
  //       suspensionRestLength: {
  //         value: details.suspensionRestLength,
  //         min: -2,
  //         max: 2,
  //       },
  //       maxSuspensionForce: {
  //         value: Number(details.maxSuspensionForce).toPrecision(),
  //         min: -20000,
  //         max: 20000,
  //       },
  //       maxSuspensionTravel: {
  //         value: details.maxSuspensionTravel,
  //         min: -2,
  //         max: 2,
  //       },
  //       dampingRelaxation: {
  //         value: details.dampingRelaxation,
  //         min: -2,
  //         max: 2,
  //       },
  //       dampingCompression: {
  //         value: details.dampingCompression,
  //         min: -2,
  //         max: 2,
  //       },
  //       frictionSlip: { value: details.frictionSlip, min: -2, max: 2 },
  //       rollInfluence: { value: details.rollInfluence, min: -2, max: 2 },
  //       axleLocal: { value: JSON.stringify(details.axleLocal) },
  //       chassisConnectionPointLocal: {
  //         value: JSON.stringify(details.chassisConnectionPointLocal),
  //       },
  //       isFrontWheel: { value: details.isFrontWheel },
  //       useCustomSlidingRotationalSpeed: {
  //         value: details.useCustomSlidingRotationalSpeed,
  //       },
  //       customSlidingRotationalSpeed: {
  //         value: details.customSlidingRotationalSpeed,
  //         min: -100,
  //         max: 100,
  //       },
  //     },
  //     true,
  //   ),
  // });

  // const tweakedDetails = React.useMemo(
  //   () => ({
  //     radius,
  //     directionLocal: JSON.parse(directionLocal),
  //     suspensionStiffness,
  //     suspensionRestLength,
  //     maxSuspensionForce,
  //     maxSuspensionTravel,
  //     dampingRelaxation,
  //     dampingCompression,
  //     frictionSlip,
  //     rollInfluence,
  //     axleLocal: JSON.parse(axleLocal),
  //     chassisConnectionPointLocal: JSON.parse(chassisConnectionPointLocal),
  //     isFrontWheel,
  //     useCustomSlidingRotationalSpeed,
  //     customSlidingRotationalSpeed,
  //   }),
  //   [
  //     radius,
  //     directionLocal,
  //     suspensionStiffness,
  //     suspensionRestLength,
  //     maxSuspensionForce,
  //     maxSuspensionTravel,
  //     dampingRelaxation,
  //     dampingCompression,
  //     frictionSlip,
  //     rollInfluence,
  //     axleLocal,
  //     chassisConnectionPointLocal,
  //     isFrontWheel,
  //     useCustomSlidingRotationalSpeed,
  //     customSlidingRotationalSpeed,
  //   ],
  // );

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
      // ...tweakedDetails,
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
      // ...tweakedDetails,
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
      // ...tweakedDetails,
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
      // ...tweakedDetails,
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
