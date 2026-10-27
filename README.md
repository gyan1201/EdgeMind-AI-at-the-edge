# EdgeMind — AI at the edge

EdgeMind turns trained models into sensor-ready workloads. The runtime handles model packaging,
stream processing, event thresholds, and fleet updates without forcing teams to rebuild their
device stack.

**Live demo:** [https://gyan1201.github.io/EdgeMind-AI-at-the-edge/](https://gyan1201.github.io/EdgeMind-AI-at-the-edge/)

## What is in the build

The site is a working product walkthrough rather than a static brochure. Each capability has its
own interactive surface:

| Section | What you can do |
| --- | --- |
| **Runtime** | See how sensing, inference, filtering, and forwarding fit together |
| **Tiny model packaging** | Pick a model, precision (FP32 → INT4), pruning, and target class; the bundle size, RAM arena, latency, and accuracy update live |
| **Local signal decisions** | Run a live sensor stream, move the event gate, and watch windows get classified, held, or forwarded |
| **Event-first networking** | Compare raw relay vs. event egress for 1,000 nodes, inspect the signed event envelope, and see the wire format |
| **Fleet-safe updates** | Advance a four-ring rollout, trip the drift gate, override it, or roll the fleet back |
| **Deployments** | Reference workloads and the `workload.yaml` declaration used to deploy them |

## Stack

- React 19 + TypeScript
- Vite 7 with `vite-plugin-singlefile` (the production build is one self-contained `index.html`)
- Tailwind CSS v4 with a custom design system in `src/index.css`
- Framer Motion for reveal, layout, and state transitions
- Inter Variable + JetBrains Mono (bundled locally in `src/assets/fonts`)

## Development

```bash
npm install
npm run dev        # local dev server
npm run build      # production build in dist/ (single file)
npm run preview    # preview the production build
```

The Vite base path is set to `/EdgeMind-AI-at-the-edge/` for GitHub Pages. When running the dev
server behind a preview proxy, allow the host once with `npm run dev -- --base=/`.

## Structure

```
src/
  App.tsx                 page composition
  components/
    Nav.tsx               sticky nav, scroll progress, section observer, mobile menu
    Hero.tsx              hero + live sensor card + spec ticker
    Runtime.tsx           four runtime jobs + stream path
    Packaging.tsx         model / precision / prune / target calculator
    Signals.tsx           live sensor simulator and verdict panel
    Networking.tsx        raw vs event egress + JSON envelope
    Fleet.tsx             ring rollout, drift gate, rollback
    Deployments.tsx       reference workloads + workload.yaml
    Pilot.tsx             closing CTA and pilot brief
    Footer.tsx
    ui.tsx                shared primitives (Reveal, SectionHead, StatusDot, CopyButton)
    Icons.tsx             inline SVG icon set
  lib/
    data.ts               models, precisions, targets, rings, manifests
    sim.ts                deterministic noise, formatting, clock helpers
  assets/                 hero image and bundled fonts
```

## Deployment

`.github/workflows` builds the site with `npm ci && npm run build` and publishes `dist/` to GitHub
Pages on every push to `main`.
