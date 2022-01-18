import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LogData } from '../game.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor() {}

  public sortByTimestampUP: boolean = true;

  public optionsInFilter: Array<string> = [];
  public optionSelected: string = 'All';

  private generateOptionsInFilter() {
    let allOptions = this.historyData.map((item) => item.action);
    this.optionsInFilter = [...new Set(allOptions)];
    this.optionsInFilter.unshift('All'); //default option
  }

  public filterByActionHandler($event: any) {
    console.log($event.target.value);
  }

  public sortByTimestampHandler() {
    this.sortByTimestampUP = !this.sortByTimestampUP;
  }

  @Input() historyData: Array<LogData> = [];
  @Output() handleModalVisibility: EventEmitter<boolean> = new EventEmitter();

  public backToGame() {
    this.handleModalVisibility.emit(true);
  }

  ngOnInit(): void {
    this.generateOptionsInFilter();
  }
}
