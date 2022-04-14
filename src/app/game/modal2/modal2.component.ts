import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { HiscoresService } from 'src/app/hiscores.service';
import { StorageService } from 'src/app/storage.service';

import { timer, switchMap, filter, Subscription } from 'rxjs';

export interface hiScoresData {
  name: string;
  score: number;
}

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss'],
})
export class Modal2Component implements OnInit, OnDestroy {
  private _sub$: Subscription;

  constructor(
    private _scores: HiscoresService,
    private _storage: StorageService
  ) {
    this.player = this._storage.readPlayerName;
    this.score = this._storage.readScore;
    this.token = this._storage.readSecretToken;

    this._sub$ = this._timer$
      .pipe(
        filter(() => this.paused),
        switchMap(() => this._hiScoresStream$)
      )
      .subscribe((result) => {
        this.dataToShow = result;
        console.log('Refreshed');
      });
  }

  //strumien danych z hiscore
  private _hiScoresStream$ = this._scores.load();
  private _timer$ = timer(0, 3000);

  public paused: boolean = true;

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  @Output() handleModal2Visibility: EventEmitter<boolean> = new EventEmitter();

  public player: string;
  public score: number;
  public token: string;

  public dataToShow: Array<hiScoresData> = [];
  public sortDirectionDown: boolean = false;

  public sortByPlayerName: boolean = false;

  pauseCheckboxhandler(): void {
    this.paused = !this.paused;
  }

  public showPlayerScoresOnlyHandler = () => {
    this.sortByPlayerName = !this.sortByPlayerName;
    console.log(this.sortByPlayerName);
  };

  public changeSortingDirection = () => {
    this.sortDirectionDown = !this.sortDirectionDown;
  };

  public back() {
    this.handleModal2Visibility.emit(true);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._sub$.unsubscribe();
  }
}
