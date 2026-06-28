# Architecture

This document provides a high-level overview of the implementation architecture of `celiarico.dev`.

It complements `AGENTS.md`.

`AGENTS.md` defines how AI agents collaborate.

This document explains how the project is organised.

The architectural source of truth remains the Professional Operating System (POS).

---

# Architecture Philosophy

The repository implements a layered architecture.

Each layer owns a single responsibility.

Layers compose lower layers.

Layers never depend on higher layers.

Architecture is intentionally explicit.

Complexity is reduced through composition rather than configuration.

---

# Source of Truth

Implementation decisions follow this order.

```text
Professional Operating System (POS)

↓

Architecture

↓

Design System

↓

Implementation Specifications

↓

Code
```

Code never defines architecture.

It implements it.

---

# Repository Structure

```text
src/

design/
    fonts/
    tokens/

types/

components/

    primitives/

    typography/

    ui/

    features/

        content/

        patterns/

layouts/

pages/

styles/
```

The repository mirrors the architectural layers.

Directories represent responsibilities rather than implementation convenience.

---

# Layer Responsibilities

## Design

Location:

```text
src/design/
```

Contains the Design System implementation.

Includes:

- fonts
- design tokens

No component logic exists here.

Everything in this layer is reusable throughout the project.

---

## Types

Location:

```text
src/types/
```

Contains shared TypeScript types.

Typical responsibilities:

- token-derived types
- reusable interfaces
- shared utility types

No implementation logic.

---

## Layout Primitives

Location:

```text
src/components/primitives/
```

Provide structural composition.

Examples:

- Container
- Stack
- Cluster
- Grid
- Flow
- Box

Responsibilities:

- layout
- spacing
- semantic wrappers

Primitives never communicate content.

---

## Typography Components

Location:

```text
src/components/typography/
```

Implement semantic typography.

Examples:

- Heading
- Lead
- Body
- Caption
- Quote
- Code

Responsibilities:

- semantic HTML
- reading hierarchy
- typography scale

Typography never owns layout.

---

## UI Components

Location:

```text
src/components/ui/
```

Reusable interface elements.

Examples:

- Button
- Link
- Card
- Badge
- Callout
- Divider

Responsibilities:

- interaction
- reusable interface behaviour
- surface treatment

UI Components never communicate business concepts.

---

## Feature Components

Location:

```text
src/components/features/
```

Feature Components communicate complete ideas.

They compose lower architectural layers.

They are divided into two sublayers.

### Content Blocks

Location:

```text
src/components/features/content/
```

Communicate one complete idea.

Examples:

- FeatureCard
- ServiceCard
- ExperienceCard
- PrincipleCard
- Stat
- QuoteBlock

Content Blocks never communicate relationships between ideas.

---

### Communication Patterns

Location:

```text
src/components/features/patterns/
```

Compose multiple Content Blocks.

Responsibilities:

- grouping
- comparison
- progression
- ordering

Examples:

- FeatureGrid
- ServiceComparison
- StatisticsRow
- PrincipleList
- TestimonialGroup

Patterns never introduce new UI behaviour.

---

## Layouts

Location:

```text
src/layouts/
```

Compose global page structure.

Responsibilities:

- document shell
- metadata
- global imports
- shared page framing

Layouts never contain reusable content.

---

## Pages

Location:

```text
src/pages/
```

Compose Sections into complete pages.

Responsibilities:

- routing
- page composition
- metadata

Pages should remain intentionally thin.

---

# Dependency Rules

Dependencies always point downward.

```text
Design Tokens
        ↓
Layout Primitives
        ↓
Typography Components
        ↓
UI Components
        ↓
Content Blocks
        ↓
Communication Patterns
        ↓
Layouts
        ↓
Pages
```

Never introduce upward dependencies.

Never introduce circular dependencies.

---

# Design Token Consumption

Every visual decision originates from the Design Token layer.

Components consume tokens using two mechanisms.

## Tier 1

Tailwind utility classes.

Preferred whenever possible.

Examples:

- colours
- spacing
- typography
- motion
- radius
- elevation

---

## Tier 2

CSS custom properties.

Used only when Tailwind utilities cannot express the required value.

Examples:

- reading measure
- container widths

Tier 2 exists as an exception.

Not as an alternative styling system.

---

# Component Principles

Every component should:

- own one responsibility
- expose a minimal API
- be composable
- remain reusable
- avoid unnecessary configuration

Components should solve today's problem.

Not hypothetical future problems.

---

# Accessibility

Accessibility is part of every architectural layer.

Responsibilities accumulate.

Examples:

Primitives

- landmarks
- structure

Typography

- semantic headings
- readable hierarchy

UI

- keyboard interaction
- focus management

Content Blocks

- self-contained meaning

Patterns

- logical grouping

Accessibility is implemented where the responsibility naturally belongs.

---

# Performance

Performance is a design requirement.

Prefer:

- static rendering
- server-first rendering
- minimal JavaScript
- progressive enhancement
- small bundles

Avoid client-side rendering unless necessary.

---

# Repository Conventions

The project intentionally avoids:

- barrel exports
- generic helper components
- utility wrappers without responsibility
- premature abstractions

Directories should remain easy to navigate.

Architecture should remain obvious.

---

# Development Workflow

Every implementation follows the same sequence.

```text
Understand

↓

Plan

↓

Implement

↓

Review

↓

Validate
```

Validation always includes:

- lint
- format
- build

No implementation is considered complete without all three passing.

---

# Guiding Principles

Keep these principles in mind throughout the project.

- Architecture before implementation.
- Composition before configuration.
- Simplicity before flexibility.
- Explicitness before cleverness.
- Design Tokens before hardcoded values.
- Accessibility by default.
- Performance by design.

The best architecture is the one that makes the correct implementation the easiest one to write.
