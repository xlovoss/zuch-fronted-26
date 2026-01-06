import { Injectable } from '@angular/core';
import { SocketService, ServerEnvelope } from './socket.get_api';
import { Container } from 'pixi.js';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public stations: any[] = [];
  public tiles: any[] = [];
  public users: any[] = [];
  public mapContainer = new Container();

  constructor(private socketService: SocketService) {
    this.socketService.messages$.subscribe((envelope: ServerEnvelope) => {
      this.handleMessage(envelope);
    });
  }

  // Login Methode
  public initLogin(username: string) {
    this.socketService.connect(username);
  }

  private handleMessage(envelope: ServerEnvelope) {
    switch (envelope.Type) {
      case 'game.initialLoad':
        console.log('State: Lade initialen Spielstand', envelope.Msg);
        this.stations = envelope.Msg.Stations || [];
        this.tiles = envelope.Msg.Tiles || [];
        this.users = envelope.Msg.Tiles || [];

        //Map zeichnen
        // drawTiles(this.mapContainer, this);
        break;

      case 'station.create':
        console.log('State: Neue Station', envelope.Msg);
        this.stations.push(envelope.Msg);
        break;
    }
  }
}
