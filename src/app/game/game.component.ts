import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

import { TetrisCoreComponent } from 'ngx-tetris';
import { HostListener } from '@angular/core';

interface LogData {
  name: String;
  timePlayed: number;
  timeStamp: number;
  action: String;
  score: number;
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
  @Output() onPageBack: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() loginStatsuHandler: EventEmitter<Boolean> = new EventEmitter();

  //logged Player
  // FAKE DATA
  public player: Player = {
    name: 'Daniel',
    email: 'Chmur',
  };

  //data to log
  public logDataObject: LogData = {
    action: 'Ready',
    name: this.player.name,
    score: 0,
    timePlayed: 0,
    timeStamp: 0,
  };

  // FAKE DATA
  historyData: Array<LogData> = [
    {
      name: 'Janusz',
      score: 15,
      timePlayed: 145,
      timeStamp: 82643,
      action: 'Playing',
    },
    {
      name: 'Grażyna',
      score: 17,
      timePlayed: 135,
      timeStamp: 8255,
      action: 'Game over',
    },
  ];

  // used by timer
  timeoutId: number = 0;
  timerOn: boolean = false;

  private timerStart() {
    if (!this.timerOn) {
      this.timerOn = true;
      this.timeoutId = window.setInterval(() => {
        this.logDataObject.timePlayed++;
      }, 1000);
    }
  }

  private timerPause() {
    this.timerOn = false;
    clearInterval(this.timeoutId);
  }

  private timerReset() {
    this.timerPause();
    this.logDataObject.timePlayed = 0;
  }

  public onButtonPressed($event: MouseEvent) {
    switch (($event.target as HTMLButtonElement).value) {
      case 'start':
        this._tetris.actionStart();
        this.logDataObject.action = 'Playing';
        this.timerStart();
        this.logData();
        break;

      case 'stop':
        this._tetris.actionStop();
        this.logDataObject.action = 'Paused';
        this.timerPause();
        this.logData();
        break;

      case 'reset':
        this._tetris.actionReset();
        this._tetris.actionStop();
        this.logDataObject.action = 'Ready';
        this.timerReset();
        this.logData();
        break;

      case 'left':
        this._tetris.actionLeft();
        break;

      case 'right':
        this._tetris.actionRight();
        break;

      case 'down':
        this._tetris.actionDown();
        break;

      case 'rotate':
        this._tetris.actionRotate();
        break;
    }
  }

  createTimestamp() {
    this.logDataObject.timeStamp = Date.now();
  }

  logData() {
    let pushedObject: LogData = {
      action: this.logDataObject.action,
      name: this.logDataObject.name,
      score: this.logDataObject.score,
      timePlayed: this.logDataObject.timePlayed,
      timeStamp: this.logDataObject.timeStamp,
    };

    this.createTimestamp();
    this.historyData.push(pushedObject);
    console.log(this.logDataObject);
    console.log(this.historyData);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent($event: KeyboardEvent) {
    switch ($event.code) {
      case 'KeyS':
      case 'ArrowDown':
        this._tetris.actionDown();
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this._tetris.actionLeft();
        break;
      case 'KeyD':
      case 'ArrowRight':
        this._tetris.actionRight();
        break;
      case 'Space':
        this._tetris.actionRotate();
        break;
    }
  }

  public onLineCleared() {
    this.logDataObject.score += 1;
    this.logData();
  }

  public onGameOver() {
    this.timerPause();
    this.logDataObject.action = 'Game over';
    this.logData();
  }

  public onBackClick($event: MouseEvent) {
    this.onPageBack.emit($event);
    this.loginStatsuHandler.emit(false);
  }

  @ViewChild(TetrisCoreComponent)
  private _tetris!: TetrisCoreComponent;

  ngOnInit(): void {
    this.createTimestamp();
  }
}
