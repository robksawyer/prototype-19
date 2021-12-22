/**
 * DistortedSphere.jsx
 */
 import * as React from 'react';

 // Component(s)
 import DistortedSphere from './DistortedSphere';

 export default {
   title: 'DistortedSphere',
   component: DistortedSphere,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <DistortedSphere />;

 Default.storyName = 'default';
