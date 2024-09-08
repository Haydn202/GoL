import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

const Width = 3000;
const Height = 1000;
const Resolution = 10;

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements AfterViewInit {

  @ViewChild('grid', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private grid: Set<string>;

  constructor() {
    this.grid = new Set<string>();
  }

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = Width;
    this.canvas.nativeElement.height = Height;

    // @ts-ignore
    this.ctx = this.canvas.nativeElement.getContext('2d');

    const numOfRows = Height / Resolution;
    const numOfCols = Width / Resolution;

    const oneOrZero = () => (Math.random() > 0.5 ? 1 : 0);

    // Initialize the grid with random live cells
    for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
        if (oneOrZero()) {
          this.grid.add(`${rowIndex},${colIndex}`);
        }
      }
    }

    this.render();
    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.createNextGeneration(this.grid);
    this.render();
  }

  private render() {
    const canvas = this.ctx;
    const res = Resolution;

    // Clear the canvas
    canvas.clearRect(0, 0, Width, Height);

    // Render only live cells
    this.grid.forEach(cell => {
      const [rowIndex, colIndex] = cell.split(',').map(Number);
      canvas.beginPath();
      canvas.rect(colIndex * res, rowIndex * res, res, res);
      canvas.fillStyle = 'black';
      canvas.fill();
    });
  }

  private createNextGeneration(grid: Set<string>) {
    const nextGrid = new Set<string>();
    const cellsToCheck = new Set<string>();

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
        cellsToCheck.add(`${x + dx},${y + dy}`);
      });
    });

    // Check each cell in cellsToCheck
    cellsToCheck.forEach(cell => {
      const [x, y] = cell.split(',').map(Number);
      let liveNeighbors = 0;

      directions.forEach(([dx, dy]) => {
        if (grid.has(`${x + dx},${y + dy}`)) {
          liveNeighbors++;
        }
      });

      if (liveNeighbors === 3 || (liveNeighbors === 2 && grid.has(cell))) {
        nextGrid.add(cell);
      }
    });

    this.grid = nextGrid;
  }
}
