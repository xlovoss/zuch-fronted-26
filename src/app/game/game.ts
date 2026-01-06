import { Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { Application } from 'pixi.js';
import { StateService } from '../state.service'; 

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
  }

  ngOnDestroy() {
    if (this.app) {
      this.app.destroy(true, { children: true, texture: true });
    }
  }
}

drawTiles() {
  
}