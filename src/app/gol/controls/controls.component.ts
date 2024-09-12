import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {

  protected run: boolean = false;

  @Output() runEmitter = new EventEmitter<boolean>();
  @Output() clearEmitter = new EventEmitter<boolean>();
  @Output() randomEmitter = new EventEmitter<boolean>();

  protected OnRunButtonClick(){
    this.run = !this.run;
    this.runEmitter.emit(this.run);
  }

  OnClearButtonClick() {
    this.clearEmitter.emit(true);
  }

  OnRandomiseButtonClick() {
    this.randomEmitter.emit(true);
  }
}
