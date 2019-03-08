import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncImageComponent } from './async-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AsyncImageComponent],
  exports: [AsyncImageComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class AsyncImageModule { }
