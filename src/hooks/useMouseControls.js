/**
 * @file useMouseControls.js
 */

import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store';

export const useMouseControls = (selectedVertex, playerRef, vehicleRef) => {
  const { mode, setGauges } = useStore();
  const prevVertex = React.useRef();
  React.useEffect(() => {
    if (mode === 'keyboard') {
      playerRef.current.clearPath();
      return;
    }
    if (!selectedVertex || selectedVertex === prevVertex.current) return;
    prevVertex.current = selectedVertex;
    playerRef.current.click(selectedVertex);
  }, [mode, selectedVertex, playerRef]);

  useFrame(() => {
    if (mode !== 'mouse' || !vehicleRef.current?.api) return;
    const res = playerRef.current.run();
    if (!res) return;
    const { forces, gauges } = res;

    const { steering, engine, braking } = forces;
    vehicleRef.current.api.applyEngineForce(engine, 2);
    vehicleRef.current.api.applyEngineForce(engine, 3);

    vehicleRef.current.api.setSteeringValue(steering, 0);
    vehicleRef.current.api.setSteeringValue(steering, 1);

    for (let i = 0; i < 4; i++) {
      vehicleRef.current.api.setBrake(braking, i);
    }

    setGauges(gauges);
  }, -1);
};
