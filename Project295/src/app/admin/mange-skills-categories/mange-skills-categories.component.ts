import { Component, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mange-skills-categories',
  templateUrl: './mange-skills-categories.component.html',
  styleUrls: ['./mange-skills-categories.component.css']
})
export class MangeSkillsCategoriesComponent {
  constructor(public admin: AdminService, public dialog: MatDialog, private router: Router,
  ) { }

  @ViewChild('callAddCategoryDailog') AddCategoryDailog !: TemplateRef<any>;
  @ViewChild('callEditCategoryDailog') EditCategoryDailog !: TemplateRef<any>;
  @ViewChild('callDeleteDailog') DeleteDailog !: TemplateRef<any>;
  filter: string =""
  fData: any[] =[]

  ngOnInit(): void {
    this.admin.getAllskillsCategory();
  }
  categoryForm: FormGroup = new FormGroup({
    skillsCategoryName: new FormControl('', Validators.required),
  })
  openAddCategoryDialog() {
    this.dialog.open(this.AddCategoryDailog)

  }
  saveCategory() {
    if (this.categoryForm.valid) {
     this.admin.CreateskillsCategory(this.categoryForm.value);
      this.dialog.closeAll(); 
    }
  }

  EditcategoryForm: FormGroup = new FormGroup({
    skillsCategoryId:new FormControl(),
    skillsCategoryName: new FormControl('', Validators.required),
  })
  pData: any = {};
  openEditCategoryDialog(obj: any) {
    this.pData = obj;
    this.dialog.open(this.EditCategoryDailog)
    this.EditcategoryForm.controls['skillsCategoryId'].setValue(obj.skillsCategoryId)
  }
  EditCategory(){
    if (this.EditcategoryForm.valid) {
      this.admin.EditSkillsCategory(this.EditcategoryForm.value);
       this.dialog.closeAll(); 
     }
  }

  openDeleteDailog(id: number) {
    const dialogRef = this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result === 'yes') {
          this.admin.DeleteskillsCategories(id); 
        }
      }
    });
  }

  GoToSkills(id: number){
    this.router.navigate(['admin/mangeSkills/',id]);

  }
  dataFilter() {
    if (this.fData.length === 0) {
      this.fData = this.admin.skillsCategory; 
    }
    if (this.filter !== "") {
      this.admin.skillsCategory = this.fData.filter((x: any) =>
        x.skillsCategoryName?.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.admin.skillsCategory = this.fData;
    }
  }
}
