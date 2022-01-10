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
  @Output() handleModalVisibility: EventEmitter<boolean> = new EventEmitter();

  public backToGame() {
    this.handleModalVisibility.emit(true);
  }

  ngOnInit(): void {}
}
