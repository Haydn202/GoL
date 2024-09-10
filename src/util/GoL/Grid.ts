export function createNextGeneration(grid: Set<string>, height: number, width: number, res: number): Set<string> {
  const nextGrid = new Set<string>();
  const cellsToCheck = new Set<string>();

  const numOfRows = height / res;
  const numOfCols = width / res;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  // Add all live cells and their neighbors to cellsToCheck
  grid.forEach(cell => {
    const [x, y] = cell.split(',').map(Number);
    cellsToCheck.add(`${x},${y}`);
    directions.forEach(([dx, dy]) => {
      const wrappedX = (x + dx + numOfRows) % numOfRows;
      const wrappedY = (y + dy + numOfCols) % numOfCols;
      cellsToCheck.add(`${wrappedX},${wrappedY}`);
    });
  });

  // Check each cell in cellsToCheck
  cellsToCheck.forEach(cell => {
    const [x, y] = cell.split(',').map(Number);
    let liveNeighbors = 0;

    directions.forEach(([dx, dy]) => {
      const wrappedX = (x + dx + numOfRows) % numOfRows;
      const wrappedY = (y + dy + numOfCols) % numOfCols;
      if (grid.has(`${wrappedX},${wrappedY}`)) {
        liveNeighbors++;
      }
    });

    if (liveNeighbors === 3 || (liveNeighbors === 2 && grid.has(cell))) {
      nextGrid.add(cell);
    }
  });

  return nextGrid;
}
