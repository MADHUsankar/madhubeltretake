import { Component, OnInit } from '@angular/core';
import {UserService} from "./../user.service"
import {User} from "./../user"
import {Router} from "@angular/router" 
import {Bucket} from "./../Bucket"


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
constructor(private user_service : UserService, private router:Router) { }
allBuckets
current_user: User
allusers:Array<User>
newBucket:Bucket = new Bucket()
alluserswocurrent:Array<User>

  ngOnInit() {
    this.getAllBuckets()
    this.get_logged_in_user()
    this.get_all_users_wo_user()
  }

   getAllBuckets(){
    console.log("getAllBuckets attempt")
    this.user_service.getAllBuckets()
   .then((buckets) => { this.allBuckets = buckets; })
    .catch((err) => { console.log(err); });
  }

  get_logged_in_user(){
  this.user_service.get_logged_in_user()
      .then(data => {
        if(data){
          this.current_user = data
         
        } 
      })
      .catch(err => console.log(err))
}

get_all_users_wo_user(){
      console.log('calling')
  this.user_service. get_all_users_wo_user()
      .then(data => {
        if(data){
          console.log('allusers if ')
          this.alluserswocurrent = data
            console.log('allusers Pass !',this.alluserswocurrent)
        } 
      })
      .catch(err => console.log(err))
}

createNewBucket(){
   console.log("createNewBucket attempt", this.newBucket)
    this.user_service.newBucket(this.newBucket)
    .then(() => {console.log("createNewBucket success in componnent");})
    .catch(err => {console.log("createNewBucket fail component", err);})
  }
  }
