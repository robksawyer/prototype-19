/**
 * @file DistortedSphere.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { MeshDistortMaterial } from '@react-three/drei';

import styles from './DistortedSphere.module.css';

const DistortedSphere = ({ position, distort, speed, hoverColor }) => {
  const [onHover, setOnHover] = React.useState(false);
  return (
    <mesh
      castShadow
      onPointerOver={e => setOnHover(true)}
      onPointerOut={e => setOnHover(false)}
      position={position}
      visible
    >
      {/*An ambient light that creates a soft light against the object */}
      {/* <ambientLight intensity={0.3} /> */}
      {/*An directional light which aims form the given position */}
      {/* <directionalLight castShadow position={[200, 400, 100]} intensity={1} /> */}
      {/* This sphere has a distort material attached to it */}
      <sphereBufferGeometry args={onHover ? [1.5, 50, 50] : [1, 50, 50]} />
      <MeshDistortMaterial
        color={onHover ? hoverColor : 'rgba(235,30,153,1)'}
        distort={onHover ? distort + 0.05 : distort} // Strength, 0 disables the effect (default=1)
        speed={onHover ? speed + 0.5 : speed} // Speed (default=1)
        roughness={0}
      />
    </mesh>
  );
};

DistortedSphere.propTypes = {};

export default DistortedSphere;
