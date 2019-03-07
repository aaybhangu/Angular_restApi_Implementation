import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CreateNewCompanyComponent } from './create-new-company/create-new-company.component';
import { CreateNewPersonComponent } from './create-new-person/create-new-person.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyPeopleComponent } from './company-people/company-people.component';
import { CompanyComponent } from './companies/company/company.component';
import { PeopleComponent } from './companies/company/people/people.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CompaniesService } from './services/companies.service';
import { PeopleService } from './services/people.service';
import { AppErrorHandler } from './common/app-error-handler'; 

@NgModule({
  declarations: [
    AppComponent,
    CreateNewCompanyComponent,
    CreateNewPersonComponent,
    CompaniesComponent,
    CompanyPeopleComponent,
    CompanyComponent,
    PeopleComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component:CompaniesComponent
      }, 
      {
        path:'company/:companyId',
        component:CompanyComponent
      },
      {
        path:'people/:id',
        component:CompanyPeopleComponent
      },
      {
        path:'**',
        component:NotfoundComponent
      }
    ])
  ],
  providers: [
    CompaniesService,
    PeopleService,
    {provide:ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
