# Data Structure & Algorithm Visualizer

A modern, interactive web application for visualizing core data structures and algorithms through smooth animations and hands-on controls.

Built as a resume-quality frontend project with a scalable architecture for adding more algorithms over time.

## Overview

This project helps learners understand how algorithms work internally by turning each operation into a visual animation. The sorting visualizer uses a replayable step system: algorithms generate animation steps first, and the UI plays them back with pause, resume, speed control, and step-by-step execution.

## Features

- Dashboard-style responsive interface
- Dark mode by default with theme toggle
- Sorting visualizer with:
  - Bubble Sort
  - Selection Sort
  - Merge Sort
  - Quick Sort
- Replayable animation-step architecture
- Start, pause, reset, and step controls
- Adjustable animation speed
- Adjustable array size
- Algorithm complexity information panel
- Stack visualizer with push, pop, and peek
- Queue visualizer with enqueue and dequeue
- Linked list visualizer with insert, delete, and traverse
- Binary search tree visualizer with insert, search, and delete
- Mobile-friendly sidebar navigation
- Smooth animations and polished UI states

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- shadcn/ui-style components
- Framer Motion
- Lucide React
- Radix UI primitives
- pnpm

## Project Structure

```text
src/
├── algorithms/      # Algorithm step generators
├── components/      # Reusable UI and visualizer components
├── data/            # Static metadata and app data
├── hooks/           # Visualizer state and playback hooks
├── layouts/         # App shell and navigation layout
├── lib/             # Shared utilities
├── pages/           # Visualizer pages
├── styles/          # Global Tailwind styles
└── utils/           # Helper functions
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/kavay27/dsa_visualizer.git
cd dsa_visualizer
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open the app:

```text
http://127.0.0.1:5173
```

## Build

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Deployment

Recommended platform: Vercel

Use these settings:

```text
Framework Preset: Vite
Install Command: pnpm install
Build Command: pnpm build
Output Directory: dist
```

The app can also be deployed on Netlify or Cloudflare Pages with the same build command and output directory.

## Algorithm Architecture

The sorting visualizer does not directly animate inside the sorting logic. Instead, each algorithm produces a list of animation steps.

Example step:

```js
{
  type: "swap",
  indices: [i, j]
}
```

The playback hook consumes those steps and updates the visual state over time. This keeps algorithm logic separate from animation rendering and makes the project easier to extend.

## Future Improvements

- Add graph algorithms such as BFS, DFS, and Dijkstra
- Add heap and trie visualizers
- Add algorithm comparison mode
- Add persistent user preferences
- Add keyboard shortcuts for stepping through animations
- Add sound effects for comparisons and swaps

## Author

Created by [@kavay27](https://github.com/kavay27)
