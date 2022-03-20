import { Component, OnInit } from '@angular/core';
import { HiscoresService } from 'src/app/hiscores.service';

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss'],
})
export class Modal2Component implements OnInit {
  constructor(private _scores: HiscoresService) {
    this._scores.load().subscribe((result) => {
      console.log(result);
    });
  }
  public data = [];

  ngOnInit(): void {}
}
