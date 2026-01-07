import { Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { Application } from 'pixi.js';
import { StateService } from '../state.service';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.html',
  styleUrls: ['./game.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;
  private app!: Application; // Ausrufezeichen sagt TS: "Ich kümmere mich drum"

  constructor(private stateService: StateService, private ngZone: NgZone) {}

  async ngOnInit() {
   
    this.stateService.goTrain$.subscribe((data) => {
      console.log("Komponente: Zug bewegt sich!", data);
      //go
      
    });
    this.ngZone.runOutsideAngular(async () => {
      
      this.app = new Application();
      await this.app.init({ 
        background: '#bb10b0dd', 
        resizeTo: window,
        width: 800,
        height: 600
      });


      this.pixiContainer.nativeElement.appendChild(this.app.canvas);

     
      this.app.stage.addChild(this.stateService.mapContainer);
    });

   
    this.stateService.initLogin('event_8');
  }

  ngOnDestroy() {
    if (this.app) {
      this.app.destroy(true, { children: true, texture: true });
    }
  }
}