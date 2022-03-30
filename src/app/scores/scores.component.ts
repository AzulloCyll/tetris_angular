import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HiscoresService } from 'src/app/hiscores.service';

import { hiScoresData } from 'src/app/game/modal2/modal2.component';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent implements OnInit {
  constructor(
    private _scores: HiscoresService,
    private _storage: StorageService
  ) {
    this.player = this._storage.readPlayerName;
    this.score = this._storage.readScore;
    this.token = this._storage.readSecretToken;
  }

  public player: string;
  public score: number;
  public token: string;

  public data: Array<hiScoresData> = [];
  public dataToShow: Array<hiScoresData> = [];
  public sortDirectionDown: boolean = false;

  public showPlayerScoresOnly = () => {
    this.dataToShow = this.data.filter((item) => this.player === item.name);
  };

  public changeSortingDirection = (direction: string) => {
    if (direction == 'up') this.sortDirectionDown = true;
    if (direction == 'down') this.sortDirectionDown = false;
  };

  ngOnInit(): void {
    const load = () => {
      this._scores.load().subscribe((result) => {
        this.data = result;
        this.showPlayerScoresOnly();
      });
    };

    if (this.score !== 0) {
      this._scores.send(this.token, this.player, this.score.toString());
      load();
      setInterval(load, 30000);
    } else {
      load();
      setInterval(load, 30000);
    }
  }
}
