import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {

  private run: boolean = false;

  @Output() run = new EventEmitter<boolean>();

  protected OnRunButtonClick(){
    this.run = !this.run;
    this.run.emit(this.run);
  }
}
