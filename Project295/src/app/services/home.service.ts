import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userProfile } from '../dto/userProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7011/api';

  getUserPersonalData(userId : number):Observable<any>{
    const params = new HttpParams().set("userId",userId.toString())
    return this.http.get(`${this.apiUrl}/User/GetUserProfile`, { params })
  }
  // getProfileCounts(userId : number):Observable<any>{
  //   const params = new HttpParams().set("userId",userId.toString())
  //   return this.http.get(`${this.apiUrl}/User/ProfileCounts`, { params })
  // }
  getUserPosts(userId : number):Observable<any>{
    const params = new HttpParams().set("userId",userId.toString())
    return this.http.get(`${this.apiUrl}/Post/GetAllUserPosts`, { params })
  }
  deletePost(postId : number):Observable<any>{
    const params = new HttpParams().set("postId",postId.toString())
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
  
  getPostCategories():Observable<any>{
    return this.http.get(`${this.apiUrl}/Category`)
  }
  getPostStatus():Observable<any>{
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
}
