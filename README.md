# 💎 ANICHISOM — Design System Component Browser

> A high-performance, futuristic Design Token & Component Library Browser built for the **ANICHISOM** brand identity.

![ANICHISOM Design System](/public/next.svg)

---

## 🚀 Key Features

- 🎨 **Complete ANICHISOM Brand Audit**: Built-in specifications for logos, color palettes, typography scale, spacing tokens, shadow glows, buttons, cards, badges, inputs, icon suite, and feedback UI.
- ⚡ **Self-Updating Figma Integration**: Connect your Figma REST API key and File Key to auto-sync design tokens. Includes a live Webhook Simulator for testing auto-push token sync events.
- 📄 **YAML & JSON Token Engines**: Drag-and-drop file importer for custom `.json` or `.yaml` token specifications.
- 💻 **Multi-Format Code Exporters**: One-click code generation for:
  - **Tailwind CSS v4** (`@theme` definitions and utility classes)
  - **CSS Variables** (`:root` definitions)
  - **React TSX Component** snippets with full prop definitions
  - **W3C JSON & YAML** Token Schemas
- 🔍 **Command Palette & Instant Search**: Global `Cmd+K` / `Ctrl+K` overlay search engine with keyboard shortcut navigation.
- 🛠️ **Live Theme Customizer**: Dynamic CSS variable mutation drawer allowing real-time theme customization across the entire browser.
- 📊 **Brand Guide PDF Generator**: Instant browser-side export of an official ANICHISOM Brand Specification PDF sheet.
- ♿ **WCAG 2.1 Contrast Inspector**: Built-in AAA/AA contrast calculator for testing readability against Obsidian dark and light surfaces.

---

## 🛠️ Stack & Architecture

- **Framework**: Next.js 14 / Next.js 16 App Router (TypeScript)
- **Styling**: Tailwind CSS v4 + Custom Cyber Utilities
- **State Management**: Zustand
- **PDF Export Engine**: jsPDF
- **Icons**: Lucide React + ANICHISOM Custom SVG Suite
- **YAML Parser**: `js-yaml`
- **Animations & Effects**: `framer-motion` & `canvas-confetti`

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS v4 & CSS variables
│   │   ├── layout.tsx           # Root layout & Google fonts
│   │   └── page.tsx             # Main component browser view
│   ├── components/
│   │   ├── BrandLogos.tsx       # SVG Logo Suite (Monogram, Wordmark, Badge, Cyber Icon)
│   │   ├── CategorySidebar.tsx  # Left category navigation panel
│   │   ├── CommandPaletteModal.tsx # Cmd+K overlay & shortcut help
│   │   ├── ComponentCard.tsx    # Component card with live spec preview
│   │   ├── ComponentDetailModal.tsx # Sandbox, code exporter & WCAG inspector
│   │   ├── ComponentGrid.tsx    # Filtered component grid layout
│   │   ├── FigmaSyncModal.tsx   # Figma REST API & Webhook sync simulator
│   │   ├── Header.tsx           # Navigation header & global actions
│   │   ├── LiveTokenCustomizer.tsx # Live CSS variable mutation drawer
│   │   └── TokenUploaderModal.tsx  # JSON / YAML drag & drop importer
│   ├── data/
│   │   ├── anichisom-tokens.json  # Complete JSON design tokens spec
│   │   └── anichisom-tokens.yaml  # Complete YAML design tokens spec
│   ├── lib/
│   │   ├── code-generators.ts   # Multi-language code snippet exporter
│   │   ├── figma-api.ts         # Figma API fetcher & webhook simulator
│   │   ├── pdf-exporter.ts      # Brand Guide PDF sheet generator
│   │   └── token-store.ts       # Zustand state engine
│   └── types/
│       └── tokens.ts            # TypeScript interfaces
├── vercel.json                  # Vercel deployment configuration
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/anichisom/design-system-browser.git
cd design-system-browser
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Updating Tokens (Figma API vs. Repo YAML)

### Method A: Local YAML/JSON File Update (Simplest)
Modify `/src/data/anichisom-tokens.yaml` or `/src/data/anichisom-tokens.json` in your codebase and commit changes.

### Method B: Self-Updating Figma Integration (Live)
1. Click **Figma Sync** in the header.
2. Enter your Figma Personal Access Token (`figd_...`) and Figma File Key.
3. Click **Fetch Figma API Tokens** or use **Simulate Webhook Sync** to pull remote styles automatically into the application state.

---

## ☁️ Deployment (Vercel)

1. Push repository to GitHub.
2. Connect repository to [Vercel](https://vercel.com).
3. Set environment variable `NEXT_PUBLIC_FIGMA_API_KEY` (optional).
4. Click **Deploy**.

---

## 📜 License

MIT License © 2026 ANICHISOM. All rights reserved.
