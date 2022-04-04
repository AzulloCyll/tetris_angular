import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { HiscoresService } from 'src/app/hiscores.service';
import { StorageService } from 'src/app/storage.service';

import { timer, switchMap, filter } from 'rxjs';

export interface hiScoresData {
	name: string;
	score: number;
}

@Component({
	selector: 'app-modal2',
	templateUrl: './modal2.component.html',
	styleUrls: ['./modal2.component.scss']
})
export class Modal2Component implements OnInit {
	constructor(
		private _scores: HiscoresService,
		private _storage: StorageService
	) {
		this.player = this._storage.readPlayerName;
		this.score = this._storage.readScore;
		this.token = this._storage.readSecretToken;

		this._timer$
			.pipe(
				switchMap(() => this._hiScoresStream$),
				filter(() => this.paused)
			)
			.subscribe((result: any) => {
				this.data = result;
				this.dataToShow = result;
				console.log('Refreshed');
			});
	}

	//strumien danych z hiscore
	private _hiScoresStream$ = this._scores.load();
	//strumien zegara
	private _timer$ = timer(0, 3000);

	public paused: boolean = true;

	pauseCheckboxhandler(): void {
		this.paused = !this.paused;
	}

	faAngleUp = faAngleUp;
	faAngleDown = faAngleDown;

	@Output() handleModalVisibility: EventEmitter<boolean> = new EventEmitter();

	public player: string;
	public score: number;
	public token: string;

	public data: Array<hiScoresData> = [];
	public dataToShow: Array<hiScoresData> = [];
	public sortDirectionDown: boolean = false;

	@Output() handleModal2Visibility: EventEmitter<boolean> =
		new EventEmitter();

	public showPlayerScoresOnly = () => {
		this.dataToShow = this.data.filter((item) => this.player === item.name);
	};

	public changeSortingDirection = () => {
		this.sortDirectionDown = !this.sortDirectionDown;
	};

	public back() {
		this.handleModal2Visibility.emit(true);
	}

	ngOnInit(): void {}
}
