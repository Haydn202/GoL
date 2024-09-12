import { Component } from '@angular/core';
import {GridComponent} from "./grid/grid.component";
import {ControlsComponent} from "./controls/controls.component";

@Component({
  selector: 'app-gol',
  standalone: true,
  imports: [
    GridComponent,
    ControlsComponent
  ],
  templateUrl: './gol.component.html',
  styleUrl: './gol.component.css'
})
export class GolComponent {
  protected shouldRun: boolean = false;
  protected shouldClear: boolean = false;
  protected shouldRandomise: boolean = false;

  protected run(event: boolean){
    this.shouldRun = event;
  }

  clear(event: boolean) {
    this.shouldClear = event;
  }

  randomise(event: boolean) {
    this.shouldRandomise = event;
  }
}
