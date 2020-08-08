import { Point, Vector } from './classes';


export class GeometricHelper {
    static degreeToRadian(degree: number): number {
        return degree * Math.PI / 180;
    }

    static distance(ptA: Point, ptB: Point): number {
        const dx = ptB.x - ptA.x;
        const dy = ptB.y - ptA.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static ort(ptA: Point, ptB: Point): Vector {
        const distance = this.distance(ptA, ptB);
        const dx = ptB.x - ptA.x;
        const dy = ptB.y - ptA.y;
        return new Vector(dx / distance, dy / distance);
    }

    static constrain(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }
}
