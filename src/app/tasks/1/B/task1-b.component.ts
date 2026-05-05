import {AfterViewInit, Component, ElementRef} from '@angular/core';
import Konva from "konva";

@Component({
  selector: 'app-task1-b',
  templateUrl: './task1-b.component.html',
  styleUrls: ['./task1-b.component.less'],
  standalone: false
})
export class Task1BComponent implements AfterViewInit {
  selectedLayer?: Konva.Layer;
  stage?: Konva.Stage;
  transformer?: Konva.Transformer;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => { // Forcing a single change detection cycle delay
      this.stage = new Konva.Stage({
        container: 'konva-container',
        width: this.el.nativeElement.offsetWidth,
        height: 500,
      });
      const layer = new Konva.Layer();
      this.stage.add(layer);

      this.selectedLayer = this.stage.getLayers()[0];

      this.transformer = new Konva.Transformer();
      this.selectedLayer.add(this.transformer);

    });

  }
}
