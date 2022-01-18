import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { TetrisCoreComponent } from 'ngx-tetris';
import { HostListener } from '@angular/core';

export interface LogData {
  name?: String;
  timePlayed: number;
  timeStamp: number;
  status?: String;
  score: number;
  action: string;
}

export interface Player {
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

  @Input() player: Player = { name: '', email: '' };
  @ViewChild(TetrisCoreComponent) private _tetris!: TetrisCoreComponent;

  public isModalHidden: boolean = true;
  public optionsInFilter: Array<string> = [];

  //data to log
  public logDataObject: LogData = {
    action: '',
    name: this.player.name,
    score: 0,
    status: 'Ready',
    timePlayed: 0,
    timeStamp: 0,
  };

  // TEST DATA
  historyData: Array<LogData> = [
    // {
    //   action: 'Ends game',
    //   score: 5,
    //   timePlayed: 53,
    //   timeStamp: 1642511710746,
    // },
    // {
    //   action: 'Cleared line',
    //   score: 5,
    //   timePlayed: 39,
    //   timeStamp: 1642511703525,
    // },
    // {
    //   action: 'Cleared line',
    //   score: 4,
    //   timePlayed: 32,
    //   timeStamp: 1642511698774,
    // },
    // {
    //   action: 'Cleared line',
    //   score: 3,
    //   timePlayed: 27,
    //   timeStamp: 1642511696377,
    // },
    // {
    //   action: 'Cleared line',
    //   score: 2,
    //   timePlayed: 25,
    //   timeStamp: 1642511689222,
    // },
    // {
    //   action: 'Cleared line',
    //   score: 1,
    //   timePlayed: 17,
    //   timeStamp: 1642511675351,
    // },
    // {
    //   action: 'Started game',
    //   score: 0,
    //   timePlayed: 4,
    //   timeStamp: 1642511674151,
    // },
    // {
    //   action: 'Paused game',
    //   score: 0,
    //   timePlayed: 4,
    //   timeStamp: 1642511669753,
    // },
    // {
    //   action: 'Started game',
    //   score: 0,
    //   timePlayed: 0,
    //   timeStamp: 1642511668290,
    // },
  ];

  // TIMER
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

  // shows and hides history page
  public handleModalVisibility($event: boolean) {
    this.isModalHidden = $event;
  }

  // game controls
  public onButtonPressed($event: MouseEvent) {
    $event.preventDefault();
    switch (($event.target as HTMLButtonElement).value) {
      case 'start':
        this._tetris.actionStart();
        this.logDataObject.status = 'Playing';
        this.timerStart();
        this.logData('Started game');
        break;
      case 'stop':
        this._tetris.actionStop();
        this.logDataObject.status = 'Paused';
        this.timerPause();
        this.logData('Paused game');
        break;
      case 'reset':
        this._tetris.actionReset();
        this._tetris.actionStop();
        this.logDataObject.status = 'Ready';
        this.timerReset();
        this.logData('Restarted game');
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

  public onLineCleared() {
    this.logDataObject.score++;
    this.logData('Cleared line');
  }

  public onGameOver() {
    this.timerPause();
    this.logDataObject.status = 'Game over';
    this.logData('Ends game');
    this.handleModalVisibility(false);
    this.generateOptionsInFilter();
  }

  public onBackClick($event: MouseEvent) {
    this.onPageBack.emit($event);
    this.loginStatsuHandler.emit(false);
  }

  //utility functions
  private logData(action: string) {
    let pushedObject: LogData = {
      action: action,
      score: this.logDataObject.score,
      timePlayed: this.logDataObject.timePlayed,
      timeStamp: this.logDataObject.timeStamp,
    };
    this.createTimestamp();
    this.historyData.push(pushedObject);
  }

  private createTimestamp() {
    this.logDataObject.timeStamp = Date.now();
  }

  private generateOptionsInFilter() {
    let allOptions = this.historyData.map((item) => item.action);
    this.optionsInFilter = [...new Set(allOptions)];
    this.optionsInFilter.unshift('All'); //default option
  }

  // uzyte onInit, przepisuje dane z 'player' z rodzica i zapisuje w danych
  private handlePlayerName() {
    this.logDataObject.name = this.player.name;
  }

  //hidden feature - WSAD/Arrows/Space controls
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent($event: KeyboardEvent) {
    $event.preventDefault();
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

  ngOnInit(): void {
    this.createTimestamp();
    this.handlePlayerName();
  }
}
