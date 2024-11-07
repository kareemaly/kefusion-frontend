# Design Tokens

This document outlines all design tokens used in our application. These tokens are configured in `tailwind.config.ts` and are available through Tailwind CSS classes.

## Colors

Our color system is built using HSL values and supports both light and dark modes for optimal accessibility and user preference.

### Base Colors
- `background` - The main canvas color that serves as the foundation for the entire application. Light and airy in light mode, deep and comfortable in dark mode.
- `foreground` - The primary text color, providing optimal contrast against the background for readability.
- `border` - Subtle boundaries between elements, helping define space and hierarchy without being visually heavy.
- `input` - Defines form element boundaries, making interactive elements easily identifiable.
- `ring` - Focus indicator for interactive elements, crucial for accessibility and keyboard navigation.

### Component Colors

#### Card
- `card` - Container background color for elevated content sections. Slightly contrasts with the main background to create depth.
- `card-foreground` - Optimized text color for content within cards, ensuring readability.

#### Popover
- `popover` - Background color for floating elements like dropdowns and tooltips.
- `popover-foreground` - Text color for popover content, maintaining consistent readability.

#### Primary
- `primary` - The main brand color used for key actions and important elements. High contrast with its foreground color.
- `primary-foreground` - Text/icon color optimized for use on primary-colored backgrounds.

#### Secondary
- `secondary` - Used for less prominent actions and UI elements. Provides visual hierarchy below primary elements.
- `secondary-foreground` - Contrasting text color for secondary elements.

#### Muted
- `muted` - Subdued background color for de-emphasized content and disabled states.
- `muted-foreground` - Low-contrast text color for secondary information and disabled text.

#### Accent
- `accent` - Used for highlighting elements without the emphasis of primary colors. Adds visual interest.
- `accent-foreground` - Text color optimized for accent backgrounds.

#### Destructive
- `destructive` - Signals dangerous or destructive actions (delete, remove, etc.). Typically red-toned.
- `destructive-foreground` - High-contrast text color for destructive action buttons.

#### Success
- `success` - Indicates successful actions or positive status (complete, approved, etc.). Typically green-toned.
- `success-foreground` - High-contrast text color for success elements.
- `success-muted` - A softer version of success color for backgrounds and subtle indicators.

#### Danger
- `danger` - Signals dangerous or negative status (errors, warnings, etc.). Typically red-toned.
- `danger-foreground` - High-contrast text color for danger elements.
- `danger-muted` - A softer version of danger color for backgrounds and subtle indicators.

#### Chart Colors
A sequential color palette optimized for data visualization:
- `chart-1` - Primary chart color, used for main data series
- `chart-2` - Secondary chart color, contrasts well with chart-1
- `chart-3` - Tertiary chart color for additional data series
- `chart-4` - Quaternary chart color maintaining visual distinction
- `chart-5` - Final chart color completing the visualization palette

## Border Radius

Our radius system creates a consistent rounded appearance across the UI:
- `lg` - Large radius for major containers and prominent elements
- `md` - Medium radius for buttons and common interactive elements
- `sm` - Subtle radius for smaller elements and nested components

## Usage in Components

### Common Patterns

1. Content Areas:
```tsx
<div className="bg-background text-foreground">
{/ Main content /}
</div>
```

2. Buttons:
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
{/ Button content /}
</button>
```

3. Cards:
```tsx
<div className="bg-card text-card-foreground border rounded-lg">
{/ Card content /}
</div>
```

4. Destructive Messages:
```tsx
<div className="bg-destructive text-destructive-foreground">
{/ Error message /}
</div>
```

## Dark Mode

The theme automatically adapts between light and dark modes based on the `dark` class on the root element. Colors are carefully chosen to maintain:
- Proper contrast ratios for accessibility
- Reduced eye strain in dark environments
- Consistent visual hierarchy across modes
- Seamless transitions between modes

## Themes

### AI Dark Theme

The AI Dark theme provides a sophisticated, high-contrast dark mode optimized for AI and data-focused applications. It features:

- Deep, navy-tinted backgrounds (`230 20% 10%`)
- High-contrast, warm white text (`60 10% 90%`)
- Vibrant accent colors for interactive elements
- Carefully balanced hierarchical contrast

Key characteristics:
- Reduced eye strain for long reading sessions
- Clear visual hierarchy
- Distinctive AI/tech aesthetic
- High contrast for improved readability

To apply the AI Dark theme, add the `ai-dark` class to your root element:

## Design Principles

Our token system follows these key principles:
1. **Accessibility First**: All color combinations meet WCAG contrast requirements
2. **Semantic Usage**: Colors convey meaning and purpose
3. **Systematic Scaling**: Consistent relationships between variants
4. **Dark Mode Parity**: Equal usability in both light and dark modes