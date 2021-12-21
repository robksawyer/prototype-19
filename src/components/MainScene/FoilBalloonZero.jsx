/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import * as React from 'react';
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const dummy = new THREE.Vector3();
const lookAtPos = new THREE.Vector3();

export default function FoilBalloonZero(props) {
  const group = React.useRef();
  const { nodes, materials } = useGLTF(
    '/3d/AdobeStock_416787728/foil_balloon_zero.gltf',
  );

  const [zoom, setZoom] = React.useState(false);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setZoom(zoom => !zoom);
  //   }, 2000);
  // }, [zoom]);

  useFrame(({ clock, camera }) => {
    const step = 0.1;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      clock.getElapsedTime() * 1,
      step,
    );
    // group.current.rotation.x = THREE.MathUtils.lerp(
    //   group.current.rotation.x,
    //   clock.getElapsedTime() * 0.1,
    //   0.01,
    // );

    // camera.fov = THREE.MathUtils.lerp(camera.fov, zoom ? 10 : 42, step);
    // camera.position.lerp(
    //   dummy.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10),
    //   step,
    // );

    // lookAtPos.x = Math.sin(clock.getElapsedTime() * 2);

    // camera.lookAt(lookAtPos);
    // camera.updateProjectionMatrix();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        sides={THREE.BackSide}
        geometry={nodes.foil_balloon_zero.geometry}
        // material={materials.plastic_Mat}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.05, 0.05, 0.05]}
      >
        <meshStandardMaterial metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/3d/AdobeStock_416787728/foil_balloon_zero.gltf');
