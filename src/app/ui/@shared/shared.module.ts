import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatRippleModule,
    MatIconModule,
  ],
  exports:[
    CommonModule,
    FlexLayoutModule,
    MatRippleModule,
    MatIconModule,
  ]
})
export class SharedModule { }
