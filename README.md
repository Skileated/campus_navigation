# 🗺️ Campus Navigation Prototype

Welcome to the **Campus Navigation Prototype**! This project provides an interactive, mobile-first 2D indoor map interface designed specifically for navigating building interiors (in this case, Building AB3, 2nd Floor).

Inspired by indoor navigation features of Google Maps, this application provides users with visual navigation tools to easily maneuver through complex campus buildings.

## ✨ Features

- **Interactive 2D Floor Plan:** A clean and modern vector map built using SVG.
- **Dynamic Routing Algorithm:** Uses a graph-based A* (A-Star) inspired shortest-path algorithm to navigate from point A to point B.
- **Interactive Map Controls:** Pan and zoom the map freely to explore different sections of the building.
- **Search Functionality:** Easily look up specific rooms (e.g., Room 205, Faculty Cabins).
- **Navigation Simulation:** Simulates user movement along the calculated correct path with a dynamic pulsing dot and a clear dotted line track.
- **Mobile First Design:** Sized and styled for smartphones with an embedded bottom sheet control panel.

## 🛠️ Technology Stack

This application is built with modern web technologies:

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Interactivity:** `react-zoom-pan-pinch` for fluid map containment and navigation.

## 🚀 Getting Started

Follow these instructions to run the project on your local machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and `npm` installed.

### Installation & Setup

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

4. **View the App:**
   Open your browser and navigate to the local server URL provided in your terminal (typically `http://localhost:5173/` or `http://localhost:5174/`).

## 🎮 How to Use the Prototype

1. **Simulate Position:** Tap the **Scan QR** button to emulate a user scanning a physical QR code at a specific location on the floor. This updates your starting position (represented by the pulsing blue dot).
2. **Select Destination:** Use the search bar at the very top of the control panel to select a destination room (e.g., Room 205).
3. **Start Route:** Tap **Start Navigation** to compute and display the shortest walking path through the corridors. Watch as the blue dot moves along the path to the red destination pin!
4. **Explore the Map:** Click and drag to pan around, or scroll to zoom in and out.

## 📁 Project Structure Highlights

- `src/components/Map.jsx` - The core logic for rendering the map vectors, rooms, and paths dynamically via SVG.
- `src/components/Controls.jsx` - The interactive bottom sheet UI elements (Search and Action Buttons).
- `src/utils/graph.js` - Contains the coordinate metadata for the specific building (AB3, Floor 2), the node connections (edges), and the pathfinding algorithm.

## 📄 License

This project is licensed under the MIT License.
