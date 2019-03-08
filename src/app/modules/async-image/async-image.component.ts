import { Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter } from '@angular/core';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';

@Component({
  selector: 'async-image',
  templateUrl: './async-image.component.html',
  styleUrls: ['./async-image.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('inital', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('inital=>final', animate('1500ms')),
      transition('final=>inital', animate('1000ms'))
    ])
  ]
})
export class AsyncImageComponent implements OnInit {

  private _source: string;

  @ViewChild('imageRef') imageRef: ElementRef;

  @Input()
  public set imageSource(path: string) {
    this._source = path;
  }

  @Output()
  public imageLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isLoaded: Boolean = false;

  constructor() { }

  ngOnInit() {
    const image: HTMLImageElement = new Image() as HTMLImageElement;
    image.src = this._source;
    image.onload = (event: any) => {
      this.imageRef.nativeElement.src = this._source;
      this.isLoaded = true;
      this.imageLoaded.emit(true);
    };
  }
}
