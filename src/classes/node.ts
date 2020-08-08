import { Point, Vector } from '../geometric/classes';


export class Node {
    pos: Point;
    radius: number;
    speed: Vector;

    constructor(x: number, y: number, radius: number, speedX: number, speedY: number) {
        this.pos = new Point(x, y);
        this.radius = radius;
        this.speed = new Vector(speedX, speedY);
    }

    render(cntx: CanvasRenderingContext2D) {
        // background
        cntx.beginPath();
        cntx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        cntx.arc(this.pos.x, this.pos.y, Math.floor(1.5 * this.radius), 0, 2 * Math.PI, false);
        cntx.fill();

        // front node
        cntx.beginPath();
        cntx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        cntx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        cntx.fill();
    };
}