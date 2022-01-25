import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
	@Output() loginStatusHandler: EventEmitter<boolean> = new EventEmitter();
	@Output() sendLoggedPlayer: EventEmitter<string> = new EventEmitter();

	public isLogged: boolean = false;

	public verify(form: FormGroup) {
		const playerName = form.value.name;
		const playerEmail = form.value.email;

		this.sendLoggedPlayer.emit(playerName);
		this.loginStatusHandler.emit(true);
		this.isLogged = true;
	}

	// onSubmit() {
	// 	this.isLogged = true;
	// 	// this.playerName = this.contactForm.value.name;
	// 	// this.sendLoggedPlayer.emit(this.playerName);
	// 	this.loginStatusHandler.emit(true);
	// }
}
