/**
 * Player.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Player from './Player';

 export default {
   title: 'Player',
   component: Player,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Player />;

 Default.storyName = 'default';
