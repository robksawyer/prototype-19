/**
 * LamboUrus.jsx
 */
 import * as React from 'react';

 // Component(s)
 import LamboUrus from './LamboUrus';

 export default {
   title: 'LamboUrus',
   component: LamboUrus,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <LamboUrus />;

 Default.storyName = 'default';
