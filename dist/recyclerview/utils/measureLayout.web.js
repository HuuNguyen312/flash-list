/**
 * Gets scroll offsets from up to 3 parent elements
 */
function getScrollOffsets(element, stopAt) {
    var _a, _b;
    let scrollX = 0;
    let scrollY = 0;
    let currentElement = element;
    // Only check up to 3 parent elements
    while (currentElement && currentElement !== stopAt) {
        const htmlElement = currentElement;
        scrollX += (_a = htmlElement.scrollLeft) !== null && _a !== void 0 ? _a : 0;
        scrollY += (_b = htmlElement.scrollTop) !== null && _b !== void 0 ? _b : 0;
        currentElement = currentElement.parentElement;
    }
    return { scrollX, scrollY };
}
/**
 * Checks if two dimension values are not equal, with a small tolerance.
 */
export function areDimensionsNotEqual(value1, value2) {
    return !areDimensionsEqual(value1, value2);
}
/**
 * Checks if two dimension values are equal, with a small tolerance.
 */
export function areDimensionsEqual(value1, value2) {
    return Math.abs(value1 - value2) <= 1;
}
export function roundOffPixel(value) {
    return value;
}
/**
 * Measures the size of the RecyclerView's outer container.
 */
export function measureParentSize(view) {
    return {
        width: view.clientWidth,
        height: view.clientHeight,
    };
}
/**
 * Detects whether an element is flipped vertically via a scaleY(-1) transform
 * (used by inverted lists on web). Reads the computed transform matrix.
 */
function isVerticallyFlipped(element) {
    const transform = getComputedStyle(element).transform;
    if (!transform || transform === "none")
        return false;
    const match = transform.match(/matrix(3d)?\(([^)]+)\)/);
    if (!match)
        return false;
    const values = match[2].split(",").map((value) => parseFloat(value));
    // matrix(a,b,c,d,e,f) -> scaleY = d (index 3); matrix3d -> m22 (index 5)
    const scaleY = match[1] ? values[5] : values[3];
    return scaleY < 0;
}
/**
 * Measures the layout of child container of RecyclerView
 */
export function measureFirstChildLayout(childContainerView, parentView) {
    const childRect = childContainerView.getBoundingClientRect();
    const parentRect = parentView.getBoundingClientRect();
    // Get scroll offsets for child container (max 3 parents)
    const scrollOffsets = getScrollOffsets(childContainerView, parentView);
    // When inverted on web the outer container is flipped with scaleY(-1), so
    // getBoundingClientRect returns mirrored coordinates. Measure from the bottom
    // edge in that case so firstItemOffset stays ~0 (matches non-inverted).
    const y = isVerticallyFlipped(parentView)
        ? parentRect.bottom - childRect.bottom + scrollOffsets.scrollY
        : childRect.top - parentRect.top + scrollOffsets.scrollY;
    return {
        x: childRect.left - parentRect.left + scrollOffsets.scrollX,
        y,
        width: roundOffPixel(childRect.width),
        height: roundOffPixel(childRect.height),
    };
}
/**
 * Measures the layout of items of RecyclerView
 */
export function measureItemLayout(item, oldLayout) {
    const layout = {
        x: 0,
        y: 0,
        width: item.clientWidth,
        height: item.clientHeight,
    };
    if (oldLayout) {
        if (areDimensionsEqual(layout.width, oldLayout.width)) {
            layout.width = oldLayout.width;
        }
        if (areDimensionsEqual(layout.height, oldLayout.height)) {
            layout.height = oldLayout.height;
        }
    }
    return layout;
}
//# sourceMappingURL=measureLayout.web.js.map