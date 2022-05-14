import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StorageService } from '../storage.service';
import { HiscoresService } from 'src/app/hiscores.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { faThList } from '@fortawesome/free-solid-svg-icons';

interface auth {
  success: boolean;
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  constructor(
    private _storage: StorageService,
    private _scores: HiscoresService
  ) {}

  public isLogged: boolean = false;
  public auth: any = { success: false };
  public nightModeOn: boolean = this._storage.readNightModeOnStatus;
  public selectedColorPallette: string = 'normal';

  public selectedColorPaletteHandler() {
    this.nightModeOn
      ? (this.selectedColorPallette = 'contrast')
      : (this.selectedColorPallette = 'normal');

    this.nightModeOn
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme');

    this.nightModeOn
      ? this._storage.setNightModeOnStatus(true)
      : this._storage.setNightModeOnStatus(false);
  }

  public verify(form: FormGroup) {
    const playerName = form.value.name;
    const token = form.value.secret;

    this._storage.setPlayerName(playerName);
    this._storage.setSecretToken(token);

    // zapytac o lepsze otypowanie tego (Observable?, Partial?)
    this._scores.check(token).subscribe((result: Partial<auth>) => {
      this.auth = result;
      this.isLogged = this.auth.success;
    });
  }

  ngOnInit(): void {
    this._storage.setPlayerName('');
    this._storage.setSecretToken('');
    this._storage.setScore(0);
  }
}
