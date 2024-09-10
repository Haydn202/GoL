import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GridComponent} from "./gol/grid/grid.component";
import {GolComponent} from "./gol/gol.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridComponent, GolComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GoL';
}
