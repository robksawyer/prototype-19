/**
 * @file Vehicle.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRaycastVehicle } from '@react-three/cannon';

import Chassis from './Chassis';

import Wheel from '@/components/LamboUrus/Wheel';
import { useWheels } from '@/hooks/useWheels';

import styles from './Vehicle.module.css';

const Vehicle = ({
  chassisRef,
  vehicleRef,
  followCameraRef,
  position,
  rotation,
  angularVelocity,
  playerRef,
  obstacles,
}) => {
  // Get the wheel data
  const [wheels, wheelInfos] = useWheels();

  const [, api] = useRaycastVehicle(
    () => ({
      chassisBody: chassisRef,
      wheels,
      wheelInfos,
      indexForwardAxis: 2,
      indexRightAxis: 0,
      indexUpAxis: 1,
    }),
    vehicleRef,
  );

  return (
    <group ref={vehicleRef} api={api}>
      <Chassis
        chassisRef={chassisRef}
        followCameraRef={followCameraRef}
        rotation={rotation}
        position={position}
        angularVelocity={angularVelocity}
        playerRef={playerRef}
        obstacles={obstacles}
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
