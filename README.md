# celiarico.dev

The official website of Celia Rico.

This project is an engineering-first website built to communicate ideas, experience and technical reasoning through a simple, maintainable and scalable architecture.

The website is intentionally designed as a communication system rather than a collection of pages.

---

# Project Goals

The project pursues four primary objectives.

- Present engineering expertise through clear technical communication.
- Demonstrate software architecture and engineering practices.
- Provide a fast, accessible and maintainable user experience.
- Serve as a public representation of the Professional Operating System.

The implementation should always prioritise understanding over visual complexity.

---

# Engineering Principles

Every implementation should follow these principles.

1. Simplicity
2. Maintainability
3. Scalability
4. Accessibility
5. Performance

The project follows the philosophy:

> Build the simplest solution that correctly communicates the intended idea.

---

# Architecture

The implementation follows a layered architecture.

```text
Design Tokens
        ↓
Primitives
        ↓
UI Components
        ↓
Feature Components
        ├── Content Blocks
        └── Communication Patterns
        ↓
Sections
        ↓
Pages
```

Each layer depends only on the layers below it.

Responsibilities should remain clearly separated.

---

# Project Structure

```text
src/

├── assets/
├── components/
│   ├── primitives/
│   ├── ui/
│   ├── content/
│   ├── patterns/
│   └── sections/
│
├── content/
├── design/
│   ├── motion/
│   └── tokens/
│
├── layouts/
├── lib/
├── pages/
├── styles/
└── types/
```

The directory structure mirrors the documented architecture.

---

# Technology Stack

Core technologies:

- Astro
- Tailwind CSS v4
- TypeScript
- Vite

Supporting tools:

- ESLint
- Prettier
- Husky
- lint-staged

The stack is intentionally minimal.

Every dependency should justify its existence.

---

# Design System

The website implements a custom Design System.

The Design System defines:

- layout
- typography
- interaction
- content blocks
- communication patterns
- sections

Components implement the Design System.

They never redefine it.

---

# Development Workflow

Implementation follows this sequence.

```text
Design Tokens

↓

Layout Primitives

↓

Typography

↓

Interaction

↓

Content Blocks

↓

Communication Patterns

↓

Sections

↓

Pages
```

Implementation should never skip architectural layers.

---

# AI-Assisted Development

This repository is designed for AI-assisted development.

Implementation agents should:

- follow the documented architecture
- preserve existing decisions
- minimise unnecessary complexity
- prefer composition over duplication

Architectural decisions should never be changed during implementation without explicit approval.

Project-specific implementation guidance is defined in:

```text
AGENTS.md
```

---

# Getting Started

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Run static analysis.

```bash
npm run lint
```

Format the project.

```bash
npm run format
```

Build the website.

```bash
npm run build
```

Preview the production build.

```bash
npm run preview
```

---

# Repository Philosophy

This repository contains implementation.

Architecture, strategy and engineering decisions are maintained separately inside the Professional Operating System (POS).

The implementation should remain aligned with that documentation while avoiding unnecessary duplication.

---

# Contributing

The project currently accepts contributions only from the project owner.

External contributions may be considered in the future if they align with the project's engineering principles.

---

# License

Copyright © Celia Rico.

All rights reserved.
