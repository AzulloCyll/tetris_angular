import { Component, ViewChild, OnInit } from '@angular/core';

import { TetrisCoreComponent } from 'ngx-tetris';
import { HostListener } from '@angular/core'; //for keayboard controls
import { Location } from '@angular/common';
import { StorageService } from '../storage.service';
import { HiscoresService } from 'src/app/hiscores.service';
import { ActivatedRoute } from '@angular/router';

import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faUndo,
  faSyncAlt,
  faPlay,
  faPause,
  faSignOutAlt,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

export interface LogData {
  timePlayed: number;
  timeStamp: number;
  score: number;
  action: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(
    private _location: Location,
    private _storage: StorageService,
    private _scores: HiscoresService,
    private _route: ActivatedRoute
  ) {
    this.playerName = this._storage.readPlayerName;
    this.secretToken = this._storage.readSecretToken;
    this.score = this._storage.readScore;

    this._route.params.subscribe((params) => {
      this.color = params['color']; //można zmienić w ustawieniach, żeby było params.color
      console.log(params['color']);
    });
  }

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faUndo = faUndo;
  faSyncAlt = faSyncAlt;
  faPlay = faPlay;
  faPause = faPause;
  faSignOutAlt = faSignOutAlt;
  faStar = faStar;

  @ViewChild(TetrisCoreComponent) private _tetris!: TetrisCoreComponent;

  public playerName: string;
  public secretToken: string;
  public score: number;
  public color!: string;
  public playerLogged: boolean = true;

  goBack() {
    this._location.back();
  }

  public isModal2Hidden: boolean = true;
  public isModalHidden: boolean = true;

  // te zmienne są inputami w modal
  public optionsInFilter: Array<string> = [];
  public status: string = 'Ready';
  public timePlayed: number = 0;
  public timeStamp: number = 0;

  public historyData: Array<LogData> = [];

  // timer initial data
  private timeoutId: number = 0;
  private timerOn: boolean = false;

  // shows and hides history page
  public handleModalVisibility($event: boolean) {
    this.isModalHidden = $event;
  }

  //shows and hides hi scores
  public handleModal2Visibility($event: boolean) {
    this.isModal2Hidden = $event;
  }

  public sendHiscore = () => {
    console.log('Score added!');

    if (this.score !== 0) {
      this._scores
        .send(this.secretToken, this.playerName, this.score)
        .subscribe((res) => console.log(res));
    } else {
      console.log('Score too low and not added!');
    }
  };

  public countScoreAndTimePlayed() {
    let allScores = this.historyData.map((item) => item.score);
    let allPlayTimes = this.historyData.map((item) => item.timePlayed);
    this.score = Math.max(...allScores);
    this.timePlayed = Math.max(...allPlayTimes);
  }

  // game controls
  public onButtonPressed($event: MouseEvent) {
    switch (($event.target as HTMLButtonElement).value) {
      case 'start':
        this._tetris.actionStart();
        this.status = 'Playing';
        this.timerStart();
        this.logData('Started game');
        ($event.target as HTMLButtonElement).blur();
        break;
      case 'stop':
        this._tetris.actionStop();
        this.status = 'Paused';
        this.timerPause();
        this.logData('Paused game');
        ($event.target as HTMLButtonElement).blur();
        break;
      case 'reset':
        this._tetris.actionReset();
        this._tetris.actionStop();
        this.status = 'Ready';
        this.timerReset();
        this._storage.setScore(0);
        this.score = this._storage.readScore;
        this.logData('Restarted game');
        ($event.target as HTMLButtonElement).blur();
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

  //game events
  public onLineCleared() {
    this.score++;
    this._storage.setScore(this.score);
    this.logData('Cleared line');
  }
  public onGameOver() {
    this.timerPause();
    this.status = 'Game over';
    this.logData('Ends game');

    this.generateOptionsInFilter();
    this.countScoreAndTimePlayed();
    this.handleModalVisibility(false);

    this.sendHiscore();
  }

  //utility functions
  private logData(action: string) {
    this.createTimestamp();
    this.historyData.push({
      action: action,
      score: this.score,
      timePlayed: this.timePlayed,
      timeStamp: this.timeStamp,
    });
  }

  private createTimestamp() {
    this.timeStamp = Date.now();
  }

  private generateOptionsInFilter() {
    let allOptions = this.historyData.map((item) => item.action);
    this.optionsInFilter = [...new Set(allOptions)];
    this.optionsInFilter.unshift('All'); //default option
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

  //Timer methods
  private timerStart() {
    if (!this.timerOn) {
      this.timerOn = true;
      this.timeoutId = window.setInterval(() => {
        this.timePlayed++;
      }, 1000);
    }
  }
  private timerPause() {
    this.timerOn = false;
    clearInterval(this.timeoutId);
  }
  private timerReset() {
    this.timerPause();
    this.timePlayed = 0;
  }

  ngOnInit(): void {
    if (!this.playerName && !this.secretToken) {
      this.playerName = 'Not logged';
      this.playerLogged = false;
    }
  }
}
