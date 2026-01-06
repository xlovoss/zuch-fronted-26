import { Injectable } from '@angular/core';
import { SocketService, ServerEnvelope } from './socket.get_api';
import { Container } from 'pixi.js';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public stations: any[] = []; 
  public tiles: any[] = [];
  public users: any[] = [];
  
  
  public mapContainer = new Container();

  public trainMoves$ = new Subject<any>(); 
  

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
        this.users = envelope.Msg.Users || []; 

        break;

      case 'station.create':
        console.log('State: Neue Station', envelope.Msg);
        this.stations.push(envelope.Msg);
        break;

     
      case 'train.move':
        const payload = envelope.Msg;
        console.log("E: Train Move", payload);

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
            
            this.trainMoves$.next(moveData);
        }
        break;
    }
  }
}