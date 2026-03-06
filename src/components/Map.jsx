import React from 'react';
import { nodes, edges, roomRects } from '../utils/graph';

// Render the Map using SVG
const Map = ({ selectedRoom, currentPos, pathNodes, simulationPos }) => {
    return (
        <svg
            viewBox="0 0 800 600"
            className="w-full h-full bg-[#1e2329]"
            style={{ userSelect: 'none' }}
        >
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                </filter>
            </defs>

            {/* Main Background Grid */}
            <rect width="800" height="600" fill="url(#grid)" />

            {/* Building Base (Walls & Corridors outline) */}
            <path
                d="M 20 20 L 740 20 L 740 560 L 20 560 Z"
                fill="#2a3038"
                stroke="#4a5568"
                strokeWidth="4"
                rx="16"
                filter="url(#shadow)"
            />

            {/* Central Void (Open Space) */}
            <rect
                x="180"
                y="130"
                width="440"
                height="340"
                fill="#0f172a"
                stroke="#1e3a8a"
                strokeWidth="2"
                rx="8"
            />

            {/* Blue Grid for Open Space */}
            <pattern id="blueGrid" width="40" height="40" patternUnits="userSpaceOnUse" x="180" y="130">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
            </pattern>
            <rect x="180" y="130" width="440" height="340" fill="url(#blueGrid)" rx="8" />

            <text x="400" y="300" textAnchor="middle" fill="#60a5fa" fontSize="24" fontWeight="600" opacity="0.6">
                Open Space
            </text>

            {/* Corridor Floor Base */}
            <path
                d="M 160 110 L 640 110 L 640 490 L 160 490 Z"
                fill="#374151"
            />
            <rect x="180" y="130" width="440" height="340" fill="#0f172a" />

            {/* Connect Corridors to exterior doors slightly */}
            {/* Top corridors */}
            <rect x="290" y="110" width="20" height="20" fill="#374151" />
            <rect x="490" y="110" width="20" height="20" fill="#374151" />
            {/* Bottom corridors */}
            <rect x="290" y="470" width="20" height="20" fill="#374151" />
            <rect x="490" y="470" width="20" height="20" fill="#374151" />

            {/* Rooms */}
            {roomRects.map((room) => {
                const isSelected = selectedRoom === room.id;
                return (
                    <g key={room.id} style={{ cursor: 'pointer' }}>
                        <rect
                            x={room.x} y={room.y}
                            width={room.width} height={room.height}
                            fill={isSelected ? '#fee2e2' : '#f3f4f6'}
                            stroke={isSelected ? '#ef4444' : '#9ca3af'}
                            strokeWidth={isSelected ? '3' : '2'}
                            rx="4"
                            filter="url(#shadow)"
                        />
                        {/* Box definition as rooms outline */}
                        <path
                            d={`M ${room.x} ${room.y + room.height} L ${room.x + room.width} ${room.y + room.height}`}
                            stroke={isSelected ? '#ef4444' : "#4b5563"}
                            strokeWidth="4"
                        />
                        <text
                            x={room.x + room.width / 2}
                            y={room.y + room.height / 2 + 5}
                            textAnchor="middle"
                            fill={isSelected ? '#b91c1c' : '#1f2937'}
                            fontSize="14"
                            fontWeight="600"
                        >
                            {room.label}
                        </text>
                    </g>
                );
            })}

            {/* Path */}
            {pathNodes.length > 1 && (
                <path
                    d={`M ${nodes[pathNodes[0]].x} ${nodes[pathNodes[0]].y} ${pathNodes.slice(1).map(n => `L ${nodes[n].x} ${nodes[n].y}`).join(' ')}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeDasharray="10 10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animation: 'dash 1s linear infinite' }}
                />
            )}

            {/* Blue Dot (Current Position) */}
            {simulationPos && (
                <g transform={`translate(${simulationPos.x}, ${simulationPos.y})`}>
                    <circle cx="0" cy="0" r="14" fill="#3b82f6" opacity="0.3">
                        <animate attributeName="r" values="14;24;14" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="0" cy="0" r="8" fill="#3b82f6" stroke="white" strokeWidth="2" />
                </g>
            )}

            {/* Red Pin (Destination) */}
            {selectedRoom && pathNodes.length > 0 && (
                <g transform={`translate(${nodes[pathNodes[pathNodes.length - 1]].x}, ${nodes[pathNodes[pathNodes.length - 1]].y})`}>
                    <path d="M 0 0 Q -10 -15 -10 -25 A 10 10 0 1 1 10 -25 Q 10 -15 0 0 Z" fill="#ef4444" stroke="white" strokeWidth="1.5" />
                    <circle cx="0" cy="-25" r="4" fill="white" />
                </g>
            )}
        </svg>
    );
};

export default Map;
