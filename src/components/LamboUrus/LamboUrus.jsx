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

export default function LamboUrus(props) {
  const group = React.useRef();
  const { nodes, materials } = useGLTF('/3d/models/lambo_urus/lambo_urus.glb');

  return (
    <group ref={group} {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[0, 0, 0]}>
            <group position={[0, 0, -119]} rotation={[0, 0, 0]}>
              <group
                position={[0, -44.01, 65.81]}
                rotation={[Math.PI, 0, -Math.PI]}
                scale={[0.55, 0.55, 0.55]}
              >
                <group
                  position={[0.18, 97.71, -156.93]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.yellow_WhiteCar_0.geometry}
                    material={materials.WhiteCar}
                  />
                  <mesh
                    geometry={nodes.yellow_Logo_0.geometry}
                    material={materials.Logo}
                  />
                </group>
                <group
                  position={[0, 38.86, 280.29]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.silver_003_BreaksRedPaint_0.geometry}
                    material={materials.BreaksRedPaint}
                  />
                </group>
                <group
                  position={[0, 10.16, -116.09]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.silver_002_ChromeBLurred_0.geometry}
                    material={materials.ChromeBLurred}
                  />
                </group>
                <group
                  position={[0.35, 130.35, 305.24]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.silver_001_BreakDiscs_0.geometry}
                    material={materials.BreakDiscs}
                  />
                </group>
                <group
                  position={[0, 11.97, 292.63]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.silver_ChromeBLurred_0.geometry}
                    material={materials.ChromeBLurred}
                  />
                </group>
                <group
                  position={[0.08, 36.83, 314.59]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.matt_black_001_GreyElements_0.geometry}
                    material={materials.GreyElements}
                  />
                </group>
                <group
                  position={[0, 129.06, 29.08]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.matt_black_FrameBlack_0.geometry}
                    material={materials.FrameBlack}
                  />
                </group>
                <group
                  position={[97.38, 136.81, 284.93]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_050_BlackPaint_0.geometry}
                    material={materials.BlackPaint}
                  />
                </group>
                <group
                  position={[0, 134.12, 287.4]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_049_BreakDiscs_1_0.geometry}
                    material={materials.BreakDiscs_1}
                  />
                </group>
                <group
                  position={[0, 125.88, 254.5]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_046_BreakDiscs_1_0.geometry}
                    material={materials.BreakDiscs_1}
                  />
                </group>
                <group
                  position={[134.45, 125.03, 267.18]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_045_BlackPaint_0.geometry}
                    material={materials.BlackPaint}
                  />
                </group>
                <group
                  position={[144.59, 127.24, 255.25]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_044_BlackPaint_0.geometry}
                    material={materials.BlackPaint}
                  />
                </group>
                <group
                  position={[0, 133.37, 271.34]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_043_BreakDiscs_1_0.geometry}
                    material={materials.BreakDiscs_1}
                  />
                </group>
                <group
                  position={[0, 121.02, 262.47]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_042_BreakDiscs_1_0.geometry}
                    material={materials.BreakDiscs_1}
                  />
                </group>
                <group
                  position={[0, 93.18, -497.13]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_040_Chrome_0.geometry}
                    material={materials.Chrome}
                  />
                </group>
                <group
                  position={[141.97, 96.69, -474.55]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_033_Default_Material_0.geometry}
                    material={materials.Default_Material}
                  />
                </group>
                <group
                  position={[0, 92.78, -496.75]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_027_BreakDiscs_1_0.geometry}
                    material={materials.BreakDiscs_1}
                  />
                </group>
                <group
                  position={[-97.38, 136.81, 284.93]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_024_BlackPaint_0.geometry}
                    material={materials.BlackPaint}
                  />
                </group>
                <group
                  position={[0, 126.69, 241.4]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_022_BreakDiscs_0.geometry}
                    material={materials.BreakDiscs}
                  />
                </group>
                <group
                  position={[0, 128.6, 274.47]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_021_emitbrake_0.geometry}
                    material={materials.emitbrake}
                  />
                </group>
                <group
                  position={[-134.45, 125.03, 267.18]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_019_BlackPaint_0.geometry}
                    material={materials.BlackPaint}
                  />
                </group>
                <group
                  position={[-144.59, 127.24, 255.25]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_018_BlackPaint_0.geometry}
                    material={materials.BlackPaint}
                  />
                </group>
                <group
                  position={[0, 95.3, -469.6]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_015_Hub_0.geometry}
                    material={materials.material}
                  />
                </group>
                <group
                  position={[0, 90.94, -495.03]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_009_LightsFrontLed_0.geometry}
                    material={materials.LightsFrontLed}
                  />
                </group>
                <group
                  position={[0, 86.08, -497.19]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_008_BreakDiscs_1_0.geometry}
                    material={materials.BreakDiscs_1}
                  />
                </group>
                <group
                  position={[-141.97, 96.69, -474.55]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_007_Default_Material_0.geometry}
                    material={materials.Default_Material}
                  />
                </group>
                <group
                  position={[0, 92.4, -499.12]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_002_BreakDiscs_0.geometry}
                    material={materials.BreakDiscs}
                  />
                </group>
                <group
                  position={[0, 150.59, -214.79]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.lights_Hub_0.geometry}
                    material={materials.material}
                  />
                </group>
                <group
                  position={[0.12, 152.9, -194.05]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.gloss_black_008_RimsChrome_0.geometry}
                    material={materials.RimsChrome}
                  />
                  <mesh
                    geometry={nodes.gloss_black_008_Mirror_0.geometry}
                    material={materials.Mirror}
                  />
                </group>
                <group
                  position={[0, 179.62, -67.84]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.gloss_black_007_GreyElements_0.geometry}
                    material={materials.GreyElements}
                  />
                </group>
                <group
                  position={[0, 54.49, -543.45]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.gloss_black_006_GreyElements_0.geometry}
                    material={materials.GreyElements}
                  />
                </group>
                <group
                  position={[0, 30.25, 277.48]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.gloss_black_005_GreyElements_0.geometry}
                    material={materials.GreyElements}
                  />
                </group>
                <group
                  position={[0, -6.84, -145.25]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.gloss_black_004_GreyElements_0.geometry}
                    material={materials.GreyElements}
                  />
                </group>
                <group
                  position={[0, 109.5, -313.38]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.gloss_black_003_GreyElements_0.geometry}
                    material={materials.GreyElements}
                  />
                </group>
                <group
                  position={[0, 64.21, -137.57]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.gloss_black_002_GreyElements_0.geometry}
                    material={materials.GreyElements}
                  />
                </group>
                <group
                  position={[0, 130.71, 297.04]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.gloss_black_001_BlackPaint_0.geometry}
                    material={materials.BlackPaint}
                  />
                </group>
                <group
                  position={[0, 6.46, -516.94]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.gloss_black_GreyElements_0.geometry}
                    material={materials.GreyElements}
                  />
                </group>
                <group
                  position={[0, 38.84, 281.62]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.glass_005_LightsGlassBack_0.geometry}
                    material={materials.LightsGlassBack}
                  />
                </group>
                <group
                  position={[1.48, 129.7, 274.37]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.glass_004_LightsGlassFront_0.geometry}
                    material={materials.LightsGlassFront}
                  />
                </group>
                <group
                  position={[-0.41, 174.33, -27.92]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.glass_003_Glass_0.geometry}
                    material={materials.Glass}
                  />
                </group>
                <group
                  position={[0, 150.59, -214.8]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.glass_002_LightsGlassFront_0.geometry}
                    material={materials.LightsGlassFront}
                  />
                </group>
                <group
                  position={[-2.21, 92.71, -497.84]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.75, 2.75, 2.75]}
                >
                  <mesh
                    geometry={nodes.glass_001_LightsGlassFront_0.geometry}
                    material={materials.LightsGlassFront}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/3d/models/lambo_urus/lambo_urus.glb');
