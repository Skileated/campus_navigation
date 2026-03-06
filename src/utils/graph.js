// graph.js
// Maps physical UI coordinates to routing nodes

export const nodes = {
  // Corners
  'TL_CORNER': { x: 180, y: 130 },
  'TR_CORNER': { x: 620, y: 130 },
  'BR_CORNER': { x: 620, y: 470 },
  'BL_CORNER': { x: 180, y: 470 },

  // Top Corridor (y=130)
  'DOOR_201': { x: 300, y: 130 },
  'DOOR_202': { x: 500, y: 130 },

  // Right Corridor (x=620)
  'DOOR_203': { x: 620, y: 160 },
  'DOOR_204': { x: 620, y: 200 },
  'DOOR_205': { x: 620, y: 240 },
  'DOOR_206': { x: 620, y: 280 },
  'DOOR_207': { x: 620, y: 320 },
  'DOOR_208': { x: 620, y: 380 },
  'DOOR_209': { x: 620, y: 420 },

  // Bottom Corridor (y=470)
  'DOOR_210': { x: 500, y: 470 },
  'DOOR_FAC_B': { x: 300, y: 470 },

  // Left Corridor (x=180)
  'DOOR_FAC_L': { x: 180, y: 200 },
  'DOOR_AUDI': { x: 180, y: 350 },
};

// Edges - connections between nodes with distances
export const edges = {
  'TL_CORNER': ['DOOR_201', 'DOOR_FAC_L'],
  'DOOR_201': ['TL_CORNER', 'DOOR_202'],
  'DOOR_202': ['DOOR_201', 'TR_CORNER'],

  'TR_CORNER': ['DOOR_202', 'DOOR_203'],
  'DOOR_203': ['TR_CORNER', 'DOOR_204'],
  'DOOR_204': ['DOOR_203', 'DOOR_205'],
  'DOOR_205': ['DOOR_204', 'DOOR_206'],
  'DOOR_206': ['DOOR_205', 'DOOR_207'],
  'DOOR_207': ['DOOR_206', 'DOOR_208'],
  'DOOR_208': ['DOOR_207', 'DOOR_209'],
  'DOOR_209': ['DOOR_208', 'BR_CORNER'],

  'BR_CORNER': ['DOOR_209', 'DOOR_210'],
  'DOOR_210': ['BR_CORNER', 'DOOR_FAC_B'],
  'DOOR_FAC_B': ['DOOR_210', 'BL_CORNER'],

  'BL_CORNER': ['DOOR_FAC_B', 'DOOR_AUDI'],
  'DOOR_AUDI': ['BL_CORNER', 'DOOR_FAC_L'],
  'DOOR_FAC_L': ['DOOR_AUDI', 'TL_CORNER'],
};

const getDistance = (nodeId1, nodeId2) => {
  const n1 = nodes[nodeId1];
  const n2 = nodes[nodeId2];
  return Math.sqrt(Math.pow(n2.x - n1.x, 2) + Math.pow(n2.y - n1.y, 2));
};

export const findShortestPath = (startId, endId) => {
  if (!startId || !endId || !nodes[startId] || !nodes[endId]) return [];
  if (startId === endId) return [startId];

  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(nodes));

  Object.keys(nodes).forEach(node => {
    distances[node] = Infinity;
  });
  distances[startId] = 0;

  while (unvisited.size > 0) {
    let current = null;
    let minDistance = Infinity;

    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        current = node;
      }
    }

    if (current === null || current === endId) break;

    unvisited.delete(current);

    for (const neighbor of edges[current]) {
      if (unvisited.has(neighbor)) {
        const alt = distances[current] + getDistance(current, neighbor);
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = current;
        }
      }
    }
  }

  const path = [];
  let curr = endId;
  while (curr !== undefined) {
    path.unshift(curr);
    curr = previous[curr];
  }

  // If path length is 1 and it's not start==end, no path found.
  if (path.length === 1 && path[0] !== startId) return [];

  return path;
};

// Helper to map visually to rooms
export const labelToNodeMap = {
  '201': 'DOOR_201',
  '202': 'DOOR_202',
  '203': 'DOOR_203',
  '204': 'DOOR_204',
  '205': 'DOOR_205',
  '206': 'DOOR_206',
  '207': 'DOOR_207',
  '208': 'DOOR_208',
  '209': 'DOOR_209',
  '210': 'DOOR_210',
  'faculty-cabins-b': 'DOOR_FAC_B',
  'faculty-cabins-l': 'DOOR_FAC_L',
  'kamaraj-auditorium': 'DOOR_AUDI',
};

// Physical rect definitions for the rooms to draw them on the SVG. 
// Uses SVG rect params: x, y, width, height, text label, class for color styling
export const roomRects = [
  // Top
  { id: '201', label: '201', x: 220, y: 40, width: 140, height: 70 },
  { id: '202', label: '202', x: 400, y: 40, width: 140, height: 70 },

  // Right
  { id: '203', label: '203', x: 640, y: 140, width: 80, height: 40 },
  { id: '204', label: '204', x: 640, y: 180, width: 80, height: 40 },
  { id: '205', label: '205', x: 640, y: 220, width: 80, height: 40 },
  { id: '206', label: '206', x: 640, y: 260, width: 80, height: 40 },
  { id: '207', label: '207', x: 640, y: 300, width: 80, height: 40 },
  { id: '208', label: '208', x: 640, y: 360, width: 80, height: 40 },
  { id: '209', label: '209', x: 640, y: 400, width: 80, height: 40 },

  // Bottom
  { id: '210', label: '210', x: 420, y: 490, width: 140, height: 50 },
  { id: 'faculty-cabins-b', label: 'Faculty Cabins', x: 200, y: 490, width: 180, height: 70 },

  // Left
  { id: 'faculty-cabins-l', label: 'Faculty Cabins', x: 40, y: 160, width: 120, height: 60 },
  { id: 'kamaraj-auditorium', label: 'Kamaraj Auditorium', x: 40, y: 240, width: 120, height: 180 },
];

export const searchOptions = roomRects.map(r => ({ id: r.id, label: r.label }));
