import { Component, OnInit, Input } from '@angular/core';
import { LogData } from '../game.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor() {}

  @Input() historyData: Array<LogData> = [];

  ngOnInit(): void {}
}
