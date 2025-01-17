import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:7011/api';

  constructor(private http: HttpClient) { }

  Users: any = [];
  getAllUsers() {
    this.http.get(`${this.apiUrl}/User/GetUsersData`).subscribe(result => {
      this.Users = result;
      console.log(this.Users)
    }, err => {
    })
  }

  blockedUser(body: any) {
    this.http.put(`${this.apiUrl}/User/BlockedUser`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Update!',
        text: body.isBlocked ? 'The user has been blocked successfully.' : 'The user has been unblocked successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllUsers(); 
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating the user. Please try again.',
        confirmButtonText: 'OK'
      });
    });
  }

  skillsCategory: any = [];
  getAllskillsCategory() {
    this.http.get(`${this.apiUrl}/SkillsCategory`).subscribe(result => {
      this.skillsCategory = result;
      console.log(this.skillsCategory)
    }, err => {
    })
  }


  CreateskillsCategory(body: any) {
    this.http.post(`${this.apiUrl}/SkillsCategory/CreateSkillsCategory`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Create Skill Category!',
        text: 'The Skill Category has been Created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllskillsCategory();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while created the Skill category. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }
  EditSkillsCategory(body: any) {
    this.http.put(`${this.apiUrl}/SkillsCategory/UpdateSkillsCategory`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Update Skill Category!',
        text: 'The Skill Category has been Updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllskillsCategory();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while Updated the Skill category. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeleteskillsCategories(id: number) {
    this.http.delete(`${this.apiUrl}/SkillsCategory/DeleteSkillsCategory/${id}`).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The category has been deleted successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllskillsCategory();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the category. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
  
  skills: any = [];
  getAllSkills(id: number) {
    this.http.get(`${this.apiUrl}/Skill/GetSkillsByCategoryId/${id}`).subscribe(
      (result: any) => {
        this.skills = result;
        console.log(this.skills);
      },
      (err) => {
        console.error("Error fetching skills:", err);
      }
    );
  }
  
  Createskills(body: any) {
    this.http.post(`${this.apiUrl}/Skill/CreateSkill`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Create Skill!',
        text: 'The Skill has been Created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllSkills(body.SkillCategoryId);
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while created the Skill. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  EditSkill(body: any) {
    this.http.put(`${this.apiUrl}/Skill/UpdateSkill`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Update Skill !',
        text: 'The Skill  has been Updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllSkills(body.SkillCategoryId);
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while Updated the Skill. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  Deleteskill(id: number, skillCategoryId:number) {
    this.http.delete(`${this.apiUrl}/Skill/DeleteSkill/${id}`).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The skill has been deleted successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllSkills(skillCategoryId);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the skill. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
  contactUs: any = [];
  getAllContactUs() {
    this.http.get(`${this.apiUrl}/Contactus`).subscribe(
      (result: any) => {
        this.contactUs = result;
      },
      (err) => {
        console.error("Error fetching contact us:", err);
      }
    );
  }
  DeleteContactUs(id: number) {
    this.http.delete(`${this.apiUrl}/Contactus/DeleteContactus/${id}`).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The contact has been deleted successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllContactUs();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the contact. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  Complain: any = [];
  getAllComplain() {
    this.http.get(`${this.apiUrl}/Complain`).subscribe(
      (result: any) => {
        this.Complain = result;
        console.log(this.Complain,"ccc");
      },
      (err) => {
        console.error("Error fetching Complain:", err);
      }
    );
  }

  UpdateComplainStatus(body: any) {
    this.http.put(`${this.apiUrl}/Complain/UpdateComplainStatus`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Update Complain Status!',
        text: 'The Complain Status has been Updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllComplain();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while Updated the Complain Status. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeleteComplain(id: number) {
    this.http.delete(`${this.apiUrl}/Complain/DeleteComplain/${id}`).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The Complain has been deleted successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllComplain();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the Complain. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  postCategory: any = [];
  getAllPostCategory() {
    this.http.get(`${this.apiUrl}/Category`).subscribe(result => {
      this.postCategory = result;
      console.log(this.postCategory)
    }, err => {
    })
  }


  CreatePostCategory(body: any) {
    this.http.post(`${this.apiUrl}/Category/CreateCategory`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Create Post Category!',
        text: 'The Post Category has been Created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllPostCategory();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while created the Post category. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }
  EditPostCategory(body: any) {
    this.http.put(`${this.apiUrl}/Category/UpdateCategory`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Update Post Category!',
        text: 'The Post Category has been Updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllPostCategory();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while Updated the Post category. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeletePostCategories(id: number) {
    this.http.delete(`${this.apiUrl}/Category/DeleteCategory/${id}`).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The category has been deleted successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllPostCategory();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the category. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  postStatus: any = [];
  getAllPostStatus() {
    this.http.get(`${this.apiUrl}/PostStatus`).subscribe(result => {
      this.postStatus = result;
      console.log(this.postStatus)
    }, err => {
    })
  }


  CreatePostStatus(body: any) {
    this.http.post(`${this.apiUrl}/PostStatus/CreatePostStatus`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Create Post Status!',
        text: 'The Post Status has been Created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllPostStatus();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while created the Post Status. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }
  EditPostStatus(body: any) {
    this.http.put(`${this.apiUrl}/PostStatus/UpdatePostStatus`, body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Update Post Status!',
        text: 'The Post Status has been Updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllPostStatus();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while Updated the Post Status. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeletePostStatus(id: number) {
    this.http.delete(`${this.apiUrl}/PostStatus/DeletePostStatus/${id}`).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The Post Status has been deleted successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllPostStatus();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the Post Status. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
