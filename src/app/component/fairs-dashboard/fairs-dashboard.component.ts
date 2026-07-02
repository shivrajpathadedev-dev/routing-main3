import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFairs } from 'src/app/models/fairs';
import { FairService } from 'src/app/services/fair.service';

@Component({
  selector: 'app-fairs-dashboard',
  templateUrl: './fairs-dashboard.component.html',
  styleUrls: ['./fairs-dashboard.component.scss']
})
export class FairsDashboardComponent implements OnInit {
fairsArr:Array<IFairs>=[]
  constructor(private _fairservice:FairService,private _router:Router

  ) { }

  ngOnInit(): void {
this._fairservice.fetchfairsData()
   .subscribe({
    next:data=>{
      this.fairsArr=data;
      this._router.navigate(['/fairs',this.fairsArr[0].fairId])
    },
    error:err=>{
      console.log(err); 
    }
   })
  }
}