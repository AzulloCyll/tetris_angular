import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface Player {
  name: string;
  email: string;
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  @Output() loginStatsuHandler: EventEmitter<boolean> = new EventEmitter(); //potrzebne do uruchomienia przycisku GO TO GAME w app
  @Output() sendLoggedPlayer: EventEmitter<Player> = new EventEmitter(); //przesylam dane gracza do app

  public disableInputs: boolean = false;
  public loginButtonEnable: boolean = false;
  public loggedPlayer: Player = { name: '', email: '' };

  public verifyLogin() {
    if (this.loggedPlayer.name && this.loggedPlayer.email) {
      this.loginButtonEnable = true;
    } else {
      this.loginButtonEnable = false;
    }
  }

  public signIn() {
    this.loginButtonEnable = false;
    this.disableInputs = true;
    this.loginStatsuHandler.emit(true);
    this.sendLoggedPlayer.emit(this.loggedPlayer);
  }

  ngOnInit(): void {}
}
