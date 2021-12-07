import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


// export class Line {
//   constructor(private ctx: CanvasRenderingContext2D) { }

//   draw(x: number, y: number, z: number) {
//     this.ctx.fillRect(z * x, z * y, z, z);
//   }
// }

export class Line {

  private x1: number;
  private y1: number;
  private x2?: number;
  private y2?: number;
  public length: number;
  private type: string;
  private size: number;
  private lineDashOffset: number;
  private d: number;

  constructor(
    private ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    type: string,
    d: number,
    size: number
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.length = 0;
    this.type = type;
    this.size = size;
    this.d = d;
    this.lineDashOffset = Math.random() > 0.5 ? this.d : 0;
    this.getCoords();
  }

  getCoords() {
    if (this.type == "v") {
      this.x2 = this.x1;
      this.y2 = this.y1 + this.length;
    } else {
      this.x2 = this.x1 + this.length;
      this.y2 = this.y1;
    }
  }

  draw() {
    this.ctx.strokeStyle = "hotpink";
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x1, this.y1);
    this.ctx.lineTo(this.x2!, this.y2!);
    this.ctx.setLineDash([this.d, this.d]);
    this.ctx.lineDashOffset = this.lineDashOffset;
    this.ctx.stroke();
  }
}


@Component({
  selector: 'app-pattern-background-gen',
  templateUrl: './pattern-background-gen.component.html'
})
export class PatternBackgroundGenComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  private cw: number = 0;
  private ch: number = 0;
  private size: number = 0;

  private rid: any;

  private i = 0;
  private j = 0;
  public d = 50;
  public n: any;
  public v: Line[] = [];
  public h: Line[] = [];

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    this.setupCanvas();
  }

  public setupCanvas(): void {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;

    this.cw = window.innerWidth;
    this.ch = window.innerHeight;

    this.size = Math.max(this.cw, this.ch);

    if (this.rid) {
      cancelAnimationFrame(this.rid);
      this.rid = null;
    }

    this.startDrawing();
  }

  public startDrawing(): void {
    this.pattern();
    this.draw();
  }

  private pattern(): void {
    this.v = [];
    this.h = [];
    this.i = 0;
    this.j = 0;

    for (let x = 0; x < this.size; x += this.d) {
      this.v.push(new Line(this.ctx, x, 0, "v", this.d, this.size));
    }

    this.n = this.v.length;

    for (let y = 0; y < this.size; y += this.d) {
      this.h.push(new Line(this.ctx, 0, y, "h", this.d, this.size));
    }
  }

  private draw = () => {
    this.rid = requestAnimationFrame(this.draw);

    this.ctx.clearRect(0, 0, this.cw, this.ch);

    if (this.v[this.i].length < this.size) {
      this.v[this.i].length += this.d;
      this.h[this.i].length += this.d;
      this.v[this.i]?.getCoords();
      this.h[this.i]?.getCoords();
    } else {
      this.i++;
    }

    this.v.map((l) => {
      l.draw();
    });

    this.h.map((l) => {
      l.draw();
    });

    if (this.i >= this.n - 1) {
      cancelAnimationFrame(this.rid);
      this.rid = null;
    }
  }

}
