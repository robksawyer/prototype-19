/**
 * @file MainScene.js
 */
import * as React from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import _ from 'lodash';
import useErrorBoundary from 'use-error-boundary';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, Debug, usePlane } from '@react-three/cannon';

import Engine from '@/components/Vehicle/Engine';
import AIEngine from '@/components/Vehicle/AI/AIEngine';

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
import Controls from '@/components/Controls';
import Player from '@/components/Player';

// Shader stack
import './shaders/defaultShaderMaterial';

// Enable for effects in the main scene
// const Effects = () => {
//   return <EffectComposer></EffectComposer>
// }

const ENABLE_HELPERS = 1;

const Floor = props => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

  return (
    <mesh ref={ref}>
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
  );
};

const Scene = ({
  player,
  time = 'sunset',
  mode = 'keyboard',
  obstacles = [],
  quality = 3,
}) => {
  const mesh = React.useRef();
  const { scene, size } = useThree();

  const group = React.useRef();
  const pointLight0 = React.useRef();
  const pointLight1 = React.useRef();
  const pointLight2 = React.useRef();
  const pointLight3 = React.useRef();

  // Vehicle
  const useAICar = false;
  const [selectedVertex, setSelectedVertex] = React.useState(null);

  const onSetGauges = _.throttle(value => {
    console.log('value', value);
  }, 200);
  //

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
        {/* <LamboUrus
          position={[0, -2, 0]}
          rotation={[0, 1, 0]}
          scale={[0.05, 0.05, 0.05]}
        /> */}
        <Player
          player={player}
          selectedVertex={selectedVertex}
          mode={mode}
          // currentDNA={currentDNA}
          setGauges={onSetGauges}
          time={time}
          obstacles={obstacles}
          useAICar={useAICar}
          quality={quality}
        />
      </Stage>
      <Floor position={[0, 0, 0]} />
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
  cameraLock = false,
  isPaused = false,
  useAICar = false,
}) => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  const player = React.useMemo(
    () => (useAICar ? new AIEngine() : new Engine()),
    [useAICar],
  );

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
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ fov: 45 }}
          performance={{ min: 0.2 }}
        >
          <Physics
            gravity={[0, -10, 0]}
            broadphase="SAP"
            allowSleep
            shouldInvalidate={false}
          >
            <Debug color="black" scale={1.1} />
            <color attach="background" args={['#001e4d']} />
            <fog args={['#101010', 10, 20]} />

            <Controls
              cameraLock={cameraLock}
              player={player}
              isPaused={isPaused}
            />

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
                <Scene useAICar={useAICar} player={player} />
              </PresentationControls>

              <Environment path="/3d/models/lambo_urus/textures/cube" />
            </React.Suspense>

            {/* <Effects /> */}

            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            {/* <OrbitControls regress /> */}
          </Physics>
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
