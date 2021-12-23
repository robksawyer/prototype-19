/**
 * @file Vehicle.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRaycastVehicle } from '@react-three/cannon';

import Chassis from './Chassis';
import Wheel from './Wheel';

import { useWheels } from '@/hooks/useWheels';

import styles from './Vehicle.module.css';

const Vehicle = ({
  chassisRef,
  vehicleRef,
  followCameraRef,
  position,
  rotation,
  angularVelocity,
  time,
  playerRef,
  obstacles,
  quality = 3,
}) => {
  // Get the wheel data
  const [wheels, wheelData] = useWheels();

  const [, api] = useRaycastVehicle(
    () => ({
      chassisBody: chassisRef,
      wheels,
      wheelData,
      indexForwardAxis: 2,
      indexRightAxis: 0,
      indexUpAxis: 1,
    }),
    vehicleRef,
  );

  console.log('api', api);

  return (
    <group ref={vehicleRef} api={api}>
      <Chassis
        chassisRef={chassisRef}
        followCameraRef={followCameraRef}
        rotation={rotation}
        position={position}
        angularVelocity={angularVelocity}
        time={time}
        playerRef={playerRef}
        obstacles={obstacles}
        quality={quality}
      />
      <Wheel ref={wheels[0]} leftSide />
      <Wheel ref={wheels[1]} />
      <Wheel ref={wheels[2]} leftSide />
      <Wheel ref={wheels[3]} />
    </group>
  );
};

Vehicle.propTypes = {};

export default Vehicle;
