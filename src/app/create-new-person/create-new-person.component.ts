import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { PeopleService } from '../services/people.service';
import { CompaniesService } from '../services/companies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'create-new-person',
  templateUrl: './create-new-person.component.html',
  styleUrls: ['./create-new-person.component.css']
})
export class CreateNewPersonComponent implements OnInit {

  companies_List:any=[];
  invalidForm = false; 
  personAddedSuccessfully=false;
  form = new FormGroup({
        name: new FormControl('',[
                              Validators.required,
                              Validators.minLength(3)]),
        email: new FormControl('', [
                                    Validators.required,
                                    Validators.email]),  
        companyId:   new FormControl('', Validators.required)
  });
  constructor(private peopleService:PeopleService, 
              private companyService:CompaniesService,
              private router:Router) { }

  ngOnInit() { 
    this.companyService.getCompanies()
        .subscribe(companies => this.companies_List = companies)
  }
  get name(){ return this.form.get('name');}
  get email(){ return this.form.get('email');} 
  get companyId(){ return this.form.get('companyId');}

  addPerson(){ 
    if(this.form.invalid){
      this.invalidForm = true;
    }
    else{
      let person = this.form.value;  
      this.peopleService.postPerson(person)
      .subscribe(personAdded=> this.onPersonAdded(personAdded)); 
    }
  }
  onPersonAdded(personAdded:any){
    this.router.navigate(['/people', personAdded._id]);
    this.personAddedSuccessfully = true;
    setTimeout(()=>{ this.personAddedSuccessfully = false;},2000);
  }

}
