import { Component, ElementRef, inject, Input, OnInit } from '@angular/core';
import { UiUtilsColor } from 'src/app/ui/utils/color.utils';
import { AppItemDialog } from '../modal/app-item-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.scss'],
})
export class AppItemComponent implements OnInit {
  @Input('name') set name(data: string) {
    if (data) {
      this._mName = data;
    }
  }
  @Input('id') set id(data: string) {
    if (data) {
      this.id = data;
    }
  }
  @Input('link') set link(data: string) {
    if (data) {
      this._mAppUrl = data;
    }
  }

  @Input('image') set image(data: string) {
    if (data) {
      this._mImage = data;
    }
  }

  @Input('color') set color(data: string | undefined) {
    if (data) {
      this._mColor = data;
    }
  }

  _mAppUrl: string = '';
  _mName: string = '';
  _mImage?: string;
  _mColor: string = '#FFFFFF';

  dialog = inject(MatDialog);

  constructor(public el: ElementRef) {}

  ngOnInit(): void {
    this.bindColor();
  }

  bindColor() {
    let element = this.el.nativeElement;
    element.style.setProperty('--app-primary', this._mColor);
    element.style.setProperty(
      '--app-primary--rgb',
      UiUtilsColor.hexToRgb(this._mColor)
    );
  }

  openDialog(key: string, image?: string) {
    this.dialog.open(AppItemDialog, {
      data: {
        key: key,
        image: image,
      },
    });
  }

  public onHandleClick(key: string, image?: string) {
    this.openDialog(key, image);
  }
}
