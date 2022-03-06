import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  constructor(private _storage: StorageService) {}

  public isLogged: boolean = false;

  public verify(form: FormGroup) {
    const playerName = form.value.name;
    const playerEmail = form.value.email; // ????

    this._storage.setPlayerName(playerName);

    this.isLogged = true;
  }

  ngOnInit(): void {}
}
