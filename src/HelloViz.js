import React from 'react';
import * as d3 from 'd3';

import { DARK_BLUE, LIGHT_GREEN, HELLO_NODES as staticNodes } from './const';

import FullScreenContext from './FullScreenContext';
import { getCanvasDimensions } from './utils';

const SCALE = 1;
const TOP = 150;
const MIN_RADIUS = 3;
const MAX_RADIUS = 5;
const NUM_NODES = staticNodes.length * 6;
const unscaled = x => x / SCALE;

const colorScale = d3
  .scaleLinear()
  .domain([0, NUM_NODES])
  .range([DARK_BLUE, LIGHT_GREEN]);

const getStaticNode = i => staticNodes[Math.floor(i % staticNodes.length)];
const nodes = d3.range(NUM_NODES).map(i => ({
  c: colorScale(Math.random() * NUM_NODES),
  r: MIN_RADIUS + Math.random() * MAX_RADIUS,
  staticNode: getStaticNode(i),
  x: 0,
  y: 0
}));

const pointerNode = { isPointer: true };
const onPointerMove = event => {
  const [x, y] = d3.pointer(event);
  pointerNode.fx = x / SCALE;
  pointerNode.fy = y / SCALE;
};

const forces = {
  center: ({ width = 0 } = {}) => d3.forceCenter(width / (2 * SCALE), TOP),
  charge: ({ strength = -15 } = {}) =>
    d3.forceManyBody().strength(d => (d.isPointer ? strength : 0)),
  collide: () => d3.forceCollide().radius(d => d.r / 2),
  x: () =>
    d3
      .forceX()
      .strength(0.05)
      .x(d => (d.isPointer ? 0 : d.staticNode.x)),
  y: () =>
    d3
      .forceY()
      .strength(0.05)
      .y(d => (d.isPointer ? 0 : d.staticNode.y))
};

const forceSimulation = Object.keys(forces).reduce(
  (simulation, f) => simulation.force(f, forces[f]()),
  d3
    .forceSimulation([pointerNode, ...nodes])
    .alphaTarget(0.3)
    .velocityDecay(0.1)
);

const onTick = context => () => {
  const { width, height } = getCanvasDimensions(context);
  context.clearRect(0, 0, unscaled(width), unscaled(height));
  nodes.forEach(node => {
    context.beginPath();
    context.moveTo(node.x + node.r, node.y);
    context.arc(node.x, node.y, node.r, 0, Math.PI);
    context.arc(node.x, node.y, node.r, Math.PI, 0);
    context.fillStyle = node.c;
    context.fill();
  });
};

const startForceSimulation = context => {
  context.scale(SCALE, SCALE);
  forceSimulation.on('tick', onTick(context));
  d3.select(context.canvas)
    .on('pointermove', onPointerMove)
    .on('pointerdown', () =>
      forceSimulation.force('charge', forces.charge({ strength: -55 }))
    )
    .on('pointerup', () => forceSimulation.force('charge', forces.charge()));
};

const onWindowResize = width =>
  forceSimulation.force('center', forces.center({ width }));

const Viz = () => (
  <FullScreenContext
    draw={startForceSimulation}
    onWindowResize={onWindowResize}
  />
);

export default Viz;
