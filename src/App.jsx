import React, { useState, useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { MapPin } from 'lucide-react';
import Map from './components/Map';
import Controls from './components/Controls';
import { findShortestPath, labelToNodeMap, nodes } from './utils/graph';
import './index.css';

function App() {
  const [currentPos, setCurrentPos] = useState('DOOR_AUDI'); // Default QR scan location
  const [selectedRoom, setSelectedRoom] = useState('');
  const [pathNodes, setPathNodes] = useState([]);

  // Animation state
  const [isNavigating, setIsNavigating] = useState(false);
  const [simulationPos, setSimulationPos] = useState(null);

  // Keep initial position on mount
  useEffect(() => {
    setSimulationPos(nodes[currentPos]);
  }, [currentPos]);

  const handleStartNavigation = () => {
    if (!selectedRoom) return;

    const endNodeId = labelToNodeMap[selectedRoom];
    if (!endNodeId) {
      alert("Selected room doesn't have a mapped door node yet in the prototype.");
      return;
    }

    // Find shortest path
    const path = findShortestPath(currentPos, endNodeId);
    if (!path || path.length === 0) {
      alert("No path found!");
      return;
    }

    setPathNodes(path);
    setIsNavigating(true);

    // Simulate motion along the path
    let currentIdx = 0;
    const animateDurationMs = 500; // time per segment

    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx >= path.length) {
        clearInterval(interval);
        setIsNavigating(false);
        // Arrived! Update current position to the destination
        setCurrentPos(endNodeId);
        setPathNodes([]);
        return;
      }

      const targetNode = nodes[path[currentIdx]];
      setSimulationPos({ x: targetNode.x, y: targetNode.y });

    }, animateDurationMs);
  };

  const handleScanQR = () => {
    // Simulate scanning a QR code by randomly picking a node
    const possibleStarts = ['DOOR_AUDI', 'BL_CORNER', 'DOOR_202', 'DOOR_209'];
    const randomStart = possibleStarts[Math.floor(Math.random() * possibleStarts.length)];
    setCurrentPos(randomStart);
    setSimulationPos(nodes[randomStart]);
    setPathNodes([]);
    setSelectedRoom('');
    // Alert user
    alert(`QR Scanned! Starting position updated to: ${randomStart}`);
  };

  return (
    <div className="relative w-full h-screen bg-[#111827] overflow-hidden flex flex-col font-sans">
      {/* Top Header */}
      <div className="absolute top-0 w-full z-10 bg-gradient-to-b from-[#111827] to-transparent pt-safe pt-8 pb-12 px-6 pointer-events-none">
        <div className="flex items-center space-x-3 pointer-events-auto">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <MapPin className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">Campus Navigation</h1>
            <p className="text-blue-300 text-sm font-medium opacity-80">Building AB3 • 2nd Floor</p>
          </div>
        </div>
      </div>

      {/* Main Map Viewer */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <TransformWrapper
          initialScale={0.8}
          minScale={0.5}
          maxScale={3}
          centerOnInit
          wheel={{ step: 0.1 }}
        >
          <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
            <div className="w-[800px] h-[600px] sm:w-[1000px] sm:h-[800px] md:w-[1200px] md:h-[900px] aspect-[4/3] flex items-center justify-center pt-8">
              <Map
                selectedRoom={selectedRoom}
                currentPos={currentPos}
                pathNodes={pathNodes}
                simulationPos={simulationPos}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* Bottom Controls */}
      <Controls
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        onStartNavigation={handleStartNavigation}
        onScanQR={handleScanQR}
        isNavigating={isNavigating}
      />
    </div>
  );
}

export default App;
