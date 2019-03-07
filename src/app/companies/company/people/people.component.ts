import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @Input() company:any;
  people_List:any=[];
  constructor(private service:CompaniesService) { }

  ngOnInit() {   
       let id = this.company._id;
        this.service.getCompanyPeople(id) 
        .subscribe(people => this.people_List = people);
  }

}
