const WIDTH = 650;
const HEIGHT = 100;

const div = document.getElementById('d3-vis');
const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
div.appendChild(canvas);

const SCALE = 0.5;
const TOP = 105;
const LEFT = 975;
const MIN_RADIUS = 2;
const MAX_RADIUS = 4;
const NUM_NODES = HELLO_NODES.length * 6;
const unscaled = x => x / SCALE;

const colorScale = d3
  .scaleLinear()
  .domain([0, NUM_NODES])
  .range([BLUE_GREEN, SAGE]);

const minX = Math.min(...HELLO_NODES.map(n => n.x));
const minY = Math.min(...HELLO_NODES.map(n => n.y));

const nodes = d3.range(NUM_NODES).map(i => {
  const forceNode = HELLO_NODES[Math.floor(i % HELLO_NODES.length)]
  return {
    c: colorScale(Math.random() * NUM_NODES),
    r: MIN_RADIUS + Math.random() * MAX_RADIUS,
    forceX: forceNode.x - minX,
    forceY: forceNode.y - minY,
    x: WIDTH / 2,
    y: TOP
  };
});

const pointerNode = { isPointer: true };
const onPointerMove = event => {
  const [x, y] = d3.pointer(event);
  pointerNode.fx = x / SCALE;
  pointerNode.fy = y / SCALE;
};

const forces = {
  center: ({ width = 0 } = {}) => d3.forceCenter(LEFT, TOP),
  charge: ({ strength = -15 } = {}) =>
    d3.forceManyBody().strength(d => (d.isPointer ? strength : 0)),
  collide: () => d3.forceCollide().radius(d => d.r / 2),
  x: () =>
    d3
      .forceX()
      .strength(0.05)
      .x(d => (d.isPointer ? 0 : d.forceX)),
  y: () =>
    d3
      .forceY()
      .strength(0.05)
      .y(d => (d.isPointer ? 0 : d.forceY))
};

const forceSimulation = Object.keys(forces).reduce(
  (simulation, f) => simulation.force(f, forces[f]()),
  d3
    .forceSimulation([pointerNode, ...nodes])
    .alphaTarget(1)
    .velocityDecay(0.1)
);

const onTick = context => () => {
  context.clearRect(0, 0, unscaled(WIDTH), unscaled(HEIGHT));
  nodes.forEach(node => {
    context.beginPath();
    context.moveTo(node.x + node.r, node.y);
    context.arc(node.x, node.y, node.r, 0, Math.PI);
    context.arc(node.x, node.y, node.r, Math.PI, 0);
    context.fillStyle = node.c;
    context.fill();
  });
};

const onWindowResize = width =>
  forceSimulation.force('center', forces.center({ width }));

if (canvas.getContext) {
  const context = canvas.getContext('2d');

  context.scale(SCALE, SCALE);
  forceSimulation.on('tick', onTick(context));
  d3.select(context.canvas)
    .on('pointermove', onPointerMove)
    .on('pointerdown', () =>
      forceSimulation.force('charge', forces.charge({ strength: -55 }))
    )
    .on('pointerup', () => forceSimulation.force('charge', forces.charge()));
}
