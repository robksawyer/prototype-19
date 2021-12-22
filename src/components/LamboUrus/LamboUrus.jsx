/**
 * @file LamboUrus.js
 *
 * Credits
 * 3D Model
 * Author: Steven Grey (https://sketchfab.com/Steven007)
 * License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
 * Source: https://sketchfab.com/3d-models/lamborghini-urus-2650599973b649ddb4460ff6c03e4aa2
 * Title: Lamborghini Urus
 */

import * as React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import styles from './LamboUrus.module.css';

import { useLayoutEffect } from '@/hooks/useIsoLayoutEffect';

export default function LamboUrus(props) {
  const { scene, nodes, materials } = useGLTF(
    '/3d/models/lambo_urus/lambo_urus.glb',
  );

  useLayoutEffect(() => {
    scene.traverse(
      obj => obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true),
    );
    console.log('nodes', nodes);

    // Body
    // Object.assign(nodes.Lamborghini_Urus_1.children[0].children[0].material, {
    //   metalness: 0.9,
    //   roughness: 0.4,
    //   color: new THREE.Color('#001e4d'),
    // });
    // Object.assign(nodes.Lamborghini_Urus_1.children[0].children[1].material, {
    //   metalness: 0.9,
    //   roughness: 0.4,
    //   color: new THREE.Color('#001e4d'),
    // });
    // Object.assign(nodes.yellow.children[1].material, {
    //   metalness: 0.9,
    //   roughness: 0.4,
    //   color: new THREE.Color('#001e4d'),
    // });

    // Rims
    Object.assign(nodes.wheel003_020_2_Chrome_0.material, {
      metalness: 0.9,
      roughness: 0.4,
      color: new THREE.Color('#020202'),
    });
    Object.assign(materials.WhiteCar, {
      roughness: 0.0,
      metalness: 0.3,
      emissive: new THREE.Color('#500000'),
      envMapIntensity: 0.5,
    });
  }, [scene, nodes, materials]);
  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/3d/models/lambo_urus/lambo_urus.glb');
