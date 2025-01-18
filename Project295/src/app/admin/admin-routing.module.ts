import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMangeComponent } from './user-mange/user-mange.component';
import { MangeSkillsCategoriesComponent } from './mange-skills-categories/mange-skills-categories.component';
import { MangeSkillsComponent } from './mange-skills/mange-skills.component';
import { ContactComponent } from './contact/contact.component';
import { ComplainComponent } from './complain/complain.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { PostStatusComponent } from './post-status/post-status.component';
import { ProfileComponent } from '../profile/profile.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';

const routes: Routes = [
  {path:'userMange', component:UserMangeComponent},
  {path:'skillsCategories', component:MangeSkillsCategoriesComponent},
  {path:'mangeSkills/:id', component:MangeSkillsComponent},
  {path:'contact', component:ContactComponent},
  {path:'complain', component:ComplainComponent},
  {path:'postCategory', component:PostCategoryComponent},
  {path:'postStatus', component:PostStatusComponent},
  {path:'profile', component:AdminprofileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
