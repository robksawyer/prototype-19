/**
 * @file Roads.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import { formattedTiles } from '../../../public/data/formattedMapData';
import { roadsTexture } from './RoadTextures';
import Road from './Road';

import styles from './Roads.module.css';

const Roads = ({
  setSelectedVertex,
  addObstacles = false,
  onNewObstacle = o => console.log('New obstable added', o),
}) => {
  const prevMouse = React.useRef(null);

  const roadTiles = React.useMemo(() => {
    const array = [];
    for (let i = 0; i < formattedTiles.length; i++) {
      for (let j = 0; j < formattedTiles[0].length; j++) {
        let type = formattedTiles[i][j];
        if (!type) continue;
        array.push({
          x: j * 10,
          z: i * 10,
        });
      }
    }
    return array;
  }, []);

  const onPointerDown = e => {
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = e => {
    if (!prevMouse.current) return;
    const dist =
      Math.abs(prevMouse.current.x - e.clientX) +
      Math.abs(prevMouse.current.y - e.clientY);
    if (dist > 10) return;
    if (addObstacles) {
      onNewObstacle({ id: Date.now(), x: e.point.x, z: e.point.z });
    } else setSelectedVertex({ x: e.point.x, z: e.point.z });
  };

  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.updateMatrix();
  }, [ref]);

  return (
    <>
      {roadTiles.map((tile, index) => (
        <Road key={index} tile={tile} />
      ))}
      <mesh
        ref={ref}
        frustumCulled={false}
        renderOrder={1}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        matrixAutoUpdate={false}
        position={[145, 0, 145]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeBufferGeometry args={[300, 300]} />
        <meshStandardMaterial map={roadsTexture} transparent={true} />
      </mesh>
    </>
  );
};

Roads.propTypes = {};

export default Roads;
