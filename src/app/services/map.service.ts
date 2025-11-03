import { Injectable } from '@angular/core';
import { Battlefield } from '../models/battlefield.model';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  TILE = { START: 0, TARGET: 8, ELEVATED: 3, GROUND: -1 };

  parseMap(json: any): Battlefield {
    const layer = json.layers[0];
    const width = layer.width || Math.sqrt(layer.data.length);
    const height = layer.height || Math.ceil(layer.data.length / width);

    let start: Position | null = null;
    let target: Position | null = null;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = layer.data[y * width + x];
        if (Math.round(value) === this.TILE.START) start = { x, y };
        if (Math.round(value) === this.TILE.TARGET) target = { x, y };
      }
    }

    return { width, height, data: layer.data, start, target };
  }

  getValueAt(map: Battlefield, pos: Position) {
    return map.data[pos.y * map.width + pos.x];
  }

  isElevated(value: number) {
    return Math.round(value) === this.TILE.ELEVATED;
  }
}
