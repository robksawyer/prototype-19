/**
 * @file Line.jsx
 */
import * as React from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import * as meshline from 'meshline';

extend(meshline);

export default function Line({ pathRef, points, color, width }) {
  return (
    <mesh ref={pathRef}>
      <meshLine attach="geometry" points={points} color={color} />
      <meshLineMaterial attach="material" lineWidth={width} color={color} />
    </mesh>
  );
}
