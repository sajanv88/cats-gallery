import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLayoutComponent } from './grid-layout.component';
import { AsyncImageModule } from '../async-image/async-image.module';

@NgModule({
  declarations: [GridLayoutComponent],
  exports: [GridLayoutComponent],
  imports: [
    CommonModule,
    AsyncImageModule
  ]
})
export class GridLayoutModule { }
