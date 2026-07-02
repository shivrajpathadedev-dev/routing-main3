import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Iuser } from 'src/app/models/user';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  usersId!: string;
  isInEditMode: boolean = false;
  edituser!:Iuser
  constructor(
    private _userservice:UserService,
    private _router: Router,
    private _snakbar: SnackbarService,
    private _routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addskillcontrol()
    this.patchUser()
    this.formControl['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formControl['address'].get('current')?.valid) {
          this.formControl['isAddSame'].enable()
        } else {
          this.formControl['isAddSame'].reset()
          this.formControl['isAddSame'].disable()
        }
      })
    this.formControl['isAddSame'].valueChanges
      .subscribe(val => {
        if (val) {
          let currentAdd = this.formControl['address'].get('current')?.value;
          this.formControl['address'].get('permanent')?.patchValue(currentAdd)
          this.formControl['address'].get('permanent')?.disable()
        } else {
          this.formControl['address'].get('permanent')?.reset()
          this.formControl['address'].get('permanent')?.enable()
        }
      })
  }

  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('Candidate'),
      profileDescription: new FormControl(null, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }, [Validators.required]),
      address: new FormGroup({
        current: new FormGroup({
          country: new FormControl('India'),
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          zipcode: new FormControl(null, [Validators.required]),

        }),
        permanent: new FormGroup({
          country: new FormControl('India'),
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          zipcode: new FormControl(null, [Validators.required]),
        })
      }),
      skills: new FormArray([])
    })
  }

  addskillcontrol() {
    if (this.formControl['skills'].valid) {
      let skillControl = new FormControl(null, [Validators.required])
      this.skillsArr.push(skillControl)
    }
  }

  get formControl() {
    return this.userForm.controls
  }

  get skillsArr() {
    return this.formControl['skills'] as FormArray
  }

  // onUsersubmit(){
  //   if(this.userForm.invalid){
  //     this.userForm.markAllAsTouched()
  //     console.log("Form Submitted Successfully");
  //   }else{
  //     let userDetails={...this.userForm.value,
  //       userId:Date.now().toString()
  //     }   
  //        this._usersservice.createusers(userDetails)
  //        .subscribe({
  //         next:data=>{
  //           this.userForm.reset()
  //           this._router.navigate(['/users',userDetails.userId])
  //           this._snakbar.openSuccessSnackbar(data.msg)
  //         },
  //         error:err=>{
  //           this._snakbar.openErrorSnackbar(err.msg)
  //         }
  //        })
  //   }
  // }
  onUsersubmit() {
    if (this.userForm.invalid) {
      console.log(this.userForm);
      this.userForm.markAllAsTouched();
      return;
    }
    let userDetails = {
      ...this.userForm.getRawValue(),
      userId: Date.now().toString()
    };
    this._userservice.createUser(userDetails).subscribe({
      next: data => {
        console.log(data);
        this.userForm.reset()
        this._router.navigate(['/users'])
        this._snakbar.openSuccesssnackbar(data.msg)
      },
      error: err => {
        this._snakbar.openErrorsnackbar(err.msg)
      }
    });
  }

  patchUser() {
    this._routes.params.subscribe((params:Params) => {
      this.usersId = params['uid'];
      if (this.usersId) {
        this.isInEditMode = true;
        this._userservice.fetchuserId(this.usersId)
          .subscribe({
            next: data => {
             this.edituser = data
             this.userForm.patchValue({...this.edituser})
            },
            error: err => {
              console.log(err.msg);
            }
          })
      }
    })
  }

  onUpdateuser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
      return;
    } else {
      let upd_obj = {
        ...this.userForm.value,
        userId: this.usersId
      }
      this._userservice.updateuser(upd_obj)
        .subscribe({
          next: data => {
            this.isInEditMode = false
            this._router.navigate(['/users', upd_obj.userId])
            this._snakbar.openSuccesssnackbar(data.msg)
          },
          error: err => {
            this._snakbar.openErrorsnackbar(err.msg)
          }
        })
    }
  }
}