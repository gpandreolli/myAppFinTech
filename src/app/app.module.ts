import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { BrMaskerModule } from 'br-mask';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,BrMaskerModule],
  providers: [{ provide: RouteReuseStrategy,  useClass: IonicRouteStrategy },DatePicker],
  bootstrap: [AppComponent],
})
export class AppModule {}
