import { Component, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-status',
  templateUrl: './post-status.component.html',
  styleUrls: ['./post-status.component.css']
})
export class PostStatusComponent {
 constructor(public admin: AdminService, public dialog: MatDialog,
   ) { }
 
   @ViewChild('callAddPostStatusDailog') AddPostStatusDailog !: TemplateRef<any>;
   @ViewChild('callEditPostStatusDailog') EditPostStatusDailog !: TemplateRef<any>;
   @ViewChild('callDeleteDailog') DeleteDailog !: TemplateRef<any>;
   filter : string = "";
   fData : any [] = [];
 
   ngOnInit(): void {
     this.admin.getAllPostStatus();
   }
   PostStatusForm: FormGroup = new FormGroup({
    statusName: new FormControl('', Validators.required),
   })
   openAddPostStatusDialog() {
     this.dialog.open(this.AddPostStatusDailog)
 
   }
   saveCategory() {
     if (this.PostStatusForm.valid) {
      this.admin.CreatePostStatus(this.PostStatusForm.value);
       this.dialog.closeAll(); 
     }
   }
 
   EditPostStatusForm: FormGroup = new FormGroup({
    postStatusId:new FormControl(),
    statusName: new FormControl('', Validators.required),
   })
   pData: any = {};
   openEditPostStatusDialog(obj: any) {
     this.pData = obj;
     this.dialog.open(this.EditPostStatusDailog)
     this.EditPostStatusForm.controls['postStatusId'].setValue(obj.postStatusId)
   }
   EditCategory(){
     if (this.EditPostStatusForm.valid) {
       this.admin.EditPostStatus(this.EditPostStatusForm.value);
        this.dialog.closeAll(); 
      }
   }
 
   openDeleteDailog(id: number) {
     const dialogRef = this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result) => {
       if (result !== undefined) {
         if (result === 'yes') {
           this.admin.DeletePostStatus(id); 
         }
       }
     });
   }
 
   dataFilter() {
    if (this.fData.length === 0) {
      this.fData = this.admin.postStatus; 
    }
    if (this.filter !== "") {
      this.admin.postStatus = this.fData.filter((x: any) =>
        x.statusName?.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.admin.postStatus = this.fData;
    }
  }
}
