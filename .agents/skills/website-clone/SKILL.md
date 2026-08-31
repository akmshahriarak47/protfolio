---
name: website-clone
description: >-
  Visual website inspection and full design cloning skill. Use this skill when the user wants to visually inspect a website (take screenshots, analyze layouts with eyes, inspect DOM), copy or clone an existing website's UI/UX, extract styles/assets/tokens, or recreate a target website in React/HTML/Tailwind with pixel-perfection.
---

# Website Clone & Visual Inspection Skill

This skill enables visual inspection ("seeing the website with your eyes") and high-fidelity cloning/recreation of any target website design.

---

## 1. Seeing the Website Visually ("Eyes Mode")

To see and analyze web pages visually:

### Method A: Chrome DevTools MCP (Direct Screenshot & Snapshot)
1. **Navigate**: Call `call_mcp_tool` with `ServerName: "chrome-devtools-mcp"`, `ToolName: "navigate_page"`, `Arguments: { "url": "<TARGET_URL>" }`.
2. **Set Viewport**: Call `ToolName: "resize_page"`, `Arguments: { "width": 1440, "height": 900 }` (or mobile: `375x812`).
3. **Capture Screenshot**: Call `ToolName: "take_screenshot"`.
4. **Inspect with Vision**: Use `view_file` on the saved screenshot to analyze layout, typography, colors, padding, and alignments with your visual reasoning.

### Method B: Browser Subagent (Interactive Exploration)
For sites requiring user interactions (scrolling, clicking modals, hovering, dropdowns):
- Invoke `browser_subagent` with instructions to browse, scroll to each section, capture recordings/screenshots, and inspect computed DOM elements.

---

## 2. Cloning & Extracting Website Design

### Step 1: Design Tokens & Visual DNA Extraction
Extract the core design parameters from the target website:
- **Color Palette**: Backgrounds, surfaces, brand accents, border colors, text primaries/secondaries.
- **Typography**: Font families (Google Fonts / custom fonts), font weights, sizes, line heights, letter spacings.
- **Elevation & Depth**: Box shadows, borders, glassmorphism (`backdrop-filter: blur(...)`), gradients.
- **Layout Grid**: Container max-widths (`max-w-7xl`, `1280px`, etc.), section paddings (`py-24`), gap spacings.

### Step 2: Extracting Assets & SVGs
- **Icons & Logos**: Extract clean inline SVGs directly from the target DOM or reproduce crisp modern Lucide/FontAwesome equivalents.
- **Images & Backgrounds**: Extract high-resolution media URLs or generate matching thematic visual assets using `generate_image`.

### Step 3: Rebuilding the Codebase
When cloning a design into code:
1. **Match Structure Exactly**:
   - Header / Navigation Bar (sticky blur, brand logo, action buttons)
   - Hero Section (compelling typography, pill badge, call-to-actions, hero imagery/mockup)
   - Social Proof / Logo Cloud
   - Feature Bento Grids & Interactive Showcase Cards
   - Metrics / Stats Section
   - Testimonials / Reviews Carousel
   - Pricing Table (toggle switches, popular badge, feature checklist)
   - FAQ Accordion
   - Footer
2. **Replicate Micro-Interactions & Hover States**:
   - Smooth button transitions (`transform scale`, glow effects, active states)
   - Card border glows and subtle tilt effects
   - Smooth scroll reveals
3. **Ensure 100% Responsiveness**: Mobile (`<640px`), Tablet (`<1024px`), and Desktop (`>1024px`).

---

## 3. Workflow Checklist for User Requests

1. **Ask/Verify Target URL or Screenshot**: Get the live URL or screenshot file from the user.
2. **Take Screenshot & Inspect**: Use Chrome DevTools / Browser Subagent to view the site visually.
3. **Reverse-Engineer Design**: Synthesize colors, typography, layout cards, and assets.
4. **Implement Code**: Create or update the target files (HTML/CSS/JS, React, or Vite).
5. **Verify Visually**: Take a screenshot of the cloned local build, compare against original, and refine until pixel-matched.
