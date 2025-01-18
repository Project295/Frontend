import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserMangeComponent } from './user-mange/user-mange.component';
import { SharedModule } from '../shared/shared.module';
import { MangeSkillsCategoriesComponent } from './mange-skills-categories/mange-skills-categories.component';
import { MangeSkillsComponent } from './mange-skills/mange-skills.component';
import { ContactComponent } from './contact/contact.component';
import { ComplainComponent } from './complain/complain.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { PostStatusComponent } from './post-status/post-status.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';


@NgModule({
  declarations: [
    SidebarComponent,
    UserMangeComponent,
    MangeSkillsCategoriesComponent,
    MangeSkillsComponent,
    ContactComponent,
    ComplainComponent,
    PostCategoryComponent,
    PostStatusComponent,
    AdminprofileComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
