/**
 * Controls.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Controls from './Controls';

 export default {
   title: 'Controls',
   component: Controls,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Controls />;

 Default.storyName = 'default';
