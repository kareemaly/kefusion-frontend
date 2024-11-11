# Project Structure

This document outlines the organization of our codebase, focusing on component architecture and file organization.

## Component Organization

Components are organized following this pattern:

### Naming Convention Breakdown

1. **Namespace**: 
   - Currently using `milestone1` as the primary namespace
   - Future milestones will have their own namespaces (milestone2, milestone3, etc.)
   - Special `demo` namespace for demonstration components

2. **Usecase**: 
   - Uses kebab-case for clarity
   - Can be as descriptive as needed
   - Examples:
     - `competitive-analysis-deliverable`
     - `user-journey-mapping`
     - `stakeholder-interviews`

3. **Component Name**:
   - Uses PascalCase
   - Should be descriptive of the component's purpose
   - Example: `AnalysisChart.tsx`, `InterviewSummary.tsx`

### Example Structure

```
components/
└── generated/
    ├── milestone1/
    │   ├── competitive-analysis-deliverable/
    │   │   ├── ComparisonMatrix.tsx
    │   │   └── InsightsDashboard.tsx
    │   └── user-journey-mapping/
    │       ├── JourneyTimeline.tsx
    │       └── TouchpointCard.tsx
    └── demo/
        ├── charts/
        │   ├── SimpleBarChart.tsx
        │   └── BasicLineGraph.tsx
        └── ui-elements/
            ├── CustomButton.tsx
            └── DataCard.tsx
```

## Best Practices

1. **Component Isolation**
   - Each component should be self-contained
   - Shared utilities should be lifted to appropriate utility folders

2. **Naming Clarity**
   - Use clear, descriptive names that indicate component purpose
   - Avoid abbreviations unless widely understood

3. **File Organization**
   - Keep related components together under the same usecase
   - Consider creating index files for easier imports
   - Demo components should be organized by type (charts, ui-elements, etc.)

4. Additional namespaces may be added as the project evolves
5. Component documentation should be maintained alongside the component files

### Demo Components Guidelines

1. **Purpose**
   - Demo components showcase specific features or capabilities
   - Used for testing, documentation, and example purposes

2. **Organization**
   - Grouped by component type or functionality
   - Should include basic examples that can be easily understood
   - May include documentation comments explaining usage

3. **Naming**
   - Should be prefixed with component type (e.g., charts/, ui-elements/)
   - Use descriptive names that indicate the component's purpose
