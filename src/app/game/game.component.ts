import { Component, OnInit, ViewChild } from '@angular/core';
import { TetrisCoreComponent } from 'ngx-tetris';

interface LogData {
  name: String;
  timePlayed: Number;
  timeStamp: Number;
  action: String;
}

interface Player {
  name: String;
  email: String;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor() {}

  log: Array<LogData> = [];
  player: Player = {
    name: 'Daniel',
    email: 'Chmur',
  };

  @ViewChild(TetrisCoreComponent)
  private _tetris!: TetrisCoreComponent;

  public onRotateButtonPressed() {
    this._tetris.actionRotate();
    console.log('rotate');
  }

  public onLineCleared() {
    console.log('line cleared');
  }

  ngOnInit(): void {}
}
