import { Injectable } from '@angular/core';
import {Http} from "@angular/http"
import {User} from "./user"
 import {Bucket} from "./Bucket"
import "rxjs"
@Injectable()


export class UserService {

 constructor(private http: Http) { }

  login (user:User){
   return this.http.post("/login",user)
      .map(data => data.json())
      .toPromise()
 }
getAllBuckets(){
   return this.http.get("/buckets")
      .map(data => data.json())
      .toPromise()
}
  get_logged_in_user(){
    return this.http.get("/get_logged_in_user")
            .map(data => data.json())
            .toPromise()
  }

  get_all_users(){
    return this.http.get("/get_all_users")
            .map(data => data.json())
            .toPromise()
  }
get_all_users_wo_user(){
    return this.http.get("/get_all_users_wo_user")
            .map(data => data.json())
            .toPromise()
  }

  newBucket(bucket:Bucket){
   return this.http.post("/newBucket",bucket)
            .map(data => data.json())
            .toPromise()
  }
}
 