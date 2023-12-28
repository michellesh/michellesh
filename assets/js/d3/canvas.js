const WIDTH = 650;
const HEIGHT = 100;
const SCALE = 1;
const TOP = 0;
const LEFT = 650;
const MIN_RADIUS = 2;
const MAX_RADIUS = 5;
const NUM_NODES = MICKY_MAKES_NODES.length * 1;
const unscaled = x => x / SCALE;
const MIN_STRENGTH = -5;
const MAX_STRENGTH = -40;

const div = document.getElementById("d3-vis");
const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
div.appendChild(canvas);

const yMin = Math.min(...MICKY_MAKES_NODES.map(n => n.y));
const yMax = Math.max(...MICKY_MAKES_NODES.map(n => n.y));

const colorScale = d3
  .scaleLinear()
  .domain([yMin, yMax])
  .range([SAGE, BLUE_GREEN]);

const pointerNode = { isPointer: true };
const nodes = d3.range(NUM_NODES).map(i => {
  const forceNode = MICKY_MAKES_NODES[Math.floor(i % MICKY_MAKES_NODES.length)];
  return {
    c: colorScale(forceNode.y),
    r: MIN_RADIUS,
    forceX: forceNode.x,
    forceY: forceNode.y,
    x: WIDTH / 2,
    y: TOP,
  };
});

if (canvas.getContext) {
  const context = canvas.getContext("2d");

  context.scale(SCALE, SCALE);

  // Forces
  const forceSimulation = d3
    .forceSimulation([pointerNode, ...nodes])
    .alphaTarget(1)
    .velocityDecay(0.1)
    .force(
      "charge",
      d3.forceManyBody().strength(d => (d.isPointer ? MIN_STRENGTH : 0))
    )
    .force(
      "collide",
      d3.forceCollide().radius(d => d.r / 2)
    )
    .force(
      "x",
      d3
        .forceX()
        .strength(0.2)
        .x(d => (d.isPointer ? 0 : d.forceX))
    )
    .force(
      "y",
      d3
        .forceY()
        .strength(0.2)
        .y(d => (d.isPointer ? 0 : d.forceY))
    )
    .on("tick", () => {
      context.clearRect(0, 0, unscaled(WIDTH), unscaled(HEIGHT));
      nodes.forEach(node => {
        context.beginPath();
        context.moveTo(node.x + node.r, node.y);
        context.arc(node.x, node.y, node.r, 0, Math.PI);
        context.arc(node.x, node.y, node.r, Math.PI, 0);
        context.fillStyle = node.c;
        context.fill();
      });
    });

  // Pointer events
  d3.select(context.canvas)
    .on("pointermove", event => {
      const [x, y] = d3.pointer(event);
      pointerNode.fx = x / SCALE;
      pointerNode.fy = y / SCALE;
    })
    .on("pointerdown", event => {
      forceSimulation.force(
        "charge",
        d3.forceManyBody().strength(d => (d.isPointer ? MAX_STRENGTH : 0))
      );
    })
    .on("pointerup", () =>
      forceSimulation.force(
        "charge",
        d3.forceManyBody().strength(d => (d.isPointer ? MIN_STRENGTH : 0))
      )
    );
}
