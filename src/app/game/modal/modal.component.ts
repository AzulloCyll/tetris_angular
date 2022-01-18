import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LogData } from '../game.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor() {}

  @Input() historyData: Array<LogData> = [];
  @Input() optionsInFilter: Array<string> = [];

  @Output() handleModalVisibility: EventEmitter<boolean> = new EventEmitter();

  public sortByTimestampUP: boolean = true;

  public optionSelected: string = 'All';

  public filterByActionHandler($event: Event) {
    this.optionSelected = ($event.target as HTMLOptionElement).value;
  }

  public sortByTimestampHandler() {
    this.sortByTimestampUP = !this.sortByTimestampUP;
  }

  public backToGame() {
    this.handleModalVisibility.emit(true);
  }

  ngOnInit(): void {}
}
