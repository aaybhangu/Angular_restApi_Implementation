import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from '../services/companies.service';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'company-people',
  templateUrl: './company-people.component.html',
  styleUrls: ['./company-people.component.css']
})
export class CompanyPeopleComponent implements OnInit {
 
  @Input() company:any;
  personDetail:any={};
  companies_List:any=[];
  editing=false; 
  isDeleted = false;
  constructor(private companyService:CompaniesService,
              private peopleService:PeopleService, 
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.route.paramMap
         .subscribe(params=>{
           let personId = params.get('id'); 
          this.peopleService.getPerson(personId)
          .subscribe(person=>this.personDetail = person);
      });
  }
  editRecord(){
    this.editing =true;
    this.companyService.getCompanies()
    .subscribe(companies => this.companies_List = companies)
  }
  updatePerson(f){ 
    this.editing =false;
    let person = f.value;  
    this.peopleService.updatePerson(person,this.personDetail.companyId)
    .subscribe(personAdded=>console.log(personAdded)) 
  }
  deleteRecord(){
    this.peopleService.deletePerson(this.personDetail._id)
    .subscribe(personDeleted=> this.onRecordDeleted());
  }

  onRecordDeleted(){
   this.isDeleted = true;
   setTimeout(()=>{ 
     this.isDeleted = false;
     this.router.navigate(['']);},
     2000);
  }
}
