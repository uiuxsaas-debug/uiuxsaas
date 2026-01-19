---
description: Standards for generating Real Production UI (Boring, Safe, Conversion-Focused)
---

# Real Product UI Generation Standards

We have shifted from "AI-looking" designs (glassmorphism, gradients, viral hype) to "Real Product" designs.

## Core Principles
1. **Boring & Safe**: Design for production, not Dribbble.
2. **Solid Aesthetics**: No gradients, no glassmorphism. Use solid CSS variables.
3. **Layout Lock**: Vertical flex layouts, sticky CTAs.
4. **HTML Output**: Always generate clean, variable-based HTML.

## Prompting Strategy
When modifying prompts or generating UI:
- Enforce `white` or `solid` backgrounds.
- Use `rounded-xl` or `rounded-2xl`.
- Ban `backdrop-blur`.
- Focus on "ScreensDesign" level realism.

## Files to Maintain
- `data/Prompt.tsx`: Contains the Master Prompts.
- `data/constant.tsx`: Contains the HTML wrapper and CSS vars.
