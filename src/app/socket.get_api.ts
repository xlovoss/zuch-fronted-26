import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ServerEnvelope {
  Type: string;
  Msg: any;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: WebSocket | null = null;
  private readonly URL = 'ws://localhost:8080/ws';

  public messages$ = new Subject<ServerEnvelope>();

  constructor() {}


  connect(username: string): void {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)
    ) {
      console.log('SocketService: Bereits verbunden. Ignoriere Anfrage.');
      return;
    }

    console.log('SocketService: Starte Verbindung...');
    this.socket = new WebSocket(`${this.URL}?username=${username}`);

    this.socket.onopen = () => {
      console.log('SocketService: Verbunden!');
    };

    this.socket.onmessage = (event) => {
      try {
        const data: ServerEnvelope = JSON.parse(event.data);

       // console.log('E:', data.Type, data.Msg);

        this.messages$.next(data);
      } catch (e) {
        console.error('Parse Error:', e);
      }
    };

    this.socket.onclose = (event) => {
      console.warn(`SocketService: Getrennt (Code ${event.code})`);
      this.socket = null;

      setTimeout(() => this.connect(username), 3000);
    };

    this.socket.onerror = (error) => {
      console.error('Socket Fehler:', error);
    };
  }
}
