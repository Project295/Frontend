import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut :5000,
      positionClass:'toast-top-right',
      preventDuplicates:true,
    }),
    RouterModule
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    
  ]
})
export class SharedModule { }
