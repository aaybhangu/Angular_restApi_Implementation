import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompaniesService } from '../services/companies.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-errors';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit{
  companies_List: any[];  
  constructor(private service:CompaniesService) { }
  ngOnInit(){
    this.service.getCompanies()
    .subscribe(
      companies => {
        this.companies_List = companies;
        this.companies_List["hide_People_List"] = true; 
      });
  }
  get_People_List(company:any){ 
    company.hide_People_List = !company.hide_People_List;
  }
}
