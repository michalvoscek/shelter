# Shelter — Donation App

A multi-step donation wizard for a Slovak animal shelter, built with Next.js.

## Deployment

Deployed to **GitHub Pages** at [michalvoscek.github.io/shelter](https://michalvoscek.github.io/shelter). For this reason whole app has shelter base URL.

## Tech Stack

- **Framework:** Next.js 16 + React 19
- **Language:** TypeScript
- **Styling:** styled-components + Mantine UI
- **Forms:** react-hook-form + zod
- **Data:** TanStack Query
- **Linting:** ESLint 9

## Getting Started

```bash
npm install
npm run dev
```

## Features

- Multi-step donation form (amount → personal info → summary)
- Form validation with zod, connected to inputs via `aria-describedby`/`aria-errormessage`
- Searchable shelter combobox populated from API
- Phone number input with country flags and formatting
- Accessible skip-to-content link and keyboard navigation
- Mobile-responsive layout with horizontal swipe transitions
- Toast notifications that scale on hover and dismiss on mouse leave, Escape, or close button click


