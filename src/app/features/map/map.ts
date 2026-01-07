import { Component, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StateService } from '../../state.service';

import * as p from 'pixi.js';
import { min } from 'rxjs';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit {
  @ViewChild('pixiCanvas') pixiCanvas!: ElementRef<HTMLCanvasElement>;
  stateService = inject(StateService);

  app = new p.Application();

  async ngAfterViewInit() {
    // PixiJS-Anwendung erstellen
    await this.app.init({
      canvas: this.pixiCanvas.nativeElement,
      backgroundColor: 0x1099bb,
    });
    this.stateService.tileSubject.subscribe((tiles) => {
      this.drawRails(tiles);
    });
  }
  drawRails(tiles: Tile[][]) {
    const rectangle = new p.Graphics();
    rectangle.rect(200, 475, 200, 150);
    rectangle.fill(0xfff000);
    this.app.stage.addChild(rectangle);
    const size = 24;
    tiles.forEach((col, x) => {
      col.forEach((tile, y) => {
        this.drawSingleTile(tile, x * size, y * size, size);
        //also wie mache ich das? jedes tile kriegt x x x pixel auf denen dann der sprite gerendert wird
        // ich fuehle mich faul also fertige ich denke einfach fuer jede kombination was vor
        const rectangle = new p.Graphics();
        rectangle.fill(0xfff000);
        this.app.stage.addChild(rectangle);
      });
    });
  }

  drawSingleTile(tile: Tile, xOffset: number, yOffset: number, size: number) {
    // also hier hab ich jetzt meine 24x24
    const mini = size / 3;
    console.log(mini);
    const rectangle = new p.Graphics();
    if (tile.Tracks[0]) {
      rectangle.rect(xOffset, yOffset + mini, mini, mini).fill('#ff0000ff');
    }
    if (tile.Tracks[1]) {
      rectangle.rect(xOffset + mini, yOffset + 2 * mini, mini, mini).fill('#ffdd00ff');
    }
    if (tile.Tracks[2]) {
      rectangle.rect(xOffset + 2 * mini, yOffset + mini, mini, mini).fill('#00ff26ff');
    }
    if (tile.Tracks[3]) {
      rectangle.rect(xOffset + mini, yOffset, mini, mini).fill('#00ffddff');
    }

    if (tile.Tracks.filter((x) => x).length >= 2) {
      rectangle.rect(xOffset + mini, yOffset + mini, mini, mini).fill('#000000ff');
    }
    this.app.stage.addChild(rectangle);
  }
}
