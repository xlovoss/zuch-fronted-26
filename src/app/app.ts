import { Component, signal, OnInit } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { StateService } from './state.service';
import { Map } from './features/map/map';
import { GameComponent } from './game/game';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent, Map],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Hannaa is also running');

  constructor(public state: StateService) {}

  ngOnInit() {
    this.state.initLogin('event_8');

    console.log('Verbindung wird aufgebaut...');
  }
}
