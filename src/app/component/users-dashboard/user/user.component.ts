import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
 userIds!: string
  userDetails!:Iuser
  constructor(
    private _routers: ActivatedRoute,
    private _usersservice: UserService,
    private _matdilaog: MatDialog,
    private _router: Router,
    private _snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
   this.fetchuserdata()
  }

  fetchuserdata(){
     this._routers.params.subscribe(params => {
      this.userIds = params['uid'];
      if(this.userIds){
        this._usersservice.fetchuserId(this.userIds)
        .subscribe({
          next: data => {
            this.userDetails = data
          },
          error: err => {
            console.log(err);
          }
        })
      }
    })
  }

  onRemoveUser() {
    let matconfig = new MatDialogConfig()
    matconfig.width = '450px',
      matconfig.disableClose = true,
      matconfig.data = `Are yo sure do you want to remove this user!`
    let config = this._matdilaog.open(GetConfirmComponent, matconfig)
    config.afterClosed()
      .subscribe(params => {
        if (params) {
          this._usersservice.removeUser(this.userIds)
            .subscribe({
              next: data => {
                this._usersservice.fetchuserdata();
                this._snackbar.openSuccesssnackbar(data.msg)
                const user = this._usersservice.UsersDetails;
                if (user.length > 0) {
                  this._router.navigate(['/users', user[0].userId]);
                } else {
                  this._router.navigate(['/users']);
                }
              }
            })
        }
      })
  }
}