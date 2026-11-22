---
layout: default
title: Hobby Projects
permalink: /hobby
description: Personal hobby projects by Yang Fan
---

Personal projects developed in spare time, ranging from world-building simulators to programming language design.

## Dreamulator

**A fantasy world building and simulation tool grounded in real science.**

Starting from stellar systems and physical laws, Dreamulator leverages knowledge across scientific disciplines to rigorously design and simulate fictional worlds.

- **Science-based world building**: Define stars, planets, atmospheres, and terrain using real astrophysical and geological parameters
- **Deterministic and reproducible**: A seeded simulation pipeline where identical inputs always produce identical outputs
- **Git-style branching**: Fork worlds at any layer to explore "what-if" scenarios without touching the main timeline
- **Browser demo + local app**: Explore published worlds or create your own directly in the browser; run full world builds locally via the CLI

\[ [GitHub](https://github.com/fyabc/dreamulator) \] \| \[ [Live Demo](https://fyabc.github.io/dreamulator/) \]

For current features, tech stack, and roadmap, see the [project README](https://github.com/fyabc/dreamulator#readme).

----

## Oort

**A toy programming language for learning compiler principles and language design.**

Named after the Oort cloud, Oort explores the full pipeline of a programming language, from grammar to bytecode execution, with a spec-and-proposal driven development process.

- **Language features**: C-like syntax, first-class functions and closures, classes with multiple inheritance (C3 MRO), iterators, operator overloading, extension methods, and modules
- **Dual execution backends**: A register-based bytecode VM (shared HIR + 32-bit bytecode) as the default path, with a tree-walking interpreter as fallback
- **Dialect layering**: Dynamically-typed `oort-object` plus a statically-checked `oort-core` probe with ADTs and exhaustive pattern matching
- **Spec-driven evolution**: Formal language spec, numbered design proposals (OPs), implementation notes, and a public roadmap

**Tech Stack**: Python, ANTLR 4, Pratt parsing, HIR/bytecode VM, MkDocs

\[ [GitHub](https://github.com/fyabc/oort-lang) \] \| \[ [Docs](https://fyabc.github.io/oort-lang/) \] \| \[ [PyPI](https://pypi.org/project/oort-lang/) \]
