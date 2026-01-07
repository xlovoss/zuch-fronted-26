declare interface Tile {
  Tracks: boolean[];
  Signals: boolean[];
  IsPlattform: boolean;
  IsBlocked: boolean;
  ActiveTile?: ActiveTile;
  X: number;
  Y: number;
  IsLocked: boolean;
}

declare interface ActiveTile {
  Id: number;
  Category?: ActiveTileCategory;
  Name: string;
  Level: number;
  Stations: (Station | undefined)[];
  Storage: { [key: string]: number };
  MaxStorage: number;
}

declare interface ActiveTileCategory {
  Produktionszyklen: Produktionszyklus[];
}

declare interface Produktionszyklus {
  Verbrauch: { [key: string]: number };
  Produktion: { [key: string]: number };
  verfügbareLevelUndScaling: number[];
}

declare interface Station {
  Id: number;
  Name: string;
  Storage: { [key: string]: number };
  Capacity: number;
  Plattforms: { [key: number]: Plattform | undefined };
}

declare interface Plattform {
  Id: number;
  Name: string;
  Tiles: number[][];
}
