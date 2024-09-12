import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {createNextGeneration} from "../../../util/GoL/Grid";

const Width = 1000;
const Height = 1000;
const Resolution = 4;

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
  @Input() run!: boolean;
  @Input() clear!: boolean;
  @Input() randomise!: boolean;

  @Output() clearEmitter = new EventEmitter<boolean>();
  @Output() randomEmitter = new EventEmitter<boolean>();

  constructor() {
    this.grid = new Set<string>();
  }

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = Width;
    this.canvas.nativeElement.height = Height;

    // @ts-ignore
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.generateRandomBoard();
    this.render();
    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    if(this.run) {
      this.grid = createNextGeneration(this.grid, Height, Width, Resolution)
      this.render();
    }

    if (this.clear) {
      this.clearBoard();
      this.clearEmitter.emit(false);
      this.render();
    }

    if (this.randomise) {
      this.clearBoard();
      this.generateRandomBoard();
      this.randomEmitter.emit(false);
      this.render();
    }
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

  private clearBoard(){
    this.grid = new Set<string>();
  }

  private generateRandomBoard() {
    const numOfRows = Height / Resolution;
    const numOfCols = Width / Resolution;

    const oneOrZero = () => (Math.random() > 0.5 ? 1 : 0);

    for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
        if (oneOrZero()) {
          this.grid.add(`${rowIndex},${colIndex}`);
        }
      }
    }
  }
}
