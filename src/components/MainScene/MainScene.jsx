/**
 * @file MainScene.js
 */
import * as React from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import useErrorBoundary from 'use-error-boundary';

import { Canvas, useFrame, useThree } from '@react-three/fiber';

import {
  useHelper,
  Html,
  useTexture,
  AdaptiveDpr,
  AdaptiveEvents,
  OrbitControls,
  Stage,
  Stats,
  Cloud,
  Environment,
  PresentationControls,
  MeshReflectorMaterial,
} from '@react-three/drei';
import * as STDLIB from 'three-stdlib';
// Enabled for effects
// import {
//   EffectComposer,
//   // Bloom,
//   // ChromaticAberration,
// } from '@react-three/postprocessing'

import styles from './MainScene.module.css';

import Loader from '@/components/Loader';
import FoilBalloonZero from './FoilBalloonZero';
import FoilBalloonTwo from './FoilBalloonTwo';
import LamboUrus from '@/components/LamboUrus';

// Shader stack
import './shaders/defaultShaderMaterial';

// Enable for effects in the main scene
// const Effects = () => {
//   return <EffectComposer></EffectComposer>
// }

const ENABLE_HELPERS = 1;

const Scene = () => {
  const mesh = React.useRef();
  const { scene, size } = useThree();

  const group = React.useRef();
  const pointLight0 = React.useRef();
  const pointLight1 = React.useRef();
  const pointLight2 = React.useRef();
  const pointLight3 = React.useRef();

  // useFrame(({ clock, mouse }) => {
  //   mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4;
  //   mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4;
  //   mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4;
  //   mesh.current.position.x = Math.sin(clock.elapsedTime);
  //   mesh.current.position.z = Math.sin(clock.elapsedTime);
  //   group.current.rotation.y += 0.02;

  //   mesh.current.material.uniforms.iTime.value = clock.getElapsedTime();
  //   mesh.current.material.uniforms.iMouse.value = new THREE.Vector2(
  //     mouse.x,
  //     mouse.y,
  //   );
  // });

  useHelper(pointLight0, THREE.PointLightHelper, 0.5, 'hotpink');
  useHelper(pointLight1, THREE.PointLightHelper, 0.5, 'hotpink');
  useHelper(pointLight2, THREE.PointLightHelper, 0.5, 'hotpink');
  useHelper(pointLight3, THREE.PointLightHelper, 0.5, 'hotpink');
  // useHelper(mesh, THREE.BoxHelper, '#272740');
  // useHelper(mesh, STDLIB.VertexNormalsHelper, 1, '#272740');

  return (
    <group>
      <spotLight position={[-10, 0, -20]} color="lightblue" intensity={0.0} />
      <group ref={group} position={[0, 27, 5]}>
        <pointLight
          ref={pointLight0}
          color="#0051FF"
          position={[-4, 0, -5]}
          intensity={2.5}
        />
        <pointLight
          ref={pointLight1}
          color="#08FF88"
          position={[4, 0, 5]}
          intensity={2.5}
        />
        <pointLight
          ref={pointLight2}
          color="#FFF035"
          position={[-4, 0, 5]}
          intensity={2.5}
        />
        <pointLight
          ref={pointLight3}
          color="#DF1CFF"
          position={[5, 0, -3]}
          intensity={2.5}
        />
      </group>
      <Stage
        environment={null}
        intensity={1}
        contactShadow={false}
        shadowBias={-0.0015}
      >
        <group position={[0, 5, 0]}>
          <FoilBalloonTwo position={[-4, -3, 0]} />
          <FoilBalloonZero position={[0, -3, 0]} />
          <FoilBalloonTwo position={[4, -3, 0]} />
          <FoilBalloonTwo position={[8.5, -3, 0]} />
        </group>

        <LamboUrus
          position={[0, -2, 0]}
          rotation={[0, 1, 0]}
          scale={[0.05, 0.05, 0.05]}
        />
      </Stage>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[170, 170]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={512}
          receiveShadow
          mirror={0}
          mixBlur={1}
          mixStrength={2.5}
          depthScale={1}
          minDepthThreshold={0.8}
          maxDepthThreshold={1}
          color="#505050"
          metalness={0.6}
          roughness={1}
        />
      </mesh>
    </group>
  );
};

const Clouds = () => {
  return (
    <group position={[0, 10, -10]}>
      <Cloud position={[-10, 5, 0]} args={[3, 2]} />
      <Cloud position={[-14, 10, 0]} args={[3, 2]} />
      <Cloud args={[5, 2]} />
      <Cloud position={[10, 14, 0]} args={[3, 2]} />
      <Cloud position={[10, 13, 0]} args={[3, 2]} />
    </group>
  );
};

const MainScene = ({
  className = 'fixed top-0 left-0 w-screen h-screen',
  variant = 'default',
}) => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  return (
    <main
      className={`${styles.main_scene} ${
        styles[`main_scene__${variant}`]
      } ${className}`}
      style={{
        maxHeight: `calc(100vh - 50px)`,
      }}
    >
      <Stats showPanel={0} className="ml-0" />
      <ErrorBoundary>
        {/* https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#canvas */}
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ fov: 45 }}
          // camera={{ position: [-5, 3, -10] }}
          // onCreated={({ gl }) => {
          //   // gl.physicallyCorrectLights = true;
          //   gl.outputEncoding = THREE.sRGBEncoding;
          // }}
          performance={{ min: 0.2 }}
        >
          <color attach="background" args={['#001e4d']} />
          <fog args={['#101010', 10, 20]} />
          <React.Suspense
            fallback={
              <Html center lang="en">
                <Loader />
              </Html>
            }
          >
            <Clouds />
            <PresentationControls
              speed={1.5}
              global
              zoom={0.7}
              polar={[-0.1, Math.PI / 4]}
            >
              <Scene />
            </PresentationControls>

            <Environment path="/3d/models/lambo_urus/textures/cube" />
          </React.Suspense>

          {/* <Effects /> */}

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          {/* <OrbitControls regress /> */}
        </Canvas>
      </ErrorBoundary>
    </main>
  );
};

MainScene.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
};

export default MainScene;
