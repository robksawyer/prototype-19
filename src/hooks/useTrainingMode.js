/**
 * @file useTrainingMode
 */
import { useStore } from '@/store';

export const useTrainingMode = () => {
  const {
    training: trainingMode,
    enableCameraLock,
    mouseMode,
    disableAICar,
    removeObstacles,
    addObstacles,
    updateGhosts,
    setCurrentDNA,
    toggleTraining,
  } = useStore();
  if (!trainingMode) {
    enableCameraLock();
    mouseMode();
    disableAICar();
    removeObstacles();
    addObstacles(false);
  } else {
    updateGhosts([]);
    setCurrentDNA();
  }
  toggleTraining();
};
