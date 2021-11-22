import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { StakeInfoComponent } from './components/stake-info/stake-info.component';
import { StartPointComponent } from './components/start-point/start-point.component';
import { FooterComponent } from './components/footer/footer.component';
import { QrDialogComponent } from './components/qr-dialog/qr-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/auth.interceptor';

import { QRCodeModule } from 'angular2-qrcode';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    RewardsComponent,
    StakeInfoComponent,
    StartPointComponent,
    FooterComponent,
    QrDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    TableModule,
    ToastModule,

    FormsModule,
    QRCodeModule,
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
