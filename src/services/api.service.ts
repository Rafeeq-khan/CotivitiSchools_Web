import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpResponse} from '@angular/common/http';
import { Iskill } from 'src/app/models/skillsType';
import { Isubskills } from 'src/app/models/subskillsType';
import { ISkillContentsType } from 'src/app/models/skillContentsType ';
import { IUpdatesType } from 'src/app/models/updateContentsType';
import { Iregister } from 'src/app/models/registerType';
import { Iuser } from '../app/models/user';
import { HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { skillupdate } from 'src/app/models/updateSkillsType';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType' : 'text'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private handleError(error: HttpErrorResponse):Observable<any> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(private http:HttpClient) { }

  getskills(id:number){
    return this.http.get<Array<Iskill>>(`https://localhost:44317/api/categories/${id}/skills`);
  }

  getSubskills(id:number){
    return this.http.get<Array<Isubskills>>(`https://localhost:44317/api/skills/${id}`);
  }
  getSkillContent(skillId:number){
    return this.http.get<Array<ISkillContentsType>>(`https://localhost:44317/api/skills/content/${skillId}`);
  }

  updateSkillContent(id: number, user: string, contents: IUpdatesType) {
    console.log(id, user, contents);
    return this.http.put('https://localhost:44317/api/Admin/update?id=' + id, contents, {responseType:'text'}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateSSkills(sid:string,ssname:string,suser:string){
    var modSkills:skillupdate = {
      SkillId :sid,
      SkillName : ssname,
      ModifiedBy : suser
    };
    console.log(modSkills);
    return this.http.put('https://localhost:44317/api/Admin/update/skill?id=' + sid, modSkills, {responseType:'text'}).pipe(
      catchError(err => this.handleError(err))
    );

  }


  /*  var SkillId: number = contents.SkillId;
  var SkillContentId: number = contents.killContentId;
  var SkillContents: string = contents.skillContents;
  var ImagesLink: string = contents.imagesLink;
  var VideosLink: string = contents.videosLink;
  var ModifiedBy: string = contents.modifiedBy;*/
   // return this.http.put('https://localhost:44317/api/Admin/update?id=' + id + '&user=' + user + '&contents=' + contents+'', { responseType: 'json'  });
  registerUser(Email:string,Firstname:string,Lastname:string,Password:string){
    return this.http.post(`https://localhost:44317/api/Register/adduser`,{Email,Firstname,Lastname,Password},
    { responseType: 'text' }
  );
  }
  registerTest(){
    return this.http.post(`https://localhost:44317/api/Register/add`,null,
    { responseType: 'text' }
  ).subscribe(res=>
    {

      console.log(res);
    });}


}
