import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent implements OnInit {
userArr:Array<Iuser>=[]
  constructor(
    private _userservice:UserService,
    private _router:Router,
    private _routes:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getuser()
  }

  getuser(){
    this._userservice.fetchuserdata()
    .subscribe({
      next:data=>{
        this.userArr=data
        this._router.navigate(['/users',this.userArr[0].userId])
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
