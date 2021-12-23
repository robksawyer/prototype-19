/**
 * @file Obstacle.jsx
 */
import * as React from 'react';
import { useCylinder } from '@react-three/cannon';
import Cone from './Cone';

export default function Obstacle({ obstacle }) {
  const [ref] = useCylinder(() => ({
    mass: 1000,
    position: [obstacle.x, 3, obstacle.z],
    args: [0.75, 0.75, 1],
    collisionFilterGroup: 1,
    collisionFilterMask: 1 | 2,
    userData: {
      id: 'obstacle',
    },
  }));

  return (
    <mesh ref={ref} frustumCulled={false}>
      <Cone position={[0, -0.5, 0]} scale={0.5} />
    </mesh>
  );
}
