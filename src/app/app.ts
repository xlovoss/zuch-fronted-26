import { Component, signal, OnInit } from '@angular/core'; // OnInit importieren
import { RouterOutlet } from '@angular/router';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Hannaa is also running');

  constructor(public state: StateService) {
  }

  ngOnInit() {
    this.state.initLogin('event_8'); 

    console.log("Verbindung wird aufgebaut..."); 
  }
}