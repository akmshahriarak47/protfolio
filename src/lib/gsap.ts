import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

// Public & Free Plugins included with standard `gsap`
import { CustomEase } from "gsap/CustomEase"
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack"
import { Draggable } from "gsap/Draggable"
import { EaselPlugin } from "gsap/EaselPlugin"
import { Flip } from "gsap/Flip"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { Observer } from "gsap/Observer"
import { PixiPlugin } from "gsap/PixiPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { TextPlugin } from "gsap/TextPlugin"

/**
 * Register all standard & free GSAP plugins.
 * 
 * Note: Club GreenSock premium plugins (SplitText, ScrollSmoother, DrawSVG, 
 * MorphSVG, Inertia, ScrambleText, CustomBounce, CustomWiggle, GSDevTools)
 * require a Club GreenSock license/token if you install them via private npm.
 */
gsap.registerPlugin(
  useGSAP,
  Draggable,
  EaselPlugin,
  Flip,
  MotionPathPlugin,
  Observer,
  PixiPlugin,
  ScrollTrigger,
  ScrollToPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase
)

export {
  gsap,
  useGSAP,
  CustomEase,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  Draggable,
  EaselPlugin,
  Flip,
  MotionPathPlugin,
  Observer,
  PixiPlugin,
  ScrollTrigger,
  ScrollToPlugin,
  TextPlugin,
}
