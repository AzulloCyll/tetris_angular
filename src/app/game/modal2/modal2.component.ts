import { Component, OnInit } from '@angular/core';
import { HiscoresService } from 'src/app/hiscores.service';

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
  constructor(private _scores: HiscoresService) {}

  public data: Array<hiScoresData> = [];
  public dataToShow: Array<hiScoresData> = [];
  public sortDirectionDown: boolean = false;

  public changeSortingDirection = (direction: string) => {
    if (direction == 'up') this.sortDirectionDown = true;
    if (direction == 'down') this.sortDirectionDown = false;
  };

  ngOnInit(): void {
    this._scores.load().subscribe((result) => {
      this.dataToShow = result;
    });
  }
}
