import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import {Observable} from 'rxjs';
import {catchError,map} from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-errors';
import { BadInput } from '../common/bad-input';
@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
 private url='http://localhost:3001/Companies/';
  constructor(private http:Http) { }
 
  getCompanies(){
    return this.http.get(this.url)
    .pipe(
      map(response => response.json()),
      catchError(this.handleError)
    ) 
  }
  postCompany(company:any){
    return this.http.post(this.url,company)
    .pipe(
      map(response => response.json()),
      catchError(this.handleError)
    )
  }
  putCompany(company:any,id:string){
    return this.http.put(this.url,company,id)
    .pipe(
      map(response => response.json()),
      catchError(this.handleError)
    )
  }
  getCompanyByID(id:string){
    return this.http.get(this.url+''+id)
    .pipe(
      map(response => response.json()),
      catchError(this.handleError)
    )
  }

  getCompanyPeople(id:string){
    return this.http.get(this.url+''+id+'/people')
    .pipe(
      map(response => response.json()),
      catchError(this.handleError)
    )
  }

  private handleError(error:Response){
    if(error.status === 400)
        return Observable.throw(new BadInput(error.json()));
    if(error.status === 404)
        return Observable.throw(new NotFoundError());
    return Observable.throw(new AppError(error));
  }
}
