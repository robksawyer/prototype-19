/**
 * @file Chassis.jsx
 */
import * as React from 'react';
import * as THREE from 'three';
import { useBox, Debug } from '@react-three/cannon';
import { useHelper } from '@react-three/drei';

import AstonHQ from './AstonHQ';
import AstonLQ from './AstonLQ';
import LamboUrus from '@/components/LamboUrus';
import Radar from './Radar/Radar';

import { useStore } from '@/store';

export default function Chassis({
  rotation,
  position,
  angularVelocity,
  followCameraRef,
  chassisRef,
  playerRef,
}) {
  const spotlightTarget = React.useRef();
  const [target, setTarget] = React.useState(undefined);
  const { vehicleDimensions: boxSize, quality, obstacles, time } = useStore();

  useHelper(chassisRef, THREE.BoxHelper, '#ff0000');

  const [, api] = useBox(
    () => ({
      mass: 500,
      position,
      rotation: rotation,
      angularVelocity: angularVelocity,
      args: boxSize,
      collisionFilterGroup: 2,
      collisionFilterMask: 1,
      // onCollide: onCollide,
      userData: {
        id: 'playerCar',
      },
    }),
    chassisRef,
  );

  React.useEffect(() => {
    setTarget(spotlightTarget.current);
  }, []);
  // const onCollide = (e) => {
  // console.log("bonk!", e.body.userData);
  // };

  return (
    <mesh ref={chassisRef} api={api}>
      <Radar playerRef={playerRef} obstacles={obstacles} />
      {/* {quality === 3 ? (
        <AstonHQ position={[0, -0.7, 0]} scale={0.01} />
      ) : (
        <AstonLQ position={[0, -0.7, 0]} scale={0.01} />
      )} */}
      <LamboUrus position={[0, 0.2, 0]} scale={0.01} />
      <object3D ref={followCameraRef} position={[0, 3, -8]} />
      <object3D ref={spotlightTarget} position={[0, -2, 10]} />
      {time === 'night' && (
        <>
          <spotLight
            position={[-0.8, -0.15, 1.9]}
            intensity={8}
            target={target}
            distance={20}
            angle={0.5}
            penumbra={0.4}
            color="rgb(24, 235, 254)"
          />
          <spotLight
            position={[0.8, -0.15, 1.9]}
            intensity={8}
            target={target}
            distance={20}
            angle={0.5}
            penumbra={0.4}
            color="rgb(24, 235, 254)"
          />
        </>
      )}
    </mesh>
  );
}
