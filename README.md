# Campus Navigation Prototype

This project provides an interactive 2D indoor map interface designed specifically for navigating building interiors. This prototype showcases Building AB3, 2nd Floor.

Inspired by indoor navigation features of popular mapping applications, this prototype provides visual navigation tools to help users maneuver through complex campus buildings.

## Features

- **Interactive 2D Floor Plan:** A clean and modern vector map built using SVG.
- **Dynamic Routing Algorithm:** Uses a graph-based shortest-path algorithm to navigate from a starting point to a destination.
- **Interactive Map Controls:** Pan and zoom the map freely to explore different sections of the building layout.
- **Search Functionality:** Easily look up specific rooms by name or number (e.g., Room 205, Faculty Cabins).
- **Navigation Simulation:** Simulates user movement along the calculated correct path with a dynamic dot and a clear dotted line track.
- **Mobile First Design:** Sized and styled for smartphones, featuring an embedded bottom control panel.

## Technology Stack

This application is built with modern web technologies:

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Interactivity:** react-zoom-pan-pinch for fluid map containment and navigation.

## Getting Started

Follow these instructions to run the project on your local machine.

### Prerequisites

Ensure you have Node.js (version 18 or newer recommended) and npm installed.

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Skileated/campus_navigation.git
   cd campus_navigation
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open your browser and navigate to the local server URL provided in your terminal (typically http://localhost:5173/ or http://localhost:5174/).

## How to Use the Prototype

1. **Simulate Position:** Click the "Scan QR" button to emulate a user scanning a physical QR code at a specific location on the floor. This updates your starting position, which is represented by a pulsing blue dot.
2. **Select Destination:** Use the search bar dropdown at the top of the control panel to select a destination room.
3. **Start Route:** Click "Start Navigation" to compute and display the shortest walking path through the corridors. Watch as the blue dot moves along the path to the red destination pin.
4. **Explore the Map:** Click and drag to pan around, or scroll to zoom in and out of the map.

## Project Structure Highlights

- `src/components/Map.jsx` - The core logic for rendering the map vectors, rooms, and paths dynamically using SVG.
- `src/components/Controls.jsx` - The interactive bottom sheet UI elements, including the search dropdown and action buttons.
- `src/utils/graph.js` - Contains the coordinate definitions for the building architecture, the node definitions (edges), and the pathfinding algorithm.

## License

This project is licensed under the MIT License.
