import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Http } from '@angular/http';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
 @Input() company:any={};
  companyDetail:any={};
  editing=false;
  showPeople=false;
  constructor(private route:ActivatedRoute, private Service:CompaniesService) {
   }

  ngOnInit() {
    this.route.paramMap
         .subscribe(params=>{
           console.log(params);
           let companyId = params.get('companyId');
           console.log(companyId); 
             this.Service.getCompanyByID(companyId)
                .subscribe(company=> this.companyDetail = company) 
         })
  } 
  editDetail(){
    this.editing=true;
  }
  updateDetail(f){
    let formData = f.value;
    let id = this.companyDetail._id;
    this.Service.putCompany(formData,id)
    .subscribe(updatedCompany => console.log(updatedCompany))
  }
}
