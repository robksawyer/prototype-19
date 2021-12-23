/**
 * @file cameraMovements.js
 */
import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import * as d3 from 'd3-ease';

const up = { x: 0, y: 1, z: 0 };

/**
 * updateSource
 * @param {*} parameter
 */
function updateSource(parameter) {
  parameter.sourceX = parameter.x;
  parameter.sourceY = parameter.y;
  parameter.sourceZ = parameter.z;
}

/**
 * interpolate
 * @param {*} parameter
 * @param {*} progress
 * @returns
 */
const interpolate = (parameter, progress) => {
  if (parameter.sourceX === undefined) return;
  parameter.x =
    (1 - progress) * parameter.sourceX + progress * parameter.targetX;
  parameter.y =
    (1 - progress) * parameter.sourceY + progress * parameter.targetY;
  parameter.z =
    (1 - progress) * parameter.sourceZ + progress * parameter.targetZ;
};

/**
 * findFollowX
 * @param {*} angle
 * @param {*} x
 * @returns
 */
const findFollowX = (angle, x) => {
  return -30 * Math.cos(angle) + x;
};

/**
 * findFollowZ
 * @param {*} angle
 * @param {*} z
 * @returns
 */
const findFollowZ = (angle, z) => {
  return 30 * Math.sin(angle) + z;
};

/**
 * findFollowTarget
 * @param {*} parameters
 * @param {*} player
 */
const findFollowTarget = (parameters, player) => {
  parameters.position.targetX = findFollowX(player.rotation, player.position.x);
  parameters.position.targetY = 20;
  parameters.position.targetZ = findFollowZ(
    player.rotation,
    -player.position.y,
  );

  parameters.target.targetX = player.position.x;
  parameters.target.targetY = 0;
  parameters.target.targetZ = -player.position.y;

  parameters.up.targetX = 0;
  parameters.up.targetY = 1;
  parameters.up.targetZ = 0;
};

/**
 * findTopDownTarget
 * @param {*} parameters
 * @param {*} player
 */
const findTopDownTarget = (parameters, player) => {
  parameters.position.targetX = player?.position.x || 0;
  parameters.position.targetY = 20;
  parameters.position.targetZ = -player?.position.y + 30 || 0;

  parameters.target.targetX = player?.position.x || 0;
  parameters.target.targetY = 0;
  parameters.target.targetZ = -player?.position.y || 0;

  parameters.up.targetX = 0;
  parameters.up.targetY = 1;
  parameters.up.targetZ = 0;
};

/**
 * interpolateSourceTarget
 * @param {*} parameters
 * @param {*} player
 * @param {*} movement
 * @param {*} progress
 */
function interpolateSourceTarget(parameters, player, movement, progress) {
  if (movement === 'move') {
    findFollowTarget(parameters, player);
  } else if (movement === 'reset') {
    findTopDownTarget(parameters, player);
  }
  Object.values(parameters).forEach(parameter => {
    interpolate(parameter, progress);
  });
}

/**
 * useAnimatedMovement
 * @param {*} props
 */
export function useAnimatedMovement({ controls, camera, cameraLock, player }) {
  const parameters = React.useRef({ position: null, target: null, up: null });
  const movement = React.useRef(null);
  const linearProgress = React.useRef(0);

  React.useEffect(() => {
    if (cameraLock === undefined || !player.position.x) {
      return;
    }
    parameters.current.position = { ...camera.position };
    parameters.current.target = { ...controls.current.target };
    parameters.current.up = { ...camera.up };
    linearProgress.current = 0;
    Object.values(parameters.current).forEach(parameter =>
      updateSource(parameter),
    );
    if (cameraLock) {
      movement.current = 'follow';
    } else {
      movement.current = 'reset';
    }
  }, [cameraLock, camera, controls, player]);

  useFrame(() => {
    if (!movement.current) return;
    if (movement.current === 'follow') {
      follow();
    } else {
      move();
    }
  });

  /**
   * move
   */
  const move = () => {
    if (linearProgress.current < 1) {
      linearProgress.current += 0.01;
      const progress = d3.easeQuadInOut(linearProgress.current);
      interpolateSourceTarget(
        parameters.current,
        player,
        movement.current,
        progress,
      );
      camera.position.set(...Object.values(parameters.current.position));
      controls.current.target.set(...Object.values(parameters.current.target));
      camera.up.set(...Object.values(parameters.current.up));
    } else {
      if (movement.current === 'move') movement.current = 'follow';
      else movement.current = false;
    }
  };

  /**
   * follow
   * @returns
   */
  const follow = () => {
    if (!player.followCam) return;
    camera.position.lerp(
      player.followCam.getWorldPosition(player.followCamVector),
      0.03,
    );
    camera.up.lerp(up, 0.03);
    controls.current.target.lerp(
      player.followCam.parent.getWorldPosition(player.chassisVector),
      0.03,
    );
  };
}
