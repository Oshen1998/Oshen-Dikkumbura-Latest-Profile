import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../@shared/shared.module';
import { HomeTopComponent } from './home-top/home-top.component';
import { HomeAboutComponent } from './home-about/home-about.component';
import { FooterModule } from '../../common/footer/footer.module';
import { HomePlatformsComponent } from './home-platforms/home-platforms.component';
import { HomeExpertiseComponent } from './home-expertise/home-expertise.component';
import { ExpertiseItemComponent } from './home-expertise/expertise-item/expertise-item.component';
import { TechItemComponent } from './home-expertise/tech-item/tech-item.component';
import { HomeContactComponent } from './home-contact/home-contact.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeShowcasesComponent } from './home-showcases/home-showcases.component';
import { AppItemComponent } from './home-showcases/app-item/app-item.component';
import { IconsComponent } from './home-showcases/icons/icons.component';
import { SuccessModule } from '../../common/success/success.module';
import { ProgressModule } from '../../common/progress/progress.module';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { IllustrationModule } from '../../widgets/illustrations/illustration.module';
import { MyAppsComponent } from './home-showcases/my-apps/my-apps.component';
import { ClientAppsComponent } from './home-showcases/client-apps/client-apps.component';
import { MyappItemComponent } from './home-showcases/myapp-item/myapp-item.component';
import { AppItemDialog } from './home-showcases/modal/app-item-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ArticleModule } from '../../common/article/article.module';
import { TimeLineModule } from '../../common/time-line/time-line.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomeTopComponent,
    HomeAboutComponent,
    HomePlatformsComponent,
    HomeExpertiseComponent,
    ExpertiseItemComponent,
    TechItemComponent,
    HomeContactComponent,
    HomeShowcasesComponent,
    AppItemComponent,
    IconsComponent,
    MyAppsComponent,
    ClientAppsComponent,
    MyappItemComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatButtonModule,
    FooterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ProgressModule,
    RecaptchaV3Module,
    SuccessModule,
    IllustrationModule,
    AppItemDialog,
    MatDialogModule,
    ArticleModule,
    TimeLineModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
