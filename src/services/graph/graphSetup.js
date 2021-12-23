/**
 * @file graphSetup.js
 */

import { formattedTiles } from '../../../public/data/formattedMapData';
import Graph from './helpers/graph.js';
import Vertex from './helpers/vertex.js';

/**
 * map
 */
export const map = new Graph({ directed: true });

/**
 * setuppoints
 * @param {*} idCounter
 * @param {*} x
 * @param {*} z
 * @returns
 */
const setuppoints = (idCounter, x, z) => {
  let vertexA = new Vertex(idCounter + 'A', x, z);
  let vertexB = new Vertex(idCounter + 'B', x + 5, z);
  let vertexC = new Vertex(idCounter + 'C', x, z + 5);
  let vertexD = new Vertex(idCounter + 'D', x + 5, z + 5);
  return [vertexA, vertexB, vertexC, vertexD];
};

/**
 * setupEdges
 * @param {*} pointsMap
 * @param {*} i
 * @param {*} j
 */
const setupEdges = (pointsMap, i, j) => {
  const [a, b, c, d] = pointsMap[i][j];
  const type = formattedTiles[i][j];
  const rightA = pointsMap[i][j + 1][0];
  const rightC = pointsMap[i][j + 1][2];
  const downA = pointsMap[i + 1][j][0];
  const downB = pointsMap[i + 1][j][1];

  switch (type) {
    case 'HR':
      map.addEdge(a, b);
      map.addEdge(d, c);
      connectRightTile(b, rightA, rightC, d);
      break;
    case 'VR':
      map.addEdge(b, d);
      map.addEdge(c, a);
      connectDownTile(d, downB, downA, c);
      break;
    case 'TLC':
      a.corner = 'TLCOuter';
      d.corner = 'TLCInner';
      map.addEdge(a, b);
      map.addEdge(c, a);
      connectDownTile(d, downB, downA, c);
      connectRightTile(b, rightA, rightC, d);
      break;
    case 'TRC':
      b.corner = 'TRCOuter';
      c.corner = 'TRCInner';
      map.addEdge(a, b);
      map.addEdge(b, d);
      connectDownTile(d, downB, downA, c);
      break;
    case 'BLC':
      c.corner = 'BLCOuter';
      b.corner = 'BLCInner';
      map.addEdge(c, a);
      map.addEdge(d, c);
      connectRightTile(b, rightA, rightC, d);
      break;
    case 'BRC':
      d.corner = 'BRCOuter';
      a.corner = 'BRCInner';
      map.addEdge(b, d);
      map.addEdge(d, c);
      break;
    case 'TT':
      junction(a, b, c, d);
      connectRightTile(b, rightA, rightC, d);
      break;
    case 'TB':
      junction(a, b, c, d);
      connectDownTile(d, downB, downA, c);
      connectRightTile(b, rightA, rightC, d);
      break;
    case 'TL':
      junction(a, b, c, d);
      connectDownTile(d, downB, downA, c);
      break;
    case 'TR':
      junction(a, b, c, d);
      connectDownTile(d, downB, downA, c);
      connectRightTile(b, rightA, rightC, d);
      break;
    case 'XR':
      junction(a, b, c, d);
      connectDownTile(d, downB, downA, c);
      connectRightTile(b, rightA, rightC, d);
      break;
    default:
      break;
  }
};

/**
 * junction
 * @param {*} a
 * @param {*} b
 * @param {*} c
 * @param {*} d
 */
const junction = (a, b, c, d) => {
  map.addEdge(a, b);
  map.addEdge(b, d);
  map.addEdge(c, a);
  map.addEdge(d, c);
};

/**
 * connectRightTile
 * @param {*} b
 * @param {*} rightA
 * @param {*} rightC
 * @param {*} d
 */
const connectRightTile = (b, rightA, rightC, d) => {
  map.addEdge(b, rightA);
  map.addEdge(rightC, d);
};

/**
 * connectDownTile
 * @param {*} d
 * @param {*} downB
 * @param {*} downA
 * @param {*} c
 */
const connectDownTile = (d, downB, downA, c) => {
  map.addEdge(d, downB);
  map.addEdge(downA, c);
};

const pointsMap = [];
let idCounter = 1;

/**
 * setup points. We will split each tile into 4 points.
 * This allows us to have two lanes of traffic and crossroads etc.
 */
for (let i = 0; i < formattedTiles.length; i++) {
  pointsMap.push([]);
  for (let j = 0; j < formattedTiles[0].length; j++) {
    let type = formattedTiles[i][j];
    if (!type) {
      pointsMap[i].push(0);
      continue;
    }
    const newpoints = setuppoints(idCounter, j * 10, i * 10);
    newpoints.forEach(vertex => map.addVertex(vertex));
    pointsMap[i].push(newpoints);
    idCounter++;
  }
}

/**
 * setup edges
 */
for (let i = 0; i < formattedTiles.length; i++) {
  for (let j = 0; j < formattedTiles[0].length; j++) {
    if (pointsMap[i][j]) {
      setupEdges(pointsMap, i, j);
    }
  }
}

map.lookup = pointsMap;
