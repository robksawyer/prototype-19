import * as React from 'react';
import create from 'zustand';
// import { devtools } from 'zustand/middleware';
// import produce from 'immer';

// Log every time state is changed
// const log = config => (set, get, api) =>
//   config(
//     args => {
//       console.log('  applying', args);
//       set(args);
//       console.log('  new state', get());
//     },
//     get,
//     api,
//   );

const defaultSettings = {
  steerVal: 0.875,
  maxForce: 1000,
  maxBrakeForce: 20,
  maxSpeed: 18,
  stoppingDistance: 35,
  slowDistance: 20,
};

/**
 * useStore
 * @see https://github.com/pmndrs/zustand
 */
export const useStore = create(set => ({
  loading: false,

  // IMPORTANT: Set the car's visual dimensions (roughly)
  vehicleDimensions: [1.7, 1, 4],

  gauges: null,
  mode: 'mouse',
  stats: false,
  quality: +localStorage.getItem('quality') ?? false,
  addRoadWorks: false,
  removeRoadWorks: false,

  // settings
  trafficLights: false,
  cameraLock: undefined,
  collisionBoxes: false,
  computerNumber: 60,
  trafficConditions: false,
  time: 'sunset',
  obstacles: [],
  AICar: false,
  helpOpen: false,

  // training
  currentDna: null,
  training: false,
  ghosts: [],

  setLoading: value =>
    set(state => {
      localStorage.setItem('quality', value);
      state.quality = value;
    }),

  setQuality: value => set(state => ({ gauges: value })),

  setGauges: value => set(state => ({ gauges: value })),

  //   mode
  mouseMode: value => set(state => ({ mode: 'mouse' })),
  keyboardMode: value => set(state => ({ mode: 'keyboard' })),

  //   settings
  toggleAddRoadWorks: value =>
    set(state => {
      state.addRoadWorks = !state.addRoadWorks;
      if (state.addRoadWorks) state.removeRoadWorks = false;
    }),
  toggleRemoveRoadWorks: value =>
    set(state => {
      state.removeRoadWorks = !state.removeRoadWorks;
      if (state.removeRoadWorks) state.addRoadWorks = false;
    }),

  toggleTrafficLights: value =>
    set(state => ({ trafficLights: !state.trafficLights })),

  toggleCameraLock: value =>
    set(state => ({
      cameraLock: !state.cameraLock,
    })),

  enableCameraLock: value =>
    set(state => ({
      cameraLock: true,
    })),

  toggleCollisionBoxes: value =>
    set(state => ({
      collisionBoxes: !state.collisionBoxes,
    })),

  toggleTrafficConditions: value =>
    set(state => ({
      trafficConditions: !state.trafficConditions,
    })),

  changeComputerNumber: value =>
    set(state => ({
      computerNumber: value,
    })),

  toggleTime: value =>
    set(state => {
      if (state.time === 'day') state.time = 'sunset';
      else if (state.time === 'sunset') state.time = 'night';
      else if (state.time === 'night') state.time = 'day';
    }),

  addObstacles: value =>
    set(state => {
      const payload = value || !state.addObstacles;
      state.obstacles = payload;
    }),

  newObstacle: value =>
    set(state => {
      state.obstacles.push(value);
    }),

  removeObstacles: value =>
    set(state => ({
      obstacles: [],
    })),

  toggleAICar: value =>
    set(state => {
      state.AICar = !state.AICar;
      //   state.addObstacles = false;
      state.obstacles = [];
    }),

  disableAIEngine: value =>
    set(state => ({
      AICar: false,
    })),

  toggleHelpOpen: value =>
    set(state => ({
      helpOpen: !state.helpOpen,
    })),

  // training
  setCurrentDNA: value =>
    set(state => {
      const dna = value || defaultSettings;
      state.currentDNA = dna;
    }),

  toggleTraining: value =>
    set(state => ({
      training: !state.training,
    })),

  updateGhosts: value =>
    set(state => ({
      ghosts: value,
    })),
}));
