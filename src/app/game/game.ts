import { Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { Application, Assets, Sprite } from 'pixi.js';
import { StateService } from '../state.service';


@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.html',
  styleUrls: ['./game.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;
  private app!: Application; 
  private mapGrid: any[] [] = [];
  private trainSprite!: Sprite;

 private tileSize = 20;

  constructor(private stateService: StateService, private ngZone: NgZone) {}

  async ngOnInit() {
    this.app = new Application();
    await this.app.init({ 
        backgroundAlpha: 0,  //Gmini meint das macht man so 
        resizeTo: window 
    });
    this.pixiContainer.nativeElement.appendChild(this.app.canvas);
      //Bild kommt hinzu
      const texture = await Assets.load('assets/shrek.png');
      this.trainSprite = new Sprite(texture);
      this.trainSprite.anchor.set(0.5);

      this.app.stage.addChild(this.trainSprite);
      //Hier werden die Map tilles geholt
       this.stateService.tileSubject.subscribe((tiles)=> {
        console.log('Map erhalten:', tiles);
        this.mapGrid = tiles;
       })

       

       //Zug Logik
      this.stateService.goTrain$.subscribe(async (data) => {

        //bewegt sich der zug?
        console.log("Komponente: Zug bewegt sich!", data);

        // hier wird gheschaut ob die Map überhaupt existiert
      if(!this.mapGrid || this.mapGrid.length === 0) {
        console.log("keine Map loaded");
        return;
      }
  
      // 1. Tiles bekommen auf den der zug fährt    
      //TODO: schauen ob hier ein ein interface mit aufbau der Json eingefügt werdenn muss, sonst einfach mal json ausgeben und schauen was für werete wo sind
      var train = data.wagonList[0];
      
      const row = train.x;
      const col = train.y;

      // haben nur positionen nicht tile, brauchen aber tile

      if (this.mapGrid[col] && this.mapGrid[col][row]) {
        const dasAktuelleTile = this.mapGrid[col][row];
        
        console.log("Ich stehe auf Tile:", dasAktuelleTile);
        // Jetzt kannst du z.B. prüfen: dasAktuelleTile.Tracks ...
    } else {
        console.error(`Tile bei ${row}/${col} existiert nicht!`);
        return; // Abbruch, wenn Koordinaten außerhalb der Map sind
    }
      //Assets.load('assets/shrek.png').then((texture) => {
      //       const sprite = new Sprite(texture);
      //       sprite.width = this.tileSize
      //       sprite.height = this.tileSize
      //       this.tileSize.addChild(sprite);
      //   })
      // const targetPixelx = (row * this.tileSize) + (this.tileSize / 2);
      // const targetPixely = (col * this.tileSize) + (this.tileSize / 2)


      

      


    });

    this.stateService.initLogin('event_8');
  }

  ngOnDestroy() {
    if (this.app) {
      this.app.destroy(true, { children: true, texture: true });
    }
  }
}