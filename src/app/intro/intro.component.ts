import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StorageService } from '../storage.service';
import { HiscoresService } from 'src/app/hiscores.service';

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

  public verify(form: FormGroup) {
    const playerName = form.value.name;
    const token = form.value.secret;

    this._storage.setPlayerName(playerName);

    // zapytac o lepsze otypowanie tego (Observable?, Partial?)
    this._scores.check(token).subscribe((result: Partial<auth>) => {
      this.auth = result;
      this.isLogged = this.auth.success;
    });
  }

  ngOnInit(): void {}
}
