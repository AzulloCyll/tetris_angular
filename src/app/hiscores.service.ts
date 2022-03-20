import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HiscoresService {
  constructor(private _http: HttpClient) {}

  load() {
    const URL = 'http://localhost:49224/tetris';
    return this._http.get(URL, {
      headers: {
        accept: 'application/json',
      },
    });
  }
}
