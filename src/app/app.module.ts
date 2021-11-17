import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RewardsComponent } from './components/rewards/rewards.component';
// import { FutureComponent } from './components/future/future.component';
import { StakeInfoComponent } from './components/stake-info/stake-info.component';
import { StartPointComponent } from './components/start-point/start-point.component';
import { FooterComponent } from './components/footer/footer.component';
import { QrDialogComponent } from './components/qr-dialog/qr-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/auth.interceptor';

import { QRCodeModule } from 'angular2-qrcode';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    RewardsComponent,
    // FutureComponent,
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
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    QRCodeModule,
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
