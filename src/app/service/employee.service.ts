import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient :HttpClient) { }

  baseurl = 'http://localhost:5009/api/employee';

  GetEmployee() : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.baseurl)
  }

   CreateEmployee(emp:Employee):Observable<Employee>{
    emp.id ="00000000-0000-0000-0000-000000000000";
     return this.httpClient.post<Employee>(this.baseurl,emp)
   }

   UpdateEmployee(emp:Employee):Observable<Employee>{
    return this.httpClient.put<Employee>(this.baseurl + '/'+ emp.id,emp)
   }
   DeleteEmployee(id:string):Observable<Employee>{
    return this.httpClient.delete<Employee>(this.baseurl + '/'+id)
   }
}

