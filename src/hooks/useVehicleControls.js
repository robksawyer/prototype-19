/**
 * @file useVehicleControls.js
 */
import * as React from 'react';
import { useKeyboardControls } from './useKeyboardControls';
import { useMouseControls } from './useMouseControls';

import { useStore } from '@/store';

export const useVehicleControls = (
  chassisRef,
  vehicleRef,
  playerRef,
  selectedVertex,
) => {
  const { mode, useAIEngine, currentDNA, setGauges } = useStore();

  const resetPosition = React.useCallback(() => {
    chassisRef.current.api.position.set(147.5, 4, 192.5);
    chassisRef.current.api.angularVelocity.set(0, 0, 0);
    chassisRef.current.api.velocity.set(0, 0, 0);
    chassisRef.current.api.rotation.set(0, Math.PI, 0);
  }, [chassisRef]);

  const clearPath = React.useCallback(() => {
    playerRef.current.arrayOfSteps = [];
    playerRef.current.pathGeometry.setPoints([]);
  }, [playerRef]);

  const reset = React.useCallback(() => {
    resetPosition();
    clearPath();
  }, [clearPath, resetPosition]);

  useKeyboardControls(vehicleRef, reset, clearPath);

  useMouseControls(selectedVertex, playerRef, vehicleRef);

  React.useEffect(() => {
    resetPosition();
    if (!currentDNA) return;
    playerRef.current.updateDNA?.(currentDNA);
  }, [playerRef, currentDNA, resetPosition, useAIEngine]);
};
