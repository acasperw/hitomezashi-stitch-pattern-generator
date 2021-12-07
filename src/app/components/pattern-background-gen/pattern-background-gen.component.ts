import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pattern-background-gen',
  templateUrl: './pattern-background-gen.component.html'
})
export class PatternBackgroundGenComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas?.nativeElement.getContext('2d')!;

    this.setupCanvas();
  }

  public setupCanvas(): void {

  }

}
