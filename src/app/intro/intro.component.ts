import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { HiscoresService } from 'src/app/hiscores.service';
import { Router } from '@angular/router';

interface auth {
  success: boolean;
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  public introForm: FormGroup;

  constructor(
    private _storage: StorageService,
    private _scores: HiscoresService,
    private _router: Router,
    public fb: FormBuilder
  ) {
    this.introForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      token: ['', [Validators.required]],
      nightModeOn: [this._storage.readNightModeOnStatus],
    });

    //zmiana kontrolki -> zmiana koloru
    this.nightModeOnControl?.valueChanges.subscribe((item) => {
      this.nightModeOn = item;
      this.selectedColorPaletteHandler();
    });
  }

  public isLogged: boolean = false;
  public auth: any = { success: false };
  public nightModeOn: boolean = this._storage.readNightModeOnStatus;
  public selectedColorPallette: string = 'normal';

  public getPlayerNameFromLocalStorage = () => {
    this.introForm.patchValue({
      name: localStorage.getItem('player'),
    });
  };

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

  public onSubmit(form: FormGroup) {
    const playerName = form.value.name;
    const token = form.value.token;

    this._storage.setPlayerName(playerName);
    this._storage.setSecretToken(token);

    // zapytac o lepsze otypowanie tego (Observable?, Partial?)
    this._scores.check(token).subscribe((result: Partial<auth>) => {
      this.auth = result;

      this.isLogged = this.auth.success;

      if (this.isLogged) {
        localStorage.setItem('player', playerName);
        this._router.navigate(['/game', this.selectedColorPallette]);
      } else alert('Wrong TOKEN');
    });
  }

  public get name() {
    return this.introForm.get('name');
  }

  public get token() {
    return this.introForm.get('token');
  }

  public get nightModeOnControl() {
    return this.introForm.get('nightModeOn');
  }

  ngOnInit(): void {
    this._storage.setPlayerName('');
    this._storage.setSecretToken('');
    this._storage.setScore(0);
    this.getPlayerNameFromLocalStorage();
  }
}
