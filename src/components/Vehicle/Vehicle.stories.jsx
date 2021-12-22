/**
 * Vehicle.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Vehicle from './Vehicle';

 export default {
   title: 'Vehicle',
   component: Vehicle,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Vehicle />;

 Default.storyName = 'default';
