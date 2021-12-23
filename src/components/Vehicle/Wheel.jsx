/**
 * @file Wheel.jsx
 */
import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';

function WheelModel(props) {
  const { nodes, materials } = useGLTF('/3d/models/wheel.glb');
  return (
    <group {...props} dispose={null}>
      <mesh material={materials.Rubber} geometry={nodes.wheel_1.geometry} />
      <mesh material={materials.Steel} geometry={nodes.wheel_2.geometry} />
      <mesh material={materials.Chrom} geometry={nodes.wheel_3.geometry} />
    </group>
  );
}

useGLTF.preload('/3d/models/wheel.glb');

// A Wheel
const Wheel = forwardRef(({ leftSide }, ref) => {
  useCylinder(
    () => ({
      mass: 1,
      type: 'Kinematic',
      collisionFilterGroup: 0,
    }),
    ref,
  );

  return (
    <mesh ref={ref}>
      <mesh rotation={[0, 0, ((leftSide ? 1 : -1) * Math.PI) / 2]}>
        <WheelModel />
      </mesh>
    </mesh>
  );
});

export default Wheel;
