import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface Player {
  name: string;
  email: string;
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  @Output() loginStatsuHandler: EventEmitter<boolean> = new EventEmitter(); //potrzebne do uruchomienia przycisku GO TO GAME w app
  @Output() sendLoggedPlayer: EventEmitter<string> = new EventEmitter(); //przesylam dane gracza do app

  public disableInputs: boolean = false;
  public playerName: string = '';

  onSubmit() {
    this.disableInputs = true;
    this.loginStatsuHandler.emit(true);
    this.playerName = this.contactForm.value.name;
    this.sendLoggedPlayer.emit(this.playerName);
  }

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
}
