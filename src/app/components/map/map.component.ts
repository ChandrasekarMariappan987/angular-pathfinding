import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PathfindingService } from '../../services/pathfinding.service';
import { Battlefield } from '../../models/battlefield.model';
import { Position } from '../../models/position.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  battlefield!: Battlefield;
  path: Position[] = [];
  mapLoaded = false;
  status = '';

  constructor(private mapService: MapService, private pathfindingService: PathfindingService) {}

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas not supported');
    this.ctx = context;
  }

  handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        this.battlefield = this.mapService.parseMap(json);
        this.mapLoaded = true;
        this.status = '✅ Map loaded!';
        this.drawMap();
      } catch (err) {
        alert('Invalid JSON file or format.');
        console.error(err);
      }
    };
    reader.readAsText(input.files[0]);
  }

  handleFindPath() {
    if (!this.mapLoaded) return;
    this.path = this.pathfindingService.findPath(this.battlefield) || [];
    if (this.path.length === 0) this.status = '❌ No valid path found!';
    else this.status = `✅ Path found! Steps: ${this.path.length}`;
    this.drawMap();
  }

  drawMap() {
    if (!this.ctx || !this.battlefield) return;
    const ctx = this.ctx;
    const { width, height, data, start, target } = this.battlefield;
    const cellSize = Math.min(ctx.canvas.width / width, ctx.canvas.height / height);
    const pathSet = new Set(this.path.map(p => `${p.x},${p.y}`));

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const key = `${x},${y}`;
        const value = data[y * width + x];

        if (pathSet.has(key)) ctx.fillStyle = '#4caf50';
        else if (start && x === start.x && y === start.y) ctx.fillStyle = '#2196f3';
        else if (target && x === target.x && y === target.y) ctx.fillStyle = '#f44336';
        else if (Math.round(value) === 3) ctx.fillStyle = '#333';
        else ctx.fillStyle = '#ddd';

        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.strokeStyle = '#999';
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}
