import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _playerName!: string;

  public get playerName() {
    return this._playerName;
  }

  public setPlayerName(name: 'string'): void {
    this._playerName = name;
  }
}
