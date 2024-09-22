import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiConstants, API_CONSTANTS } from './api_constants';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [{ provide: API_CONSTANTS, useClass: ApiConstants }],
})
export class ApiModule {
  constructor(@Optional() @SkipSelf() parentModule: ApiModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}
