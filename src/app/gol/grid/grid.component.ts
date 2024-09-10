import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {createNextGeneration} from "../../../util/GoL/Grid";

const Width = 1000;
const Height = 1000;
const Resolution = 5;

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
    this.grid = createNextGeneration(this.grid, Height, Width, Resolution)
    this.render();
  }

  private render() {
    const canvas = this.ctx;
    const res = Resolution;

    canvas.clearRect(0, 0, Width, Height);

    this.grid.forEach(cell => {
      const [rowIndex, colIndex] = cell.split(',').map(Number);
      canvas.beginPath();
      canvas.rect(colIndex * res, rowIndex * res, res, res);
      canvas.fillStyle = 'black';
      canvas.fill();
    });
  }
}
