/**
 * Icon Components
 *
 * All icons follow the Iconly icon set design system.
 * Each icon is a separate .astro component that accepts IconProps.
 *
 * Usage:
 * ```astro
 * import Link from '@components/icons/Link.astro';
 * <Link size={16} color="var(--ch-action-primary-bg)" />
 * ```
 *
 * Naming convention:
 * - Component file: PascalCase matching the icon name (e.g., Link.astro, ChevronDown.astro)
 * - Import as: Named import matching file name
 * - Props: Extends IconProps from './types'
 *
 * Available icons:
 * - Link: Chain link icon for anchor links
 * - Notification: Bell icon indicating alerts or unread items
 */

export type { IconProps } from './types';
export { defaultIconProps } from './types';
