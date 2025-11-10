import { useSpring } from "react-spring";
import { SPRING_CONFIGS } from "@/animations/springConfigs.js";

export function useFadeSpring(isVisible, preset = "smooth") {
  return useSpring({
    opacity: isVisible ? 1 : 0,
    config: SPRING_CONFIGS[preset],
  });
}
