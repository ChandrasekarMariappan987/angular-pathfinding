import { Position } from './position.model';

export interface Battlefield {
  width: number;
  height: number;
  data: number[]; // linear array from JSON
  start: Position | null;
  target: Position | null;
}
