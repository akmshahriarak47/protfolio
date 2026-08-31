---
name: DevFocus Dark
colors:
  primary: "#2665fd"
  secondary: "#475569"
  surface: "#0b1326"
  surface-variant: "#131f37"
  border: "#1e293b"
  on-surface: "#dae2fd"
  on-surface-muted: "#94a3b8"
  error: "#ffb4ab"
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 600
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
---

# Design System

## Overview
A focused, minimal dark interface for developer productivity tools and modern web applications.
Clean lines, low visual noise, high information density, and refined micro-interactions.

## Colors
- **Primary** (`#2665fd`): CTAs, active states, key interactive accents, links.
- **Secondary** (`#475569`): Supporting UI, tags/chips, secondary actions.
- **Surface** (`#0b1326`): Deep page background and canvas.
- **Surface Variant** (`#131f37`): Card backgrounds, elevated containers, input backdrops.
- **Border** (`#1e293b`): Subtle dividers, element outlines.
- **On-surface** (`#dae2fd`): Primary readable text on dark backgrounds.
- **On-surface Muted** (`#94a3b8`): Secondary text, timestamps, placeholder text.
- **Error** (`#ffb4ab`): Validation warnings, alert states, destructive actions.

## Typography
- **Headlines**: Inter, semi-bold (600), high contrast.
- **Body**: Inter, regular (400), 14–16px, line-height 1.5.
- **Labels & Badges**: Inter, medium (500), 12px, uppercase with subtle letter-spacing for section headers.
- **Code / Monospace**: JetBrains Mono or Fira Code for snippets and technical keys.

## Components
- **Buttons**:
  - Primary: `#2665fd` fill, `#ffffff` text, 8px radius, subtle hover glow.
  - Secondary / Outline: 1px `#1e293b` border, transparent background, hover state with `#131f37`.
- **Inputs**: 1px `#1e293b` border, `#131f37` background, 8px radius, `#2665fd` focus ring.
- **Cards & Panels**: Flat or subtle `#131f37` elevation, 1px `#1e293b` border, 8px or 12px corner radius.
- **Modals & Popovers**: Backdrop blur with glassmorphism over `#0b1326e6`.

## Do's and Don'ts
- **Do** use the primary color sparingly, reserved for focal actions and highlights.
- **Do** maintain a minimum 4.5:1 contrast ratio for readable text against backgrounds.
- **Don't** mix rounded and sharp corners within the same component hierarchy.
- **Don't** use pure `#000000` or raw high-saturation primaries that induce eye strain in dark mode.
