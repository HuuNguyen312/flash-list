import { useEffect } from "react";
/**
 * On web an inverted list is flipped with transform: scaleY(-1) (scaleX(-1)
 * when horizontal). The native mouse wheel is not flipped, so it scrolls the
 * opposite way. Re-invert the wheel delta on the scroll node. Setting scrollTop
 * fires the scroll event, so virtualization keeps working.
 */
export function useInvertedWheelFix(scrollViewRef, inverted, horizontal) {
    useEffect(() => {
        var _a, _b;
        if (!inverted)
            return;
        const scrollNode = (_b = (_a = scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.getScrollableNode) === null || _b === void 0 ? void 0 : _b.call(_a);
        if (!(scrollNode === null || scrollNode === void 0 ? void 0 : scrollNode.addEventListener))
            return;
        const onWheel = (event) => {
            if (horizontal) {
                if (!event.deltaX)
                    return;
                event.preventDefault();
                scrollNode.scrollLeft -= event.deltaX;
            }
            else {
                if (!event.deltaY)
                    return;
                event.preventDefault();
                scrollNode.scrollTop -= event.deltaY;
            }
        };
        scrollNode.addEventListener("wheel", onWheel, { passive: false });
        return () => scrollNode.removeEventListener("wheel", onWheel);
    }, [scrollViewRef, inverted, horizontal]);
}
//# sourceMappingURL=useInvertedWheelFix.web.js.map