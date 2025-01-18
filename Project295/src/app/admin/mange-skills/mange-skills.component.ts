import { Component, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mange-skills',
  templateUrl: './mange-skills.component.html',
  styleUrls: ['./mange-skills.component.css']
})
export class MangeSkillsComponent {

  @ViewChild('callAddSkillDailog') AddSkillDailog !: TemplateRef<any>;
  @ViewChild('callEditSkillDailog') EditSkillDailog !: TemplateRef<any>;
  @ViewChild('callDeleteDailog') DeleteDailog !: TemplateRef<any>;
  filter: string = ""
  fData: any[] = []

  constructor(
    public admin: AdminService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  id!: number;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.admin.getAllSkills(this.id);
    });
  }

  skillForm: FormGroup = new FormGroup({
    SkillName: new FormControl('', Validators.required),
    SkillCategoryId: new FormControl(),
  })
  openAddSkillDialog() {
    this.dialog.open(this.AddSkillDailog)

  }
  saveSkill() {
    if (this.skillForm.valid) {
      this.skillForm.controls['SkillCategoryId'].setValue(this.id)
      this.admin.Createskills(this.skillForm.value);
      console.log(this.skillForm.value)
      this.dialog.closeAll();
    }
  }

  EditSkillForm: FormGroup = new FormGroup({
    SkillId: new FormControl(),
    SkillName: new FormControl('', Validators.required),
    SkillCategoryId: new FormControl(),
  })
  pData: any = {};
  openEditSkillDialog(obj: any) {
    this.pData = obj;
    this.dialog.open(this.EditSkillDailog)
    this.EditSkillForm.controls['SkillId'].setValue(obj.skillId)
    this.EditSkillForm.controls['SkillCategoryId'].setValue(this.id)

  }
  EditSkill() {
    if (this.EditSkillForm.valid) {
      this.admin.EditSkill(this.EditSkillForm.value);
      this.dialog.closeAll();
    }
  }

  openDeleteDailog(obj: any) {
    const dialogRef = this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result === 'yes') {
          this.admin.Deleteskill(obj.skillId, obj.skillCategoryId);
        }
      }
    });
  }
  dataFilter() {
    // Back up the original data if not already backed up
    if (this.fData.length === 0) {
      this.fData = this.admin.skills;
    }

    // Apply the filter if it's not empty
    if (this.filter !== "") {
      this.admin.skills = this.fData.filter((x: any) =>
        x.skillName?.toLowerCase().includes(this.filter.toLowerCase()) // Return true if filter matches
      );
    } else {
      // Reset to the original data if the filter is empty
      this.admin.skills = this.fData;
    }
  }
}
