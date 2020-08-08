import { GeometricHelper } from './geometric.helper';
import { Point } from './classes/point';
import { Rect } from './classes/rect';
import { Circle } from './classes/circle';


export class IntersectionDetector {
    static PointToRect(pt: Point, rect: Rect): boolean {
        return pt.x >= rect.x
            && pt.x <= rect.right
            && pt.y >= rect.y
            && pt.y <= rect.bottom;
    }

    static PointToCircle(pt: Point, circle: Circle): boolean {
        const distance = GeometricHelper.distance(pt, new Point(circle.x, circle.y));
        return distance <= circle.radius;
    }

    static RectToRect(rectA: Rect, rectB:  Rect): boolean {
        if (rectA.right >= rectB.x &&
            rectA.x <= rectB.right &&
            rectA.bottom >= rectB.y &&
            rectA.y <= rectB.bottom
        ) {
            return true;
        }
        return false;
    }

    static RectToCircle(rect: Rect, circle: Circle): boolean {
        let testX = circle.x;
        let testY = circle.y;

        if (circle.x < rect.x) {
            testX = rect.x;
        } else if (circle.x > rect.right) {
            testX = rect.right;
        }

        if (circle.y < rect.y) {
            testY = rect.y;
        } else if (circle.y > rect.bottom) {
            testY = rect.bottom;
        }

        const distance = GeometricHelper.distance(new Point(circle.x, circle.y), new Point(testX, testY));

        return distance <= circle.radius;
    }
}