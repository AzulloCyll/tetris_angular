import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _playerName: string = 'playerOne';
  private _secretToken: string = '0000';
  private _score: number = 0;

  public get readPlayerName() {
    return this._playerName;
  }

  public get readSecretToken() {
    return this._secretToken;
  }

  public get readScore() {
    return this._score;
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
}
