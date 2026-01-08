import { Injectable } from '@angular/core';
import { SocketService, ServerEnvelope } from './socket.get_api';
import { Container } from 'pixi.js';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private stations: Map<number, Station> = new Map();
  public stationSubject: ReplaySubject<Map<number, Station>> = new ReplaySubject<
    Map<number, Station>
  >();
  private tiles: Tile[][] = [];
  public tileSubject: ReplaySubject<Tile[][]> = new ReplaySubject<Tile[][]>();
  public users: any[] = [];
  public payload: any = '';
  
  
  public mapContainer = new Container();

  public goTrain$ = new ReplaySubject<any>(1); 
  

  constructor(private socketService: SocketService) {
    this.socketService.messages$.subscribe((envelope: ServerEnvelope) => {
      this.handleMessage(envelope);
    });
  }

 
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

        this.tileSubject.next(this.tiles);
        //Map zeichnen
        // drawTiles(this.mapContainer, this);
        break;

      case 'station.create':
        console.log('State: Neue Station', envelope.Msg);
        this.stations.set(envelope.Msg.Id, envelope.Msg);
        this.stationSubject.next(this.stations);
        //this.stations.push(envelope.Msg.Id,envelope.Msg);
        break;

     
      case 'train.move':
         this.payload = envelope.Msg;
        //console.log("E: Train Go", payload);

        if (this.payload.Waggons && this.payload.Waggons.length > 0) {
            
            const wagonList = this.payload.Waggons.map((waggon: any, index: number) => {
                if (!waggon.Position) return null;
                
                return {
                    index: index,        
                    col: waggon.Position[1], 
                    row: waggon.Position[0],
                    load: waggon.Load || null
                };
            }).filter((w: any) => w !== null);

            const moveData = {
                id: this.payload.Id || this.payload.ID, 
                wagons: wagonList
            };
            
            this.goTrain$.next(moveData);
        }
        break;

     
      case 'train.move':
        const payload = envelope.Msg;
        //console.log("E: Train Go", payload);

        if (payload.Waggons && payload.Waggons.length > 0) {
            
            const wagonList = payload.Waggons.map((waggon: any, index: number) => {
                if (!waggon.Position) return null;
                
                return {
                    index: index,        
                    col: waggon.Position[1], 
                    row: waggon.Position[0],
                    load: waggon.Load || null
                };
            }).filter((w: any) => w !== null);

            const moveData = {
                id: payload.Id || payload.ID, 
                wagons: wagonList
            };
            
            this.goTrain$.next(moveData);
        }
        break;
    }
  }
}
