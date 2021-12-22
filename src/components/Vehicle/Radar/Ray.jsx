import * as React from 'react';
import * as THREE from 'three';
import { useRaycastClosest } from '@react-three/cannon';

import { useFrame } from '@react-three/fiber';

export default function Ray({ from, to, angle, playerRef }) {
  const geometry = React.useRef(new THREE.BufferGeometry());
  const endRef = React.useRef();
  const fromRef = React.useRef();
  const worldVectorFrom = React.useRef(new THREE.Vector3());
  const worldVectorTo = React.useRef(new THREE.Vector3());
  const [color, setColor] = React.useState('limegreen');

  const [rayFrom, setRayFrom] = React.useState(from);
  const [rayTo, setRayTo] = React.useState(to);

  useRaycastClosest(
    {
      from: rayFrom,
      to: rayTo,
      collisionFilterGroup: 2,
      collisionFilterMask: 1 | 4,
    },
    result => {
      if (result.body?.userData.id === 'obstacle') {
        playerRef.current.obstacles[angle] = [result.distance, 1];
        setColor('red');
      } else if (result.body?.userData.id === 'wall') {
        playerRef.current.obstacles[angle] = [result.distance, 0];
        setColor('blue');
      }
    },
    [rayFrom, rayTo],
  );

  useFrame(() => {
    if (!fromRef.current) return;
    setColor('limegreen');
    fromRef.current.getWorldPosition(worldVectorFrom.current);
    endRef.current.getWorldPosition(worldVectorTo.current);
    setRayTo([worldVectorTo.current.x, 0, worldVectorTo.current.z]);
    setRayFrom([worldVectorFrom.current.x, 0.5, worldVectorFrom.current.z]);
  });

  React.useEffect(() => {
    geometry.current.setFromPoints(
      [from, to].map(v => new THREE.Vector3(...v)),
    );
  }, [from, to]);

  return (
    <>
      <object3D ref={fromRef} position={from} />
      <object3D ref={endRef} position={to} />
      <line geometry={geometry.current}>
        <lineBasicMaterial color={color} />
      </line>
    </>
  );
}
