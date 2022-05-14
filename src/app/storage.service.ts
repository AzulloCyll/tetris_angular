import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _playerName: string = '';
  private _secretToken: string = '';
  private _score: number = 0;
  private _nightModeOn!: boolean;

  public get readPlayerName() {
    return this._playerName;
  }

  public get readSecretToken() {
    return this._secretToken;
  }

  public get readScore() {
    return this._score;
  }

  public get readNightModeOnStatus() {
    return this._nightModeOn;
  }

  public setPlayerName(name: string): void {
    this._playerName = name;
  }

  public setSecretToken(token: string): void {
    this._secretToken = token;
  }

  public setScore(score: number): void {
    this._score = score;
  }

  public setNightModeOnStatus(mode: boolean): void {
    this._nightModeOn = mode;
  }
}
