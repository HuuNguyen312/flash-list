import { RefObject } from "react";
import { CompatScroller } from "../components/CompatScroller";
/**
 * On web an inverted list is flipped with transform: scaleY(-1) (scaleX(-1)
 * when horizontal). The native mouse wheel is not flipped, so it scrolls the
 * opposite way. Re-invert the wheel delta on the scroll node. Setting scrollTop
 * fires the scroll event, so virtualization keeps working.
 */
export declare function useInvertedWheelFix(scrollViewRef: RefObject<CompatScroller>, inverted: boolean | null | undefined, horizontal: boolean | null | undefined): void;
//# sourceMappingURL=useInvertedWheelFix.web.d.ts.map