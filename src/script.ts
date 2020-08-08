import { Point, Rect, Circle } from './geometric/classes';
import { Node } from './classes/node';
import { RandomHelper } from './random/random.helper';
import { GeometricHelper } from './geometric/geometric.helper';
import { Link } from './classes/link';
import { QuadTree } from './quad-tree/quad-tree';


const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const cntx = <CanvasRenderingContext2D>canvas.getContext('2d');

let width: number;
let height: number;

const LINK_DIST = 150;
const NODE_COUNT = 250;
let edgeLeft: number;
let edgeRight: number;
let edgeTop: number;
let edgeBottom: number;

let nodes: Node[] = [];
let links = [];

let lastRenderTime: number;
let fps: number = 0;
let showFPS: boolean = false;

let animationId: number;
let animationInterval = 1000 / 10;
let animationNow: number;
let animationThen: number = Date.now();
let animationDelta: number;

let quadTreeRect: Rect;
let quadTree: QuadTree;

setup();
animate(update);

function setup() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    edgeTop = -LINK_DIST;
    edgeLeft = -LINK_DIST;
    edgeRight = width + LINK_DIST;
    edgeBottom = height + LINK_DIST;

    quadTreeRect = new Rect(0, 0, width, height);

    lastRenderTime = Date.now();

    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push(getNewNode());
    }
}

function animate(action: Function) {
    animationId = requestAnimationFrame(function frameAnimate() {
    //     animationNow = Date.now();
    //     animationDelta = animationNow - animationThen;
        animationId = requestAnimationFrame(frameAnimate);

    //     if (animationDelta > animationInterval) {
            action();
            // animationThen = animationNow - (animationDelta % animationInterval);
    //     }
    });
}

function stopAnimation() {
    window.cancelAnimationFrame(animationId);
}

function clear() {
    cntx.clearRect(0, 0, width, height);
}

function draw() {
    clear();

    nodes.forEach(node => {
        node.render(cntx);
    })

    links.forEach(link => {
        link.render(cntx);
    });

    // drawQuadTree();

    if (showFPS) {
        renderFPS();
    }
}

function drawQuadTree() {
    cntx.strokeStyle = 'red';
    drawQuadTreeRecursive(quadTree);
}

function drawQuadTreeRecursive(tree: QuadTree) {
    const rect = tree.boundary;
    cntx.strokeRect(rect.x, rect.y, rect.width, rect.height);

    if (tree.tlChild) drawQuadTreeRecursive(tree.tlChild);
    if (tree.trChild) drawQuadTreeRecursive(tree.trChild);
    if (tree.blChild) drawQuadTreeRecursive(tree.blChild);
    if (tree.brChild) drawQuadTreeRecursive(tree.brChild);
}

function update() {
    const now = Date.now();

    updateFps(now);
    updateNodePos();
    findLink();

    draw();

    lastRenderTime = now;
}

function updateNodePos() {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].pos.x += nodes[i].speed.x;
        nodes[i].pos.y += nodes[i].speed.y;

        // Y downUpdate
        if (nodes[i].pos.y < edgeTop) {
            nodes[i] = getNewNode();
            nodes[i].pos.y = edgeBottom;
        }
        // Y topUpdate
        if (nodes[i].pos.y > edgeBottom) {
            nodes[i] = getNewNode();
            nodes[i].pos.y = edgeTop;
        }

        // X leftUpdate
        if (nodes[i].pos.x < edgeLeft) {
            nodes[i] = getNewNode();
            nodes[i].pos.x = edgeRight;
        }
        // X rightUpdate
        if (nodes[i].pos.x > edgeRight) {
            nodes[i] = getNewNode();
            nodes[i].pos.y = edgeLeft;
        }
    }
}

function updateFps(now: number) {
    const dt = (now - lastRenderTime) / 1000.0;
    fps = Math.floor(1 / dt);
}

function getNewNode(): Node {
    const posX = RandomHelper.rangeInteger(0, width);
    const posY = RandomHelper.rangeInteger(-LINK_DIST, height + LINK_DIST);
    const radius = RandomHelper.rangeInteger(6, 13);
    const speedX = RandomHelper.range(-1.0, 1.0);
    const speedY = RandomHelper.range(-1.0, 1.0);
    return new Node(posX, posY, radius, speedX, speedY);
}

function getDist(pt1: Point, pt2: Point) {
    return GeometricHelper.distance(pt1, pt2);
}

function findLink() {
    quadTree = buildQuadTree();

    links = [];
    nodes.forEach(node => {
        const nodeRange = new Circle(node.pos.x, node.pos.y, LINK_DIST);
        const nodePoints = quadTree.getRangePoints(nodeRange);
        nodePoints.forEach(nodePoint => {
            if (node.pos.x === nodePoint.x && node.pos.y === nodePoint.y) {
                return;
            }

            const dist = getDist(nodePoint, node.pos);
            const trans = 1 - dist / LINK_DIST;
            links.push(new Link(nodePoint, node.pos, trans));
        });
    });
}

function renderFPS() {
    cntx.fillStyle = 'red';
    cntx.font = 'normal 16pt Arial';
    cntx.fillText(fps + ' fps', 10, 26); 
}

function buildQuadTree(): QuadTree {
    const quadTree = new QuadTree(quadTreeRect, 1);
    nodes.forEach(node => {
        quadTree.insert(node.pos);
    });
    return quadTree;
}