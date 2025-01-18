import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



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
    RouterModule,
    MatDialogModule,
    MatButtonModule,

    MatDialogModule,
    MatSlideToggleModule,
    RouterModule,
    MatButtonModule,
     MatDividerModule,
     MatFormFieldModule,
      MatIconModule,
      MatInputModule
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,

    
    
    MatSlideToggleModule,
    MatButtonModule, 
    MatDividerModule,
     MatIconModule,
     MatFormFieldModule,
     MatInputModule
  ]
})
export class SharedModule { }
