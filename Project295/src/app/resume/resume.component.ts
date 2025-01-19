import { Component, ViewChild, TemplateRef } from '@angular/core';
import { HomeService } from '../services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { userProfile } from '../dto/userProfileDTO';
import { ToastrService } from 'ngx-toastr';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  @ViewChild('callAddExperinceDailog') AddExperinceDailog!: TemplateRef<any>;
  @ViewChild('callEditExperinceDailog') EditExperinceDailog!: TemplateRef<any>;
  @ViewChild('callDeleteExperinceDailog')
  DeleteExperinceDailog!: TemplateRef<any>;

  @ViewChild('callAddProjectsDailog') AddProjectsDailog!: TemplateRef<any>;
  @ViewChild('callEditProjectsDailog') EditProjectsDailog!: TemplateRef<any>;
  @ViewChild('callDeleteProjectsDailog')
  DeleteProjectsDailog!: TemplateRef<any>;

  @ViewChild('callAddSkillDailog') AddSkillDailog!: TemplateRef<any>;
  @ViewChild('callDeleteSkillDailog') DeleteSkillDailog!: TemplateRef<any>;

  @ViewChild('callAddEducationDailog') AddEducationDailog!: TemplateRef<any>;
  @ViewChild('callEditEducationDailog') EditEducationDailog!: TemplateRef<any>;
  @ViewChild('callDeleteEducationDailog')
  DeleteEducationDailog!: TemplateRef<any>;

  userId!: number;
  userProfile: userProfile | null = null;

  constructor(
    public home: HomeService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.getUserPersonalData();

      this.home.getAllUserExperienceById(this.userId);
      this.home.GetUserSkillByUserId(this.userId);
      this.home.GetUserProjectById(this.userId);
      this.home.GetUserEducationById(this.userId);
      this.home.GetAllSkillsCategory();
    }
  }
  getUserPersonalData() {
    this.home.getUserPersonalData(this.userId!).subscribe(
      (result: any) => {
        if (result) {
          this.userProfile = result;
        }
      },
      (error) => {
        this.toastr.error('Something wrong in user data please refresh');
      }
    );
  }

  editMode: boolean = false;

  toggleEditMode() {
    this.editMode = !this.editMode; // Toggle between view and edit modes
  }

  //Experince
  experienceForm: FormGroup = new FormGroup({
    userExperienceTitle: new FormControl('', Validators.required),
    userExperienceDiscription: new FormControl('', Validators.required),
    userExperienceDateFrom: new FormControl('', Validators.required),
    userExperienceDateTo: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  });
  openAddExperinceDialog() {
    this.experienceForm.controls['userId'].setValue(this.userId);
    this.dialog.open(this.AddExperinceDailog);
  }
  saveExperience() {
    if (this.experienceForm.valid) {
      this.home.CreateUserExperience(this.experienceForm.value, this.userId);
      this.dialog.closeAll();
    }
  }
  editExperienceForm: FormGroup = new FormGroup({
    userExperienceId: new FormControl(),
    userExperienceTitle: new FormControl('', Validators.required),
    userExperienceDiscription: new FormControl('', Validators.required),
    userExperienceDateFrom: new FormControl('', Validators.required),
    userExperienceDateTo: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  });
  pData: any = {};
  openEditExperinceDialog(obj: any) {
    this.pData = obj;
    console.log(this.pData, 'dfff');

    this.editExperienceForm.controls['userExperienceId'].setValue(
      obj.userExperienceId
    );
    this.editExperienceForm.controls['userId'].setValue(this.userId);
    if (this.pData.userExperienceDateFrom) {
      this.pData.userExperienceDateFrom = new Date(
        this.pData.userExperienceDateFrom
      )
        .toISOString()
        .split('T')[0];
    }
    if (this.pData.userExperienceDateTo) {
      this.pData.userExperienceDateTo = new Date(
        this.pData.userExperienceDateTo
      )
        .toISOString()
        .split('T')[0];
    }
    this.dialog.open(this.EditExperinceDailog);
  }

  editExperience() {
    this.home.UpdateUserExperience(this.editExperienceForm.value, this.userId);
    this.dialog.closeAll();
  }
  ExperienceId: number = 0;
  openDeleteExperinceDialog(id: number) {
    this.ExperienceId = id;
    this.dialog.open(this.DeleteExperinceDailog);
  }
  deleteExperience() {
    this.home.DeleteUserExperience(this.ExperienceId, this.userId);
    this.dialog.closeAll();
  }

  //Projects
  projectForm: FormGroup = new FormGroup({
    userProjectsTitle: new FormControl('', Validators.required),
    userProjectDiscription: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  });
  openAddProjectsDialog() {
    this.projectForm.controls['userId'].setValue(this.userId);
    this.dialog.open(this.AddProjectsDailog);
  }
  saveProject() {
    this.home.CreateUserProject(this.projectForm.value, this.userId);
    this.dialog.closeAll();
  }
  editProjectForm: FormGroup = new FormGroup({
    UserProjectId: new FormControl(),
    userProjectsTitle: new FormControl('', Validators.required),
    userProjectDiscription: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  });
  pDataProject: any = {};
  openEditProjectsDialog(obj: any) {
    this.pDataProject = obj;
    this.editProjectForm.controls['UserProjectId'].setValue(obj.userProjectId);
    this.editProjectForm.controls['userId'].setValue(this.userId);
    this.dialog.open(this.EditProjectsDailog);
  }
  editProject() {
    this.home.UpdateUserProject(this.editProjectForm.value, this.userId);
    this.dialog.closeAll();
  }
  projectId: number = 0;
  openDeleteProjectsDialog(id: number) {
    this.projectId = id;
    this.dialog.open(this.DeleteProjectsDailog);
  }
  deleteProject() {
    this.home.DeleteUserProject(this.projectId, this.userId);
    this.dialog.closeAll();
  }

  //Skill
  skillForm: FormGroup = new FormGroup({
    SkillId: new FormControl('', Validators.required),
    UserId: new FormControl('', Validators.required),

  });
  openAddSkillDialog() {
    this.dialog.open(this.AddSkillDailog);
  }
  selectedCategoryId: number = 0;
  selectedSkillId: number = 0;
  getSkills() {
    console.log("Fetching skills for category:", this.selectedCategoryId);
    this.home.GetSkillsByCategoryId(this.selectedCategoryId);
  }
  saveSkill() {
    this.skillForm.controls['SkillId'].setValue(this.selectedSkillId);
    this.skillForm.controls['UserId'].setValue(this.userId);
    this.home.CreateUserSkill(this.skillForm.value,this.userId)
    this.dialog.closeAll();

  }
  UserSkillId: number = 0;
  openDeleteSkillDialog(id: number) {    
    this.UserSkillId=id;
    this.dialog.open(this.DeleteSkillDailog);
  }

  deleteSkill() {
    this.home.DeleteUserSkill(this.UserSkillId,this.userId)
    this.dialog.closeAll();

  }

  //Education
  educationForm: FormGroup = new FormGroup({
    universityName: new FormControl('', Validators.required),
    certificationName: new FormControl('', Validators.required),
    userExperienceDateFrom: new FormControl('', Validators.required),
    userExperienceDateTo: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  });
  openAddEducationDialog() {
    this.educationForm.controls['userId'].setValue(this.userId);
    this.dialog.open(this.AddEducationDailog);
  }
  saveEducation() {
    this.home.CreateUserEducation(this.educationForm.value, this.userId);
    this.dialog.closeAll();
  }
  editEducationForm: FormGroup = new FormGroup({
    userExperienceId: new FormControl(),
    universityName: new FormControl('', Validators.required),
    certificationName: new FormControl('', Validators.required),
    userExperienceDateFrom: new FormControl('', Validators.required),
    userExperienceDateTo: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  });
  pDataEducation: any = {};
  openEditEducationDialog(obj: any) {
    this.pDataEducation = obj;
    this.editEducationForm.controls['userExperienceId'].setValue(
      obj.userExperienceId
    );
    this.editEducationForm.controls['userId'].setValue(this.userId);
    if (this.pDataEducation.userExperienceDateFrom) {
      this.pDataEducation.userExperienceDateFrom = new Date(
        this.pDataEducation.userExperienceDateFrom
      )
        .toISOString()
        .split('T')[0];
    }
    if (this.pDataEducation.userExperienceDateTo) {
      this.pDataEducation.userExperienceDateTo = new Date(
        this.pDataEducation.userExperienceDateTo
      )
        .toISOString()
        .split('T')[0];
    }
    this.dialog.open(this.EditEducationDailog);
  }
  editEducation() {
    this.home.UpdateUserEducation(this.editEducationForm.value, this.userId);
    this.dialog.closeAll();
  }
  educationId: number = 0;
  openDeleteEducationDialog(id: number) {
    this.educationId = id;
    this.dialog.open(this.DeleteEducationDailog);
  }

  deleteEducation() {
    this.home.DeleteUserEducation(this.educationId, this.userId);
    this.dialog.closeAll();
  }
}
