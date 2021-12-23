/**
 * Obstacles.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Obstacles from './Obstacles';

 export default {
   title: 'Obstacles',
   component: Obstacles,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Obstacles />;

 Default.storyName = 'default';
