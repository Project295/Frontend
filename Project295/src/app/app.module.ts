import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OtherprofileComponent } from './otherprofile/otherprofile.component';
import { ResumeComponent } from './resume/resume.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { OthersResumeComponent } from './others-resume/others-resume.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactComponent,
    HomeComponent,
    ProfileComponent,
    OtherprofileComponent,
    ResumeComponent,
    UpdateprofileComponent,
    OthersResumeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
