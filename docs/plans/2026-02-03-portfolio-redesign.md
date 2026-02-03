# Portfolio Redesign - Design Document

**Date:** 2026-02-03
**Branch:** release/next
**Status:** Awaiting Approval

---

## Overview

Transform mappso.com from a minimal VSCode-styled placeholder into an interactive developer portfolio with project showcases, skills presentation, and work history - all while maintaining and enhancing the VSCode aesthetic.

---

## Design Decisions

| Decision | Choice |
|----------|--------|
| Content focus | Developer Portfolio with interactive showcases |
| Project display | Modal/overlay split panels |
| Skills presentation | VSCode Extensions panel style |
| Experience timeline | Git commit history with branch visualization |
| Compozerr showcase | Deep dive with multiple tabs |

---

## Site Structure

```
📁 resume/
   ├── about.ts          → Hero section with photo + intro
   ├── experience.git    → Git-log styled work history
   ├── projects/
   │   ├── compozerr.md  → Deep dive case study (modal)
   │   ├── starti.md     → starti.app showcase (modal)
   │   └── other.md      → Games/other work (modal)
   ├── skills.json       → Extensions-panel style skills
   ├── live.sh           → Live projects with health checks
   └── contact.cs        → Contact info (enhanced existing)
```

---

## Section Designs

### 1. Navigation & Layout

