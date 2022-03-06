import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _playerName: string = 'testowy';

  public get readPlayerName() {
    return this._playerName;
  }

  public setPlayerName(name: 'string'): void {
    this._playerName = name;
  }
}
