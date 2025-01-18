import { Component, ElementRef, OnInit, TemplateRef, ViewChild,HostListener  } from '@angular/core';
import { HomeService } from '../services/home.service';
import { userProfile } from '../dto/userProfileDTO';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
//import { ProfileCounts } from '../dto/countsDTO';
import { userPosts } from '../dto/userPostsDTO';
import { MatDialog } from '@angular/material/dialog';
import { addPostDTO } from '../dto/addPostDTO';
import { postCatigories } from '../dto/postCategoryDTO';
import { postStatusDTO } from '../dto/postTypeDTO';
import { UpdatePostDTO } from '../dto/UpdatePostDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
 
  
  constructor(private homeService : HomeService, private toastr:ToastrService,
     private spinner:NgxSpinnerService, private dialog: MatDialog,private router: Router) {}

   userId : number|undefined ;

   userProfile: userProfile | null = null;
   postsCount: number=0;
   userPosts: userPosts[] =[] ;
   postToUpdate! : UpdatePostDTO;
   @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
   @ViewChild('updateDialog') updateDialog!: TemplateRef<any>;
   @ViewChild('fileInput') fileInput!: ElementRef;

   postIdToDelete : number =0
   addPosts: addPostDTO = new addPostDTO(); 
   categories : postCatigories [] =[]
  postTypes : postStatusDTO [] = []
  selectedImage: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userId"));
    if(this.userId){
      this.spinner.show()
      this.getUserPersonalData()
      //this.getProfileCounts()
      this.getUserPosts() 
      this.getPostCategories();
      this.getPostStatus()
      setTimeout(() => {
        this.spinner.hide();
      }, 4000);

    }

    
  }
  
  getUserPersonalData(){
    this.homeService.getUserPersonalData(this.userId!).subscribe((result:any)=>{
      if(result){
        this.userProfile= result
      }
    },error=>{
      this.toastr.error("Something wrong in user data please refresh")
    })
  }
  // getProfileCounts(){
  //   this.homeService.getProfileCounts(this.userId!).subscribe((result:any)=>{
  //     if(result){
  //      this.counts=result
  //     }
  //   },error=>{
  //     this.toastr.error("Something wrong in user data please refresh")
  //   })
  // }
  goUpdateProfile(){
    this.router.navigate(['updateProfile']);

  }
  goResume(){
    this.router.navigate(['resume']);

  }
  getUserPosts(){
    this.homeService.getUserPosts(this.userId!).subscribe((result:any)=>{
      if(result){
       this.userPosts=result.posts;
       this.postsCount=result.postsCounts
      }
    },error=>{
      this.toastr.error("Something wrong in user data please refresh")
    })
  }

  openDeleteDialog(postId : number): void {
    this.postIdToDelete=postId;
    const dialogRef = this.dialog.open(this.deleteDialog, {
      width: '400px',
    });
  }
  DeletePost(isdeleted : boolean):void{

    if(isdeleted){
      this.homeService.deletePost(this.postIdToDelete!).subscribe((result:any)=>{
        if(result){
          
          this.toastr.success("Post deleted successfully")
          this.userPosts = this.userPosts.filter(x=>x.postId!==this.postIdToDelete)
        }
      },error=>{
        this.toastr.error("Something wrong Post not found")
      })
    }
      this.dialog.closeAll();
  }
  openUpdateDialog(post : any): void {
    this.postToUpdate = post
    this.postToUpdate.userId = this.userId;
    this.postToUpdate.attachmentId = post.attachmentId;
    this.postToUpdate.attachmentPath = post.attachmentPath
    const dialogRef = this.dialog.open(this.updateDialog, {
      width: '800px',
    });
  }
  getPostCategories(){
    this.homeService.getPostCategories().subscribe((result:any)=>{
      if(result){
        this.categories=result;
      }
    },error=>{
      this.toastr.error("Failed to get categories")

    })
  }
  getPostStatus(){
    this.homeService.getPostStatus().subscribe((result:any)=>{
      if(result){
        this.postTypes=result;
      }
    },error=>{
      this.toastr.error("Failed to get post Types")

    })
  }
  getCategoryDisplayName(): string {
    const category = this.categories.find(c => c.categoryId === this.addPosts.categoryId);
    return category ? category.categoryName! : 'Select Category';
  }
  getCategoryDisplayNameForUpdate(): string {
    const category = this.categories.find(c => c.categoryId === this.postToUpdate.categoryId);
    return category ? category.categoryName! : 'Select Category';
  }

  getPostTypeDisplayName(): string {
    const postType = this.postTypes.find(p => p.postStatusId === this.addPosts.postStatusId);
    return postType ? postType.statusName! : 'Select Post Type';
  }
  getPostTypeDisplayNameForUpdate(): string {
    const postType = this.postTypes.find(p => p.postStatusId === this.postToUpdate.postStatusId);
    return postType ? postType.statusName! : 'Select Post Type';
  }
  
  selectCategory(id: number): void {
    this.addPosts.categoryId = id;
  }
  selectCategoryForUpdate(id: number): void {
    this.postToUpdate.categoryId = id;
  }
  clearCategory(): void {
    this.addPosts.categoryId = undefined;
  }
  clearCategoryForUpdate(): void {
    this.postToUpdate.categoryId = undefined;
  }

  selectPostType(id: number): void {
    this.addPosts.postStatusId = id;
  }
  selectPostTypeForUpdate(id: number): void {
    this.postToUpdate.postStatusId = id;
  }
  clearPostType(): void {
    this.addPosts.postStatusId = undefined;
  }
  clearPostTypeForUpdate(): void {
    this.addPosts.postStatusId = undefined;
  }
  isFormValid(): boolean {
    return !!this.addPosts.contant && !!this.addPosts.categoryId && !!this.addPosts.postStatusId;
  }
  isUpdateFormValid(): boolean {
    return !!this.postToUpdate.contant && !!this.postToUpdate.categoryId && !!this.postToUpdate.postStatusId;
  }
  submitPost(): void {
    this.addPosts.userId=this.userId;
    this.homeService.AddPost(this.addPosts).subscribe((resulte:any)=>{
      this.removeImage();
      this.addPosts= new addPostDTO();  

        this.toastr.success("Post added successfully")
      
    },error=>{
      this.toastr.error("Failed to add post")
    })
  }
  UpdatePost(): void {
    this.homeService.UpdatePost(this.postToUpdate).subscribe((resulte:any)=>{

        this.toastr.success("Post Updated successfully")
        this.dialog.closeAll();
    },error=>{
      this.toastr.error("Failed to update post")
    })
  }
  cancel(){
    this.dialog.closeAll();
  }
   timeAgo(dateString: string): string {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7 * 48));

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    } else if (diffInWeeks < 48) {
        return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
    } else {
        return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
    }
}
triggerFileInput(): void {
  this.fileInput.nativeElement.click();
}

selectPhoto(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
    this.addPosts.attachment = file;
    this.postToUpdate.attachment = file;
  }
}


removeImage(): void {
  this.selectedImage = null;
  this.addPosts.attachment = undefined;
  this.postToUpdate.attachment = undefined;
  this.postToUpdate.attachmentPath = "";

  if (this.fileInput.nativeElement) {
    this.fileInput.nativeElement.value = '';
  }
}
}
