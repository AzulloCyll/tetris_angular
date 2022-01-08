import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { TetrisCoreComponent } from 'ngx-tetris';

interface LogData {
  name: String;
  timePlayed: Number;
  timeStamp: Number;
  action: String;
}

interface Player {
  name: String;
  email: String;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Output() onPageBack: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() loginStatsuHandler: EventEmitter<Boolean> = new EventEmitter();

  log: Array<LogData> = [];
  player: Player = {
    name: 'Daniel',
    email: 'Chmur',
  };

  @ViewChild(TetrisCoreComponent)
  private _tetris!: TetrisCoreComponent;

  public onRotateButtonPressed() {
    this._tetris.actionRotate();
    console.log('rotate');
  }

  public onLineCleared() {
    console.log('line cleared');
  }

  public onBackClick($event: MouseEvent) {
    this.onPageBack.emit($event);
    this.loginStatsuHandler.emit(false);
  }

  ngOnInit(): void {}
}
