# Icon Components

This directory contains icon components following the **Iconly icon set** design system.

## Naming Convention

- **File name**: PascalCase matching the icon's semantic meaning (e.g., `Link.astro`, `ChevronDown.astro`, `Search.astro`)
- **Component**: Astro component that accepts `IconProps`
- **Import path**: `@components/icons/[IconName].astro`

## Adding a New Icon

1. Create a new `.astro` file with the icon name in PascalCase
2. Copy the template structure from an existing icon (e.g., `Link.astro`)
3. Replace the SVG paths with the new icon's paths
4. Set appropriate default size (usually 24px for Iconly icons)
5. Use `currentColor` for stroke/fill to respect theming
6. Update the "Available icons" list in `index.ts`

## Usage Example

```astro
---
import Link from '@components/icons/Link.astro';
---

<!-- Use default props (size=24, color=currentColor) -->
<Link />

<!-- Custom size and color -->
<Link size={16} color="var(--ch-action-primary-bg)" />

<!-- With custom class -->
<Link class="my-icon-class" />
```

## Icon Props

All icons accept the following props (defined in `types.ts`):

```typescript
interface IconProps {
  size?: number;          // Default: 24
  color?: string;         // Default: 'currentColor'
  class?: string;         // Optional CSS class
}
```

## Design Guidelines

- All icons use `stroke` (not `fill`) for consistency with Iconly
- Default stroke-width is `1.5`
- All paths use `stroke-linecap="round"` and `stroke-linejoin="round"`
- Icons are square (viewBox: "0 0 24 24")
- Use `aria-hidden="true"` since icons are decorative

## Available Icons

- **Link**: Chain link icon for anchor/permalink functionality
- **Notification**: Bell icon for alerts, inbox badges, or unread indicators
