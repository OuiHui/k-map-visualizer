# Boolean Logic Simplifier - Vue.js Version

A modern, interactive Karnaugh Map visualization tool built with Vue.js 3 and featuring Georgia Tech's navy and gold theme.


## Tech Stack

- **Vue.js 3** - Composition API with reactive state management
- **Vite** - Fast development and build tooling
- **Modern CSS** - CSS Grid, Flexbox, and CSS Variables
- **Responsive Design** - Mobile-first approach

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/          # Vue components
│   ├── KMapGrid.vue    # K-map grid layout
│   ├── KMapCell.vue    # Individual K-map cells
│   └── TruthTable.vue  # Truth table display
├── composables/         # Reusable logic
│   └── useKMapLogic.js # K-map algorithms
├── App.vue             # Main application
├── main.js             # Application entry point
└── style.css           # Global styles
```

## Features Explained

### K-Map Visualization
- Click any cell to toggle between 0 and 1
- Automatic detection of K-map groupings
- Visual feedback with Georgia Tech colors


### Boolean Logic
- Supports 2, 3, and 4-variable functions
- Finds all maximal groupings (K-map groupings)
- Generates simplified Boolean expressions
- Real-time truth table updates


### Composition API
Uses Vue 3's Composition API for:
- Reactive state management
- Reusable business logic
- Clean component organization

### Component Structure
- **App.vue**: Main container and state management
- **KMapGrid.vue**: Handles K-map layout and cell rendering
- **KMapCell.vue**: Individual cell interactions
- **TruthTable.vue**: Truth table generation and display

### Composables
- **useKMapLogic**: K-map algorithms and expression generation



