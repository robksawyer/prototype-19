/**
 * Roads.jsx
 */
 import * as React from 'react';

 // Component(s)
 import Roads from './Roads';

 export default {
   title: 'Roads',
   component: Roads,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <Roads />;

 Default.storyName = 'default';