**Keep:**
- Window controls (red/yellow/green dots)
- Tab-based navigation
- Dark theme (#1c2024 background)
- Burger menu for mobile

**Add:**
- Status bar at bottom: `🟢 Available for work │ Ln 1, Col 1 │ UTF-8 │ TypeScript React`
- Smooth scroll between sections (single-page with defined areas)
- Max-width content area (900px centered)

**Mobile adaptations:**
- Burger menu with folder tree navigation
- Full-width content
- Stacked layouts instead of side-by-side

---

### 2. Hero Section (`about.ts`)

**Layout:** Split view - photo left, code right (stacked on mobile)

**Photo:** `/Users/milo/Downloads/1603655601331 (1).jpeg`
- Moody black & white portrait
- Rounded corners, subtle glow border
- Fits dark theme perfectly

**Content:**
```typescript
// about.ts
interface Developer {
  name: string;
  title: string;
  location: string;
  focus: string[];
  available: boolean;
}

const milo: Developer = {
  name: "Milo Jørgensen",
  title: "Full-Stack Developer & Founder",
  location: "Aarhus, Denmark",
  focus: [
    "Cloud Infrastructure",
    "Mobile Development",
    "Developer Tooling"
  ],
  available: true, // Open to opportunities
};

export default milo;
```

**Interactive elements:**
- Typewriter effect on load
- Green pulse on `available: true`
- Hover tooltips on `focus` items → related projects
- CTA buttons: `[View Projects]` `[Download CV]` `[Contact]`

---

### 3. Experience Timeline (`experience.git`)

**Visual:** Git log with branch visualization

```
git log --oneline --graph

* 2021-present  feat(mappso): Founder & Programmer
|
| * 2023-2026   feat(starti): Chief Technology Officer
| |
* | 2022-2026   feat(holion): Software Developer
|/
* 2020-2022     feat(funday): Student Project Assistant
|
* 2018-2022     feat(limboo): Game Developer
```

**Interaction:**
- Click commit → expand to full details (role, achievements, tech stack)
- Branch lines show overlapping roles (Holion + starti.app)
- Color coding: 🟣 Founder, 🔵 Employee, 🟢 Side projects

**Content per role:**

**Holion ApS (2022-2026) - Software Developer**
- Cross-platform mobile development (.NET MAUI, Xamarin, Flutter)
- .NET/C# backend services and APIs
- Firebase and Azure DevOps integration
- Full product lifecycle from concept to App Store

**starti.app (2023-2026) - Chief Technology Officer**
- Led development of website-to-app conversion platform
- Built multi-tenant infrastructure serving many brands
- CI/CD pipelines and automated build systems
- Deep linking and CDN asset delivery
- Platform achieved 7,100+ monthly downloads, NPS 90

**Funday Factory (2020-2022) - Student Project Assistant**
- Game development and playtesting
- C# and Unity development

**Limboo App Games (2018-2022) - Game Developer**
- Independent game development
- Published mobile games

**Mobile:** Simplified vertical timeline without branch visualization

---

### 4. Skills Panel (`skills.json`)

**Visual:** VSCode Extensions sidebar style

**Categories & Skills:**

```
▼ LANGUAGES
  ◉ TypeScript        ████████░
  ◉ C# / .NET         ████████░
  ◉ JavaScript        ████████░
  ◉ Dart              ██████░░░

▼ FRONTEND
  ◉ React             ████████░
  ◉ Tailwind CSS      ███████░░
  ◉ SCSS              ███████░░

▼ BACKEND
  ◉ .NET Core / 9     ████████░
  ◉ Node.js           ███████░░
  ◉ PostgreSQL        ██████░░░
  ◉ Firebase          ███████░░

▼ DEVOPS & INFRA
  ◉ Docker            ███████░░
  ◉ CI/CD Pipelines   ████████░
  ◉ Proxmox / VMs     ██████░░░
  ◉ Traefik           ██████░░░
  ◉ Google Cloud      ██████░░░
  ◉ Azure DevOps      ███████░░

▼ MOBILE
  ◉ .NET MAUI         ███████░░
  ◉ Xamarin           ███████░░
  ◉ Flutter           ██████░░░
```

**Interaction:**
- Hover → tooltip: "Used in: Compozerr, starti.app"
- Click → highlights related projects
- Collapsible categories
- Search/filter bar at top

**Mobile:** 2-column card grid with category headers

---

### 5. Live Projects (`live.sh`)

**Domain health checking:**
- Ping each domain on component mount
- Cache results in sessionStorage (5 min TTL)
- Only show online projects
- Skeleton loaders while checking

**Technical implementation:**
```typescript
const checkDomain = async (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = `${url}/favicon.ico?_=${Date.now()}`;
    setTimeout(() => resolve(false), 5000);
  });
};
```

**Projects:**

| URL | Name | Description |
|-----|------|-------------|
| https://compozerr.com | Compozerr | Full-stack hosting platform |
| https://brickstack.dk | Brickstack | Real estate document management with AI compliance |
| https://pdftoepub-3a3bd.web.app | PDF to EPUB | Document converter tool |
| https://limboo.mappso.com | Limboo Games | Game development portfolio |
| https://minrain.mappso.com | Minrain | Weather app for motorcyclists |

**Visual:** Grid of cards with green status dots, click to visit

**Mobile:** 2-column grid, smaller cards

---

### 6. Project Modals

**Behavior:**
- Click project tab/card → opens modal overlay
- 60% width on desktop, full-screen on mobile
- Smooth slide-in animation
- Click outside or X to close

#### Compozerr Deep Dive

**Tabs:** Overview | Architecture | Tech Stack | Screenshots

**Overview content:**
```markdown
# Compozerr
> Full-stack hosting platform with modular templates

**What I built:**
A complete deployment platform from scratch - CLI tooling,
web dashboard, and VM infrastructure.

• One command to deploy any project
• Automatic SSL via Traefik + Let's Encrypt
• Modular templates (auth, payments, database)
• Real-time terminal access to VMs
• OAuth authentication with GitHub
```

**Architecture diagram:**
```
┌─────┐    ┌─────────┐    ┌──────────┐
│ CLI │───▶│ Web API │───▶│ Hosting  │
│     │    │         │    │ Manager  │
└─────┘    └─────────┘    └────┬─────┘
 Bun/TS    .NET 9 +            │
 Ink       React 19            ▼
                          ┌─────────┐
                          │ Proxmox │
                          │   VMs   │
                          └────┬────┘
                               │
                          ┌────▼────┐
                          │ Traefik │
                          │ Routing │
                          └─────────┘
```

**Tech stack badges:**
- CLI: Bun, TypeScript, Commander.js, Ink (React TUI), Zod, SignalR
- Web: .NET 9, ASP.NET Core, React 19, TanStack Router/Query, Tailwind, PostgreSQL
- Hosting: Node.js, Proxmox API, Traefik, Docker, Let's Encrypt

**Screenshot:** Compozerr frontpage (provided)

#### starti.app Showcase

**Content:**
```markdown
# starti.app
> CTO - Website to native app platform

Led development of SaaS platform converting websites into
native iOS/Android apps with advanced features.

**Platform capabilities:**
• Push notifications (including AI-powered)
• Biometric authentication
• NFC/QR scanning, geofencing
• Multi-brand infrastructure

**Results:**
• 7,100+ monthly app downloads
• 4,100+ daily active users
• Net Promoter Score: 90
```

**Tech:** .NET MAUI, Firebase, Google Cloud, CI/CD pipelines

---

### 7. Contact Section (Enhanced `contact.cs`)

**Keep:** Existing code-style display with copy buttons

**Add:**
```csharp
namespace Contact;

public static class Info
{
    public const string Email = "milo@mappso.com";
    public const string CVR = "42471736";

    // Social
    // github.com/[username]
    // linkedin.com/in/[username]
}
```

- Social links as comments (clickable)
- More prominent copy buttons
- Animated cursor blink

---

### 8. Status Bar (Footer)

```
┌────────────────────────────────────────────────────────────┐
│ 🟢 Available │ Ln 1, Col 1 │ UTF-8 │ TypeScript React      │
└────────────────────────────────────────────────────────────┘
```

- Sticky bottom
- "Available" links to contact section
- Completes VSCode illusion

---

## Assets Required

| Asset | Source | Status |
|-------|--------|--------|
| Profile photo | `/Users/milo/Downloads/1603655601331 (1).jpeg` | ✅ Provided |
| Compozerr screenshot | CleanShot screenshot | ✅ Provided |
| starti.app screenshot | Need to capture | ⏳ Optional |
| Project logos | Create or source | ⏳ Optional |

---

## Technical Implementation

**Stack (existing):**
- React 18 + TypeScript
- Vite
- SCSS + Tailwind CSS
- React Router

**New dependencies to consider:**
- `framer-motion` - Smooth animations for modals and transitions
- None else needed - current stack is sufficient

**Key components to create:**
1. `HeroSection` - About with photo
2. `GitTimeline` - Experience as git log
3. `SkillsPanel` - Extensions-style skills
4. `LiveProjects` - Health-checked project grid
5. `ProjectModal` - Reusable modal for project details
6. `StatusBar` - Footer status bar

**Responsive breakpoints:**
- Mobile: < 600px (existing)
- Desktop: >= 600px (existing)

---

## Success Criteria

- [ ] Maintains VSCode aesthetic throughout
- [ ] Fully responsive (mobile + desktop)
- [ ] All sections implemented with interactions
- [ ] Live project health checking works
- [ ] Smooth animations and transitions
- [ ] Fast load times (code split modals)
- [ ] Accessible (keyboard navigation, screen readers)

---

## Out of Scope

- Dark/light theme toggle (staying dark only)
- Blog/articles section
- Backend/database
- Analytics integration
- i18n/translations
