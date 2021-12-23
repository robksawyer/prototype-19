/**
 * @file useTrainingMode
 */
import { useStore } from '@/store';

export const useTrainingMode = () => {
  const {
    training: trainingMode,
    enableCameraLock,
    mouseMode,
    disableAIEngine,
    removeObstacles,
    addObstacles,
    updateGhosts,
    setCurrentDNA,
    toggleTraining,
  } = useStore();
  if (!trainingMode) {
    enableCameraLock();
    mouseMode();
    disableAIEngine();
    removeObstacles();
    addObstacles(false);
  } else {
    updateGhosts([]);
    setCurrentDNA();
  }
  toggleTraining();
};
