import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { hiScoresData } from '../../src/app/game/modal2/modal2.component';

@Injectable({
  providedIn: 'root',
})
export class HiscoresService {
  constructor(private _http: HttpClient) {}

  load() {
    const URL = 'http://localhost:55000/tetris';
    return this._http.get<Array<hiScoresData>>(URL, {
      headers: {
        accept: 'application/json',
      },
    });
  }
}
