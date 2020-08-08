import { Point } from '../geometric/classes';


export class Link {
    constructor(
        public pt1: Point,
        public pt2: Point,
        private trans: number
    ) {
    }

    render(cntx: CanvasRenderingContext2D) {
        cntx.beginPath();
        cntx.strokeStyle = 'rgba(255, 255, 255,' + this.trans + ')';
        cntx.moveTo(this.pt1.x, this.pt1.y);
        cntx.lineTo(this.pt2.x, this.pt2.y);
        cntx.stroke();
    };
}