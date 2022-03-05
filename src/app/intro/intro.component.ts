import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  public isLogged: boolean = false;

  public verify(form: FormGroup) {
    const playerName = form.value.name;
    const playerEmail = form.value.email;

    this.isLogged = true;
  }
}
