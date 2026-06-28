# ARCHITECTURE.md

# Project Architecture

This document provides a high-level overview of the architecture implemented by `celiarico.dev`.

It is intended for developers and AI development agents contributing to the project.

For implementation rules, see `AGENTS.md`.

---

# Philosophy

The project follows an engineering-first approach.

The website is designed as a communication system rather than a collection of independent pages.

The architecture prioritises:

1. Simplicity
2. Maintainability
3. Scalability
4. Accessibility
5. Performance

Every implementation decision should preserve these priorities.

---

# Architectural Layers

The project follows a strict layered architecture.

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

Dependencies must always point downwards.

Higher layers compose lower layers.

Lower layers must never depend on higher ones.

---

# Layer Responsibilities

## Design Tokens

Define the visual language.

Examples:

- colours
- spacing
- typography
- shadows
- radii
- motion values

Tokens contain no behaviour.

---

## Primitives

Provide the smallest reusable layout elements.

Examples:

- Container
- Stack
- Grid
- Flow
- Cluster
- Box

Primitives establish structure only.

---

## UI Components

Implement reusable interface elements.

Examples:

- Button
- Link
- Input
- Divider
- Badge

UI Components remain context-independent.

---

## Feature Components

Represent reusable communication units.

Feature Components are divided into:

### Content Blocks

Communicate one complete idea.

Examples:

- Service Card
- Principle Card
- Experience Card
- Quote
- Statistic

---

### Communication Patterns

Communicate relationships between multiple ideas.

Examples:

- Process Timeline
- Architecture Diagram
- Comparison Matrix
- Decision Flow

Communication Patterns are composed from reusable Content Blocks.

---

## Sections

Sections organise communication into complete narrative units.

Every Section answers one visitor question while naturally leading to the next.

---

## Pages

Pages compose Sections into complete user experiences.

Pages own:

- routing
- metadata
- composition

Nothing else.

---

# Repository Structure

```text
src/

assets/

components/
    primitives/
    ui/
    content/
    patterns/
    sections/

content/

design/
    tokens/
    motion/

layouts/

lib/

pages/

styles/

types/
```

The repository structure mirrors the architectural layers.

---

# Design System

The Design System defines:

- layout
- typography
- interaction
- content blocks
- communication patterns
- sections

Implementation must always follow the Design System.

Components never redefine it.

---

# Motion

Motion is part of the shared language of the interface.

Animations communicate:

- continuity
- progression
- feedback

They never exist purely for decoration.

---

# Accessibility

Accessibility is considered a design requirement.

Every reusable component should:

- use semantic HTML
- support keyboard navigation
- preserve logical reading order
- remain understandable without animation

Accessibility belongs to the system.

Not individual pages.

---

# Component Principles

Every component should:

- have one responsibility
- remain reusable
- minimise configuration
- favour composition
- expose explicit APIs

Complexity should emerge through composition.

Never through increasingly generic components.

---

# Implementation Workflow

Development progresses from the lowest architectural layer to the highest.

```text
Design Tokens

↓

Primitives

↓

UI Components

↓

Content Blocks

↓

Communication Patterns

↓

Sections

↓

Pages
```

No implementation should skip architectural layers.

---

# AI-Assisted Development

The project is designed for AI-assisted implementation.

Development agents should:

- understand the architecture before writing code
- preserve existing decisions
- avoid unnecessary abstraction
- propose improvements without changing architecture autonomously

Implementation guidance is defined in `AGENTS.md`.

---

# Guiding Principle

Architecture exists to make implementation predictable.

Every new component, page or feature should naturally fit into the existing system rather than expanding it.
