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
  @Output() chanegeLoginStatus: EventEmitter<any> = new EventEmitter();

  public loginButtonEnable: boolean = false;
  public loggedPlayer: Player = { name: '', email: '' };

  public verifyLogin() {
    //weryfikacja
    if (this.loggedPlayer.name && this.loggedPlayer.email) {
      this.loginButtonEnable = true;
    } else {
      this.loginButtonEnable = false;
    }
  }

  public signIn() {
    console.log(this.loggedPlayer);

    //zerowanie wartości
    this.loggedPlayer.name = '';
    this.loggedPlayer.email = '';

    // jesli logowanie sie powiedzie to trzeba zmienic w glownej aplikacji zmienna isLogged na true

    this.loginButtonEnable = false;
    this.chanegeLoginStatus.emit();
  }

  ngOnInit(): void {}
}
