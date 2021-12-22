/**
 * @file Chassis.jsx
 */
import * as React from 'react';
import { useBox } from '@react-three/cannon';

import AstonHQ from './AstonHQ';
import AstonLQ from './AstonLQ';
import Radar from './Radar/Radar';

export default function Chassis({
  rotation,
  position,
  angularVelocity,
  followCameraRef,
  chassisRef,
  time,
  playerRef,
  obstacles,
  quality = 3,
}) {
  const spotlightTarget = React.useRef();
  const [target, setTarget] = React.useState(undefined);

  // IMPORTANT: Set the car's visual dimensions (roughly)
  const boxSize = [1.7, 1, 4];

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
      {quality === 3 ? (
        <AstonHQ position={[0, -0.7, 0]} scale={0.01} />
      ) : (
        <AstonLQ position={[0, -0.7, 0]} scale={0.01} />
      )}
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
