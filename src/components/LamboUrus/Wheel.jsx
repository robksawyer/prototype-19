import * as React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import { useHelper } from '@react-three/drei';

function WheelModel(props) {
  const { nodes, materials } = useGLTF('/3d/models/lambo_urus/lambo_urus.glb');
  return (
    <group {...props} dispose={null}>
      <group
        position={[-10.64, 0, 0]}
        rotation={[-Math.PI, 0, Math.PI]}
        scale={[1.6, 1.51, 1.51]}
      >
        <group
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[0.65, 0.65, 0.65]}
        >
          <mesh
            geometry={nodes.Whl_HD_FL_004_3_Universal_Wheel_0.geometry}
            material={materials.Universal_Wheel}
          />
        </group>
        <group
          position={[0.15, 0, 11.18]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[0.65, 0.65, 0.65]}
        >
          <mesh
            geometry={nodes.Universal_Caliper_3_Universal_Wheel_0.geometry}
            material={materials.Universal_Wheel}
          />
        </group>
        <group position={[2.14, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
          <mesh
            geometry={nodes.wheel003_020_3_Chrome_0.geometry}
            material={materials.Chrome}
          />
        </group>
        <group position={[5.39, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
          <mesh
            geometry={nodes.wheel003_019_3_Chrome_0.geometry}
            material={materials.Chrome}
          />
        </group>
        <group
          position={[2.19, -0.31, -0.37]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
        >
          <mesh
            geometry={nodes.wheel003_018_3_RimsChrome_0.geometry}
            material={materials.RimsChrome}
          />
        </group>
        <group position={[2, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
          <mesh
            geometry={nodes.wheel003_015_3_BreakDiscs_0.geometry}
            material={materials.BreakDiscs}
          />
        </group>
        <mesh
          geometry={nodes.RR_TiresGum_0.geometry}
          material={materials.TiresGum}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/3d/models/lambo_urus/lambo_urus.glb');

const Wheel = React.forwardRef(function useW(
  { radius = 0.8, leftSide, ...props },
  ref,
) {
  //   useHelper(ref, THREE.BoxHelper, '#00ff00');

  useCylinder(
    () => ({
      mass: 1,
      type: 'Kinematic',
      collisionFilterGroup: 0,
      args: [radius, radius, 0.7, 16],
      ...props,
    }),
    ref,
  );

  return (
    <mesh ref={ref} castShadow>
      <mesh rotation={[0, 0, ((leftSide ? 1 : -1) * Math.PI) / 2]}>
        <WheelModel
          scale={[0.01, 0.01, 0.01]}
          rotation={[Math.PI, 0, Math.PI / 2]}
        />
      </mesh>
    </mesh>
  );
});

export default Wheel;
