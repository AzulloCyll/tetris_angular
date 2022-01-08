import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

import { TetrisCoreComponent } from 'ngx-tetris';

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
  public player: Player = {
    name: 'Daniel',
    email: 'Chmur',
  };

  //data to log
  public logDataObject: LogData = {
    name: this.player.name,
    score: 0,
    timePlayed: 0,
    timeStamp: 0,
    action: 'Ready',
  };

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
        break;

      case 'stop':
        this._tetris.actionStop();
        this.logDataObject.action = 'Paused';
        this.timerPause();
        break;

      case 'reset':
        this._tetris.actionReset();
        this._tetris.actionStop();
        this.logDataObject.action = 'Ready';
        this.timerReset();
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
        console.log(this.logDataObject);
        break;
    }
  }

  public onLineCleared() {
    this.logDataObject.score += 1;
  }

  public onGameOver() {
    this.timerPause();
    this.logDataObject.action = 'Game over';
  }

  public onBackClick($event: MouseEvent) {
    this.onPageBack.emit($event);
    this.loginStatsuHandler.emit(false);
  }

  @ViewChild(TetrisCoreComponent)
  private _tetris!: TetrisCoreComponent;

  ngOnInit(): void {}
}
