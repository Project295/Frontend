import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { OtherprofileComponent } from './otherprofile/otherprofile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ResumeComponent } from './resume/resume.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OthersResumeComponent } from './others-resume/others-resume.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  { 
    path: '',
     redirectTo: 'home',
      pathMatch: 'full' 
  }, 
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "profile/:id",
    component: OtherprofileComponent
  },
  {
    path: "updateProfile",
    component: UpdateprofileComponent
  },
  {
    path: "resume",
    component: ResumeComponent
  },
  {
    path:"contactUs",
    component:ContactComponent
  },
  {
    path:"aboutUs",
    component:AboutUsComponent
 },
  {
    path: "resume/:id",
    component: OthersResumeComponent
  },
  {
    path:'security',
    loadChildren:()=> AuthModule
  },
  {path:'admin', loadChildren:()=>AdminModule}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
