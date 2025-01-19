import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { userProfile } from '../dto/userProfileDTO';
import { ToastrService } from 'ngx-toastr';
import { postCatigories } from '../dto/postCategoryDTO';
import { userPosts } from '../dto/userPostsDTO';
import { UpdatePostDTO } from '../dto/UpdatePostDTO';
import { postStatusDTO } from '../dto/postTypeDTO';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otherprofile',
  templateUrl: './otherprofile.component.html',
  styleUrls: ['./otherprofile.component.css']
})
export class OtherprofileComponent {
  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
     private router: Router

  ) { }
  complaintDescription: string = '';
  ReportedPostId: number =0;


  userId!: number;
  userProfile: userProfile | null = null;
  postsCount: number = 0;
  userPosts: userPosts[] = [];
  postToUpdate!: UpdatePostDTO;
  categories: postCatigories[] = []
  postTypes: postStatusDTO[] = []
  @ViewChild('reportTemplate') reportTemplate!: TemplateRef<any>;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      this.getUserPersonalData()
      this.getUserPosts()
      this.getPostCategories();
      this.getPostStatus()
    });
  }
  getUserPersonalData() {
    this.homeService.getUserPersonalData(this.userId!).subscribe((result: any) => {
      if (result) {
        this.userProfile = result
      }
    }, error => {
      this.toastr.error("Something wrong in user data please refresh")
    })
  }
  getUserPosts() {
    this.homeService.getUserPosts(this.userId!).subscribe((result: any) => {
      if (result) {
        this.userPosts = result.posts;
        this.postsCount = result.postsCounts
      }
    }, error => {
      this.toastr.error("Something wrong in user data please refresh")
    })
  }
  getPostCategories() {
    this.homeService.getPostCategories().subscribe((result: any) => {
      if (result) {
        this.categories = result;
      }
    }, error => {
      this.toastr.error("Failed to get categories")

    })
  }
  getPostStatus() {
    this.homeService.getPostStatus().subscribe((result: any) => {
      if (result) {
        this.postTypes = result;
      }
    }, error => {
      this.toastr.error("Failed to get post Types")

    })
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
  openReport(postId : number){
    this.ReportedPostId = postId;
    const dialogRef = this.dialog.open(this.reportTemplate, {
      width: '400px',
    });
  }
  cancelReport() {
    this.ReportedPostId = 0;
    this.complaintDescription = ''; 
    this.dialog.closeAll();
  }
  sendReport() {
    if (this.complaintDescription.trim()) {
      {
        this.homeService.addComplain(this.complaintDescription.trim(), this.ReportedPostId, this.userId).subscribe((resulte: any) => {
          this.toastr.success('Complain added successfully!')
          this.dialog.closeAll();
        }, error => {
          this.toastr.error('Something wronge!')

        })
      }
    } else {
      alert('Please enter a description for your complaint.');
    }
  }
}

goToResume(){
  this.router.navigate(['resume/',this.userId]);

}
}
