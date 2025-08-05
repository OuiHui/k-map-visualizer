# Boolean Logic Simplifier

A modern, interactive Karnaugh Map visualization tool built with Vue.js in Georgia Tech's navy and gold theme.

## Tech Stack

- **Vue.js 3** 
- **Vite** 
- **Modern CSS** 
- **Responsive Design** 

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


### Boolean Logic
- Supports 2, 3, and 4-variable functions
- Finds all maximal groupings (K-map groupings)
- Generates simplified Boolean expressions
- Real-time truth table updates


### Component Structure
- **App.vue**: Main container and state management
- **KMapGrid.vue**: Handles K-map layout and cell rendering
- **KMapCell.vue**: Individual cell interactions
- **TruthTable.vue**: Truth table generation and display

### Composables
- **useKMapLogic**: K-map algorithms and expression generation



