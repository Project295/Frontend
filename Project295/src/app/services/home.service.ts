import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7011/api';

  getUserPersonalData(userId: number): Observable<any> {
    const params = new HttpParams().set("userId", userId.toString())
    return this.http.get(`${this.apiUrl}/User/GetUserProfile`, { params })
  }
  // getProfileCounts(userId : number):Observable<any>{
  //   const params = new HttpParams().set("userId",userId.toString())
  //   return this.http.get(`${this.apiUrl}/User/ProfileCounts`, { params })
  // }
  getUserPosts(userId: number): Observable<any> {
    const params = new HttpParams().set("userId", userId.toString())
    return this.http.get(`${this.apiUrl}/Post/GetAllUserPosts`, { params })
  }
  deletePost(postId: number): Observable<any> {
    const params = new HttpParams().set("postId", postId.toString())
    return this.http.delete(`${this.apiUrl}/Post/DeletePost`, { params })
  }
  AddPost(post: any): Observable<any> {
    const formData = new FormData();
    formData.append('contant', post.contant);
    formData.append('categoryId', post.categoryId.toString());
    formData.append('userId', post.userId.toString());
    formData.append('postStatusId', post.postStatusId.toString());
    const file = post.attachment;
    if (file) {
      formData.append('attachment', file, file.name);
    }
    return this.http.post(`${this.apiUrl}/Post/AddPost`, formData);
  }

  getPostCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Category`)
  }
  getPostStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/PostStatus`)
  }
  UpdatePost(post: any): Observable<any> {
    const formData = new FormData();
    formData.append('contant', post.contant);
    formData.append('categoryId', post.categoryId);
    formData.append('userId', post.userId);
    formData.append('postStatusId', post.postStatusId);
    formData.append('postId', post.postId);
    formData.append('attachmentId', post.attachmentId);
    formData.append('attachmentPath', post.attachmentPath);
    const file = post.attachment;
    if (file) {
      formData.append('attachment', file, file.name);
    }
    return this.http.put(`${this.apiUrl}/Post/UpdatePost`, formData);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/User/UpdateUser`, userData);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Post`)
  }

  addComplain(complaintDescription: string, postId: number, userId: number): Observable<any> {
    const params = new HttpParams()
      .set('complaintDescription', complaintDescription)
      .set('postId', postId.toString())
      .set('userId', userId.toString());

    return this.http.post(`${this.apiUrl}/Complain/CreateComplain`, null, { params });
  }

  updateUserPassword(userData: any, userId: any): Observable<any> {
    const payload = {
      oldPassword: userData.oldPassword,
      newPassword: userData.newPassword,
      userId: userId
    };

    return this.http.put(`${this.apiUrl}/Login/UpdatePassword`, payload);
  }

  updateUserProfile ( userProfileForm : any, userId : any , profilePic : any,coverPic : any ): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('firstName', userProfileForm.firstName);
    formData.append('lastName', userProfileForm.lastName);
    formData.append('email', userProfileForm.email);
    formData.append('phoneNumber', userProfileForm.phoneNumber);
    formData.append('jobTitle', userProfileForm.jobTitle);
    formData.append('company', userProfileForm.company);
    formData.append('address', userProfileForm.address);
    formData.append('brief', userProfileForm.brief);

    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    if (coverPic) {
      formData.append('coverPic', coverPic);
    }

    return this.http.put(`${this.apiUrl}/User/UpdateUserData`, formData);
  
  }

  addContact(message : string , name : string , email : string) : Observable<any>{
    const body = { name, email, message };
    return this.http.post(`${this.apiUrl}/Contactus/CreateContactus`, body);
  }


  UserExperienceById: any = [];
    getAllUserExperienceById(userId:number) {
      this.http.get(`${this.apiUrl}/UserExperience/GetUserExperienceById/${userId}`).subscribe(result => {
        this.UserExperienceById = result;
        console.log(this.UserExperienceById)
      }, err => {
        console.log(err);
      })
    }
  
  
    CreateUserExperience(body: any ,id:number) {
      this.http.post(`${this.apiUrl}/UserExperience/CreateUserExperience`, body).subscribe((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Create User Experience!',
          text: 'The User Experience has been Created successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllUserExperienceById(id);
      }, err => {
  
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while created the User Experience. Please try again.',
          confirmButtonText: 'OK'
        });
      })
    }
    UpdateUserExperience(body: any,id:number) {
      this.http.put(`${this.apiUrl}/UserExperience/UpdateUserExperience`, body).subscribe((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Update User Experience!',
          text: 'The User Experience has been Updated successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllUserExperienceById(id);
      }, err => {
  
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while Updated the User Experience. Please try again.',
          confirmButtonText: 'OK'
        });
      })
    }
  
    DeleteUserExperience(userExperienceId: number,userId:number) {
      this.http.delete(`${this.apiUrl}/UserExperience/DeleteUserExperience/${userExperienceId}`).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The User Experience has been deleted successfully.',
            showConfirmButton: false,
            timer: 2000
          });
          this.getAllUserExperienceById(userId);
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while deleting the User Experience. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  

    UserSkillByUserId: any = [];
    GetUserSkillByUserId(userId:number) {
      this.http.get(`${this.apiUrl}/UserSkill/GetUserSkillByUserId/${userId}`).subscribe(result => {
        this.UserSkillByUserId = result;
        console.log(this.UserSkillByUserId)
      }, err => {
        console.log(err);
      })
    }

    UserProjectById: any = [];
    GetUserProjectById(userId:number) {
      this.http.get(`${this.apiUrl}/UserProject/GetUserProjectById/${userId}`).subscribe(result => {
        this.UserProjectById = result;
        console.log(this.UserProjectById)
      }, err => {
        console.log(err);
      })
    }
    CreateUserProject(body: any ,id:number) {
      this.http.post(`${this.apiUrl}/UserProject/CreateUserProject`, body).subscribe((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Create User Project!',
          text: 'The User Project has been Created successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.GetUserProjectById(id);
      }, err => {
  
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while created the User Project. Please try again.',
          confirmButtonText: 'OK'
        });
      })
    }
    UpdateUserProject(body: any,id:number) {
      this.http.put(`${this.apiUrl}/UserProject/UpdateUserProject`, body).subscribe((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Update User Project!',
          text: 'The User Project has been Updated successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.GetUserProjectById(id);
      }, err => {
  
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while Updated the User Project. Please try again.',
          confirmButtonText: 'OK'
        });
      })
    }
  
    DeleteUserProject(userProjectId: number,userId:number) {
      this.http.delete(`${this.apiUrl}/UserProject/DeleteUserProject/${userProjectId}`).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The User Project has been deleted successfully.',
            showConfirmButton: false,
            timer: 2000
          });
          this.GetUserProjectById(userId);
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while deleting the User Project. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
    SkillsCategory: any = [];
    GetAllSkillsCategory() {
      this.http.get(`${this.apiUrl}/SkillsCategory`).subscribe(result => {
        this.SkillsCategory = result;
      }, err => {
        console.log(err);
      })
    }
    SkillsByCategoryId: any = [];
    GetSkillsByCategoryId(id:number) {
      this.http.get(`${this.apiUrl}/Skill/GetSkillsByCategoryId/${id}`).subscribe(result => {
        this.SkillsByCategoryId = result;
      }, err => {
        console.log(err);
      })
    }

    CreateUserSkill(body: any ,id:number) {
      this.http.post(`${this.apiUrl}/UserSkill/CreateUserSkill`, body).subscribe((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Create User Skill!',
          text: 'The User Skill has been Created successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.GetUserSkillByUserId(id);
      }, err => {
  
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while created the User Skill. Please try again.',
          confirmButtonText: 'OK'
        });
      })
    }
  
    DeleteUserSkill(userSkillId: number,userId:number) {
      this.http.delete(`${this.apiUrl}/UserSkill/DeleteUserSkill/${userSkillId}`).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The User Skill has been deleted successfully.',
            showConfirmButton: false,
            timer: 2000
          });
          this.GetUserSkillByUserId(userId);
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while deleting the User Skill. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    }

    UserEducationById: any = [];
    GetUserEducationById(userId:number) {
      this.http.get(`${this.apiUrl}/UserExperience/GetUserEducationById/${userId}`).subscribe(result => {
        this.UserEducationById = result;
      }, err => {
        console.log(err);
      })
    }

    CreateUserEducation(body: any ,id:number) {
      this.http.post(`${this.apiUrl}/UserExperience/CreateUserEducation`, body).subscribe((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Create User Education!',
          text: 'The User Education has been Created successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.GetUserEducationById(id);
      }, err => {
  
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while created the User Education. Please try again.',
          confirmButtonText: 'OK'
        });
      })
    }
    UpdateUserEducation(body: any,id:number) {
      this.http.put(`${this.apiUrl}/UserExperience/UpdateUserEducation`, body).subscribe((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Update User Education!',
          text: 'The User Education has been Updated successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.GetUserEducationById(id);
      }, err => {
  
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while Updated the User Education. Please try again.',
          confirmButtonText: 'OK'
        });
      })
    }
  
    DeleteUserEducation(userExperienceId: number,userId:number) {
      this.http.delete(`${this.apiUrl}/UserExperience/DeleteUserEducation/${userExperienceId}`).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The User Education has been deleted successfully.',
            showConfirmButton: false,
            timer: 2000
          });
          this.GetUserEducationById(userId);
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while deleting the User Education. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
}

