import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import {Observable} from 'rxjs'; 
import {throwError} from 'rxjs';
import {catchError,map} from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-errors';
import { BadInput } from '../common/bad-input';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private url='http://localhost:3001/person/';
  constructor(private http:Http) { }
 
  getPerson(id:string){
    return this.http.get(this.url+''+id)
    .pipe(
      map(response => response.json()),
      catchError(this.handleError)
    ) 
  }
  postPerson(person:any){
    return this.http.post(this.url,person)
    .pipe(
      map(response => response.json()),
      catchError(this.handleError)
    ) 
  }
  updatePerson(person:any,companyId:string){
    return this.http.put(this.url,person,companyId)
    .pipe(
      map(response => response.json()),
      catchError(this.handleError)
    ) 
  }
  deletePerson(id:string){
    return this.http.delete(this.url+''+id)
    .pipe(
      map(response => response.json()),
      catchError(this.handleError)
    ) 
  }
  private handleError(error:Response){
    console.log('Error:  '+error);
    if(error.status === 400)
        return throwError(new BadInput(error.json()));
    if(error.status === 404)
        return throwError(new NotFoundError());
    return throwError(new AppError(error));
  }
}
