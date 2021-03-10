import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/Toolbar' ;
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerHarness} from '@angular/material/progress-spinner/testing';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DataService } from './data.service';



const  routes :Routes=[

  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'home',component:HomeComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule

  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  exports:[MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule
    ]

})
export class AppModule { }
