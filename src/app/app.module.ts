import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PanelModule} from 'primeng/panel';
import { MessageService } from 'primeng/api';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PanelModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
