import { Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { Application } from 'pixi.js';
import { StateService } from '../state.service'; // Pfad anpassen falls nötig

@Component({
  selector: 'app-game', 
  standalone: true, 
  templateUrl: './game.html', 
  styleUrls: ['./game.css']   
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;
  private app!: Application;

  constructor(
    private stateService: StateService, 
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    this.stateService.initLogin('event_8');

    // 2. Pixi initialisieren
    this.ngZone.runOutsideAngular(async () => {
      this.app = new Application();
      
      await this.app.init({ 
        width: 800, 
        height: 600, 
        backgroundColor: 0x1099bb 
      });
      this.pixiContainer.nativeElement.appendChild(this.app.canvas);
      
      console.log("Pixi gestartet");
    });
  }

  ngOnDestroy() {
    if (this.app) {
      this.app.destroy(true, { children: true, texture: true });
    }
  }
}