interface Rectangle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

// Main function to test if is covered
function isCovered(target: Rectangle, regions: Rectangle[]): boolean {
    let coveredRegions: Rectangle[] = [target];

    for (const region of regions) {
        const newCoveredRegions: Rectangle[] = [];
        for (const coveredRegion of coveredRegions) {
            const intersection = getIntersection(coveredRegion, region);
            if (intersection) {
                const splits = splitRectangle(coveredRegion, intersection);
                newCoveredRegions.push(...splits);
            } else {
                newCoveredRegions.push(coveredRegion);
            }
        }
        coveredRegions = newCoveredRegions;
    }

    // If there are no covered regions left, the target is completely covered
    return coveredRegions.length === 0;
}

function getIntersection(r1: Rectangle, r2: Rectangle): Rectangle | null {
    if (!doRectanglesOverlap(r1, r2)) return null;
    return {
        x1: Math.max(r1.x1, r2.x1),
        y1: Math.max(r1.y1, r2.y1),
        x2: Math.min(r1.x2, r2.x2),
        y2: Math.min(r1.y2, r2.y2)
    };
}

function doRectanglesOverlap(r1: Rectangle, r2: Rectangle): boolean {
    return !(r2.x1 >= r1.x2 ||
        r2.x2 <= r1.x1 ||
        r2.y1 >= r1.y2 ||
        r2.y2 <= r1.y1);
}

function splitRectangle(outer: Rectangle, inner: Rectangle): Rectangle[] {
    const result: Rectangle[] = [];

    // Add the left strip
    if (outer.x1 < inner.x1) {
        result.push({ x1: outer.x1, y1: outer.y1, x2: inner.x1, y2: outer.y2 });
    }

    // Add the right strip
    if (outer.x2 > inner.x2) {
        result.push({ x1: inner.x2, y1: outer.y1, x2: outer.x2, y2: outer.y2 });
    }

    // Add the bottom strip
    if (outer.y1 < inner.y1) {
        result.push({ x1: Math.max(outer.x1, inner.x1), y1: outer.y1, x2: Math.min(outer.x2, inner.x1), y2: inner.y1 });
    }

    // Add the top strip
    if (outer.y2 > inner.y2) {
        result.push({ x1: Math.max(outer.x1, inner.x1), y1: inner.y2, x2: Math.min(outer.x2, inner.x2), y2: outer.y2 });
    }

    return result;
}