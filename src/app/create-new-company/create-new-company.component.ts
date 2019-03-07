import { Component, OnInit } from '@angular/core'; 
import { CompaniesService } from '../services/companies.service';
import { FormGroup, FormBuilder, FormsModule, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'create-new-company',
  templateUrl: './create-new-company.component.html',
  styleUrls: ['./create-new-company.component.css']
})
export class CreateNewCompanyComponent {
   invalidForm = false; 
   companyAdded = false;
  form = new FormGroup({
    name: new FormControl('',[
                              Validators.required,
                              Validators.minLength(3)]),
        address: new FormControl('', Validators.required), 
        revenue: new FormControl(), 
        phone:   new FormControl('', [
                                      Validators.required,
                                      Validators.minLength(10)])
  });
  constructor(private service:CompaniesService, private router:Router) {}

  get name(){ return this.form.get('name');}
  get address(){ return this.form.get('address');} 
  get phone(){ return this.form.get('phone');}

  createCompany(){ 
    if(this.form.invalid){
      this.invalidForm = true;
    }
    else{
      this.invalidForm = false;
      let company:any = this.form.value;
      this.service.postCompany(company)
      .subscribe(
        postCompany => this.onCompanyAdded(postCompany)); 
    }
  }

  onCompanyAdded(postCompany:any){
    this.router.navigate(['/company', postCompany._id])
    this.companyAdded = true;
    setTimeout(()=>{ this.companyAdded = false;},2000);
  }


}
