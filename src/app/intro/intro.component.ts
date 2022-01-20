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
  @Output() loginStatusHandler: EventEmitter<boolean> = new EventEmitter();
  @Output() sendLoggedPlayer: EventEmitter<string> = new EventEmitter();

  public playerName: string = '';

  onSubmit() {
    this.playerName = this.contactForm.value.name;
    this.loginStatusHandler.emit(true);
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
