import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
// import {MatToolbarModule} from '@angular/material/toolbar';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WeigthTrackerComponent } from './weight-tracker/weight-tracker.component';
import { IntroComponent } from './intro/intro.component';
import { WeightEntry } from './weight-tracker/weight-entry/weight-entry.component';
import { HttpClientModule } from '@angular/common/http';
import { WeightCardComponent } from './weight-tracker/weight-card/weight-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeigthTrackerComponent,
    IntroComponent,
    WeightEntry,
    WeightCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
