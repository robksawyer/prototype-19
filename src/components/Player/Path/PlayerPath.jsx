/**
 * @file PlayerPath.jsx
 */
import * as React from 'react';
import { extend } from '@react-three/fiber';
import * as meshline from 'meshline';

extend(meshline);

import Line from './Line';

export default React.memo(function PlayerPath({ player }) {
  const pathRef = React.useRef();

  React.useEffect(() => {
    player.pathGeometry = pathRef.current.geometry;
  }, [player]);

  return <Line pathRef={pathRef} points={[]} color="lightblue" width={0.3} />;
});
