/**
 * @file Obstacles.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Obstacle from './Obstacle';
import Wall from './Wall';
import { walls } from './walls';

import styles from './Obstacles.module.css';

const Obstacles = ({ obstacles }) => {
  return (
    <>
      {obstacles.length > 0 && (
        <>
          {/* Place some obstables */}
          {obstacles.map(obstacle => (
            <Obstacle key={obstacle.id} obstacle={obstacle} />
          ))}
          {/* Build the walls */}
          {walls.map((wall, index) => (
            <Wall key={index} wall={wall} />
          ))}
        </>
      )}
    </>
  );
};

Obstacles.propTypes = {};

export default Obstacles;
