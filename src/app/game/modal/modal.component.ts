import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LogData } from '../game.component';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  @Input() historyData: Array<LogData> = [];
  @Input() optionsInFilter: Array<string> = [];
  @Input() score: number = 0;
  @Input() timePlayed: number = 0;
  @Input() sortByTimestampUP: boolean = true;
  @Input() optionSelected: string = 'All';

  @Output() handleModalVisibility: EventEmitter<boolean> = new EventEmitter();

  public filterByActionHandler($event: Event) {
    this.optionSelected = ($event.target as HTMLOptionElement).value;
  }

  public sortByTimestampHandler() {
    this.sortByTimestampUP = !this.sortByTimestampUP;
  }

  public backToGame() {
    this.handleModalVisibility.emit(true);
  }
}
