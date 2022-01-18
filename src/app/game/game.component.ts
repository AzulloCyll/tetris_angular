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

  public isModalHidden: boolean = false;

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
    {
      action: 'Started game',
      score: 0,
      timePlayed: 0,
      timeStamp: 1642500674305,
    },
    {
      action: 'Started game',
      score: 0,
      timePlayed: 1,
      timeStamp: 1642500681522,
    },
    {
      action: 'Started game',
      score: 0,
      timePlayed: 6,
      timeStamp: 1642500682750,
    },
    {
      action: 'Started game',
      score: 0,
      timePlayed: 10,
      timeStamp: 1642500688014,
    },
    {
      action: 'Started game',
      score: 0,
      timePlayed: 12,
      timeStamp: 1642500691598,
    },
    {
      action: 'Started game',
      score: 0,
      timePlayed: 12,
      timeStamp: 1642500693678,
    },
    {
      action: 'Started game',
      score: 0,
      timePlayed: 16,
      timeStamp: 1642500694054,
    },
    {
      action: 'Started game',
      score: 0,
      timePlayed: 16,
      timeStamp: 1642500697542,
    },
    {
      action: 'Started game',
      score: 0,
      timePlayed: 18,
      timeStamp: 1642500697862,
    },
    {
      action: 'Started game',
      score: 0,
      timePlayed: 18,
      timeStamp: 1642500700142,
    },
    {
      action: 'Cleared line',
      score: 1,
      timePlayed: 20,
      timeStamp: 1642500700342,
    },
    {
      action: 'Cleared line',
      score: 2,
      timePlayed: 22,
      timeStamp: 1642500701852,
    },
    {
      action: 'Started game',
      score: 2,
      timePlayed: 27,
      timeStamp: 1642500703646,
    },
    {
      action: 'Cleared line',
      score: 3,
      timePlayed: 28,
      timeStamp: 1642500708880,
    },
    {
      action: 'Started game',
      score: 3,
      timePlayed: 36,
      timeStamp: 1642500710381,
    },
    {
      action: 'Paused game',
      score: 3,
      timePlayed: 39,
      timeStamp: 1642500718104,
    },
    {
      action: 'Started game',
      score: 3,
      timePlayed: 39,
      timeStamp: 1642500721360,
    },
    {
      action: 'Ends game',
      score: 3,
      timePlayed: 43,
      timeStamp: 1642500722106,
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

  //util
  createTimestamp() {
    this.logDataObject.timeStamp = Date.now();
  }

  logData(action: string) {
    let pushedObject: LogData = {
      action: action,
      score: this.logDataObject.score,
      timePlayed: this.logDataObject.timePlayed,
      timeStamp: this.logDataObject.timeStamp,
    };

    this.createTimestamp();
    this.historyData.push(pushedObject);
  }

  //hidden feature - WSAD/Arrows/Space controls
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
    this.logData('Cleared line');
  }

  public onGameOver() {
    this.timerPause();
    this.logDataObject.status = 'Game over';
    this.logData('Ends game');
    this.handleModalVisibility(false);
    console.log(this.historyData);
  }

  public onBackClick($event: MouseEvent) {
    this.onPageBack.emit($event);
    this.loginStatsuHandler.emit(false);
  }

  @ViewChild(TetrisCoreComponent)
  private _tetris!: TetrisCoreComponent;

  // uzyte onInit, przepisuje dane z 'player' z rodzica i zapisuje w danych
  handlePlayerName() {
    this.logDataObject.name = this.player.name;
  }

  handleModalVisibility($event: boolean) {
    this.isModalHidden = $event;
  }

  ngOnInit(): void {
    this.createTimestamp();
    this.handlePlayerName();
  }
}
