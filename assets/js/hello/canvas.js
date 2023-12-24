const WIDTH = 650;
const HEIGHT = 100;
const SCALE = 0.5;
const TOP = 0;
const LEFT = 650;
const MIN_RADIUS = 3;
const MAX_RADIUS = 5;
const NUM_NODES = HELLO_NODES.length * 6;
const unscaled = x => x / SCALE;

const div = document.getElementById("d3-vis");
const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
div.appendChild(canvas);

const colorScale = d3
  .scaleLinear()
  .domain([0, NUM_NODES])
  .range([BLUE_GREEN, SAGE]);

const pointerNode = { isPointer: true };
const nodes = d3.range(NUM_NODES).map(i => {
  const forceNode = HELLO_NODES[Math.floor(i % HELLO_NODES.length)];
  return {
    c: colorScale(Math.random() * NUM_NODES),
    r: MIN_RADIUS + Math.random() * MAX_RADIUS,
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
    .force("center", d3.forceCenter(LEFT, TOP))
    .force(
      "charge",
      d3.forceManyBody().strength(d => (d.isPointer ? -15 : 0))
    )
    .force("collide", d3.forceCollide().radius(d => d.r / 2))
    .force(
      "x",
      d3
        .forceX()
        .strength(0.05)
        .x(d => (d.isPointer ? 0 : d.forceX))
    )
    .force(
      "y",
      d3
        .forceY()
        .strength(0.05)
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
    .on("pointerdown", () =>
      forceSimulation.force(
        "charge",
        d3.forceManyBody().strength(d => (d.isPointer ? -55 : 0))
      )
    )
    .on("pointerup", () => forceSimulation.force("charge",
        d3.forceManyBody().strength(d => (d.isPointer ? -15 : 0))))
}
