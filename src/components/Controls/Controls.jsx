/**
 * @file Controls.js
 */
import * as React from 'react';
import * as THREE from 'three';
import { extend, useFrame, useThree, invalidate } from '@react-three/fiber';
import { TrackballControls } from 'three-stdlib';

import { useStore } from '@/store';

import { useAnimatedMovement } from './cameraMovements';

import PropTypes from 'prop-types';

import styles from './Controls.module.css';

// extend THREE to include TrackballControls
extend({ TrackballControls });

const Controls = ({ player }) => {
  const { cameraLock, isPaused } = useStore();
  const controls = React.useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    // update the view as the vis is interacted with
    controls.current.update();
    if (!isPaused) invalidate();
  });

  React.useEffect(() => {
    camera.position.set(147.5, 20, 222.5);
    controls.current.target.set(147.5, 0, 192.5);
  }, [camera]);

  // run the layout, animating on change
  useAnimatedMovement({
    controls,
    camera,
    cameraLock,
    player,
  });

  return (
    <trackballControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dynamicDampingFactor={0.1}
      maxDistance={3000}
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
        MIDDLE: THREE.MOUSE.ZOOM,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
      keys={[]}
    />
  );
};

Controls.propTypes = {
  player: PropTypes.object,
  cameraLock: PropTypes.bool,
  isPaused: PropTypes.bool,
};

export default Controls;
