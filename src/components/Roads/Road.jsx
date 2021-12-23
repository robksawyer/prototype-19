/**
 * @file Road.jsx
 */
import * as React from 'react';
import { useBox } from '@react-three/cannon';

export default function Road({ tile }) {
  useBox(() => ({
    type: 'Static',
    position: [tile.x, 0, tile.z],
    args: [10, 10, 0.01],
    rotation: [-Math.PI / 2, 0, 0],
    collisionFilterGroup: 1,
  }));

  return <></>;
}
