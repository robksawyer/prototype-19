import * as THREE from 'three';
import * as React from 'react';
import Ray from './Ray';

const getCirclePoints = (radius, angle, segments) => {
  const curve = new THREE.EllipseCurve(
    0,
    0,
    radius,
    radius,
    Math.PI / 2 - angle / 2,
    Math.PI / 2 + angle / 2,
    false,
    0,
  );
  const curvePoints = curve.getPoints(segments);
  const eachAngle = angle / segments;
  let currentAngle = angle / 2;

  return curvePoints.map(point => {
    const pos = [point.x, 0, point.y];
    const angle = currentAngle;
    currentAngle -= eachAngle;
    return { pos, angle };
  });
};

const from = [0, 0, 0];

const rayEndPoints = getCirclePoints(20, Math.PI / 1.5, 30);

export default function Radar({ playerRef, obstacles }) {
  return (
    <>
      {obstacles.length > 0 && (
        <>
          {rayEndPoints.map((ray, index) => {
            return (
              <Ray
                key={index}
                from={from}
                to={ray.pos}
                angle={ray.angle}
                playerRef={playerRef}
              />
            );
          })}
          ;
        </>
      )}
    </>
  );
}
