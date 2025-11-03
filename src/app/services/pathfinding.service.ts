import { Injectable } from '@angular/core';
import { Position } from '../models/position.model';
import { Battlefield } from '../models/battlefield.model';

@Injectable({
  providedIn: 'root'
})
export class PathfindingService {

  heuristic(a: Position, b: Position): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  getNeighbors(p: Position, battlefield: Battlefield): Position[] {
    const dirs = [
      { x: 0, y: -1 }, { x: 1, y: 0 },
      { x: 0, y: 1 }, { x: -1, y: 0 }
    ];

    return dirs
      .map(d => ({ x: p.x + d.x, y: p.y + d.y }))
      .filter(n =>
        n.x >= 0 && n.x < battlefield.width &&
        n.y >= 0 && n.y < battlefield.height &&
        Math.round(battlefield.data[n.y * battlefield.width + n.x]) !== 3 // ELEVATED
      );
  }

  reconstructPath(cameFrom: Record<string, Position>, current: Position): Position[] {
    const path = [current];
    const key = (p: Position) => `${p.x},${p.y}`;
    while (cameFrom[key(current)]) {
      current = cameFrom[key(current)];
      path.unshift(current);
    }
    return path;
  }

  findPath(battlefield: Battlefield): Position[] | null {
    if (!battlefield.start || !battlefield.target) return null;

    const openSet: Position[] = [battlefield.start];
    const cameFrom: Record<string, Position> = {};
    const gScore: Record<string, number> = {};
    const fScore: Record<string, number> = {};
    const key = (p: Position) => `${p.x},${p.y}`;

    gScore[key(battlefield.start)] = 0;
    fScore[key(battlefield.start)] = this.heuristic(battlefield.start, battlefield.target);

    while (openSet.length) {
      openSet.sort((a, b) => fScore[key(a)] - fScore[key(b)]);
      const current = openSet.shift()!;

      if (current.x === battlefield.target.x && current.y === battlefield.target.y) {
        return this.reconstructPath(cameFrom, current);
      }

      for (const neighbor of this.getNeighbors(current, battlefield)) {
        const tentativeG = gScore[key(current)] + 1;
        if (tentativeG < (gScore[key(neighbor)] ?? Infinity)) {
          cameFrom[key(neighbor)] = current;
          gScore[key(neighbor)] = tentativeG;
          fScore[key(neighbor)] = tentativeG + this.heuristic(neighbor, battlefield.target);
          if (!openSet.some(n => key(n) === key(neighbor))) openSet.push(neighbor);
        }
      }
    }

    return null;
  }
}
