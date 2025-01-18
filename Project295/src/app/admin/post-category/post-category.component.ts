import { Component, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent {
  constructor(public admin: AdminService, public dialog: MatDialog,
   ) { }
 
   @ViewChild('callAddCategoryDailog') AddCategoryDailog !: TemplateRef<any>;
   @ViewChild('callEditCategoryDailog') EditCategoryDailog !: TemplateRef<any>;
   @ViewChild('callDeleteDailog') DeleteDailog !: TemplateRef<any>;
   filter : string ="";
   fData : any [] =[];
 
   ngOnInit(): void {
     this.admin.getAllPostCategory();
   }
   categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
   })
   openAddCategoryDialog() {
     this.dialog.open(this.AddCategoryDailog)
 
   }
   saveCategory() {
     if (this.categoryForm.valid) {
      this.admin.CreatePostCategory(this.categoryForm.value);
       this.dialog.closeAll(); 
     }
   }
 
   EditcategoryForm: FormGroup = new FormGroup({
    categoryId:new FormControl(),
     categoryName: new FormControl('', Validators.required),
   })
   pData: any = {};
   openEditCategoryDialog(obj: any) {
     this.pData = obj;
     this.dialog.open(this.EditCategoryDailog)
     this.EditcategoryForm.controls['categoryId'].setValue(obj.categoryId)
   }
   EditCategory(){
     if (this.EditcategoryForm.valid) {
       this.admin.EditPostCategory(this.EditcategoryForm.value);
        this.dialog.closeAll(); 
      }
   }
 
   openDeleteDailog(id: number) {
     const dialogRef = this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result) => {
       if (result !== undefined) {
         if (result === 'yes') {
           this.admin.DeletePostCategories(id); 
         }
       }
     });
   }
   dataFilter() {
    if (this.fData.length === 0) {
      this.fData = this.admin.postCategory; 
    }
    if (this.filter !== "") {
      this.admin.postCategory = this.fData.filter((x: any) =>
        x.categoryName?.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.admin.postCategory = this.fData;
    }
  }
 
 
}
