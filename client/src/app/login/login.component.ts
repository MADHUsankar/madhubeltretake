import { Component, OnInit } from '@angular/core';
import {UserService} from "./../user.service"
import {User} from "./../user"
import {Router} from "@angular/router" 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login_user = new User
current_user:User
 
login_error = {status:false, message:{}};
 constructor(private user_service : UserService, private router:Router) { }
  ngOnInit() {}

    login(){
    console.log("login attempt", this.login_user)
    this.user_service.login(this.login_user)
    .then(() => {console.log("login success in componnent"); this.router.navigate(['dashboard'])})
    .catch(err => {console.log("login fail component", err); this.login_error.status = true; this.login_error.message=err})
  }

}
