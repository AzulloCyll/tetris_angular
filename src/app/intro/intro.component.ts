import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  @Output() loginStatusHandler: EventEmitter<boolean> = new EventEmitter();
  @Output() sendLoggedPlayer: EventEmitter<string> = new EventEmitter();

  public playerName: string = '';
  public isLogged: boolean = false;

  onSubmit() {
    this.isLogged = true;
    // this.playerName = this.contactForm.value.name;
    this.sendLoggedPlayer.emit(this.playerName);
    this.loginStatusHandler.emit(true);
  }

}
