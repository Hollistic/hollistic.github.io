// Sierpinski Triangle
// Umair Khan
// 10/29/2021

let triangleV = [
  {x: 400, y: 100},
  {x: 50, y: 700},
  {x: 750, y: 700},
];

let depth = 1;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#fed8b1");
  
  sierpinski(triangleV, depth);
}

function mousePressed() {
  depth++;
}

function sierpinski(points, degree) {
  let theColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  fill(theColors[degree]);
  noStroke();

  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  
  if (degree > 0) {
    sierpinski([points[0], findMid(points[0], points[1]), findMid(points[0], points[2])], degree-1);

    sierpinski([points[1], findMid(points[0], points[1]), findMid(points[1], points[2])], degree-1);

    sierpinski([points[2], findMid(points[0], points[2]), findMid(points[1], points[2])], degree-1);
  }
}

function findMid(p1, p2) {
  let xDiff = (p1.x + p2.x)/2;
  let yDiff = (p1.y + p2.y)/2;
  let midpoint = {x: xDiff, y: yDiff};
  return midpoint;
}


