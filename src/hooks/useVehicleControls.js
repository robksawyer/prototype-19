/**
 * @file useVehicleControls.js
 */
import * as React from 'react';
import { useKeyboardControls } from './useKeyboardControls';
import { useMouseControls } from './useMouseControls';

export const useVehicleControls = (
  chassisRef,
  vehicleRef,
  playerRef,
  mode,
  setGauges,
  selectedVertex,
  currentDNA,
  useAICar,
) => {
  const resetPosition = React.useCallback(() => {
    chassisRef.current.api.position.set(147.5, 4, 192.5);
    chassisRef.current.api.angularVelocity.set(0, 0, 0);
    chassisRef.current.api.velocity.set(0, 0, 0);
    chassisRef.current.api.rotation.set(0, Math.PI, 0);
  }, [chassisRef]);

  const clearPath = React.useCallback(() => {
    playerRef.current.arrayOfSteps = [];
    playerRef.current.pathGeometry.setVertices([]);
  }, [playerRef]);

  const reset = React.useCallback(() => {
    resetPosition();
    clearPath();
  }, [clearPath, resetPosition]);

  useKeyboardControls(mode, vehicleRef, reset, setGauges);

  useMouseControls(selectedVertex, playerRef, mode, vehicleRef, setGauges);

  React.useEffect(() => {
    resetPosition();
    // if (!currentDNA) return;
    // playerRef.current.updateDNA?.(currentDNA);
  }, [playerRef, currentDNA, resetPosition, useAICar]);
};
