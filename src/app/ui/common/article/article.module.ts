import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { SharedModule } from '../../@shared/shared.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    SharedModule,
  ],
  exports: [ArticleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleModule {}
