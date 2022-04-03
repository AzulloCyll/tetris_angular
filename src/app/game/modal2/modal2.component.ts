import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { HiscoresService } from 'src/app/hiscores.service';
import { StorageService } from 'src/app/storage.service';

export interface hiScoresData {
  name: string;
  score: number;
}

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss'],
})
export class Modal2Component implements OnInit {
  constructor(
    private _scores: HiscoresService,
    private _storage: StorageService
  ) {
    this.player = this._storage.readPlayerName;
    this.score = this._storage.readScore;
    this.token = this._storage.readSecretToken;
  }

  @Output() handleModalVisibility: EventEmitter<boolean> = new EventEmitter();

  public player: string;
  public score: number;
  public token: string;

  public data: Array<hiScoresData> = [];
  public dataToShow: Array<hiScoresData> = [];
  public sortDirectionDown: boolean = false;

  @Output() handleModal2Visibility: EventEmitter<boolean> = new EventEmitter();

  public showPlayerScoresOnly = () => {
    this.dataToShow = this.data.filter((item) => this.player === item.name);
  };

  public changeSortingDirection = (direction: string) => {
    if (direction == 'up') this.sortDirectionDown = true;
    if (direction == 'down') this.sortDirectionDown = false;
  };

  public back() {
    this.handleModal2Visibility.emit(true);
  }

  ngOnInit(): void {
    const load = () => {
      this._scores.load().subscribe((result) => {
        this.data = result;
        this.dataToShow = result;
        console.log('refreshed');

        // this.showPlayerScoresOnly();
      });
    };

    load();
    setInterval(load, 2000);

    // przeniesc do game
    // this._scores.send(this.token, this.player, this.score.toString());
  }
}
