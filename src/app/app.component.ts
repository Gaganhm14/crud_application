import { Component, NgModule, OnInit } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { Employee } from './Models/employee';
import {FormBuilder,FormGroup} from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  Employeeary: Employee[] = [];
  Employeeformgroup: FormGroup;
  formBuilder: any;
  constructor(private empservice: EmployeeService, private fb: FormBuilder) {
    this.Employeeformgroup = this.fb.group({
      id: [''],
      name: [''],
      mobileNo: [''],
      emailID: ['']
    });
  }

  searchText: any;
  ngOnInit(): void {
    this.getemployees();
  }

  getemployees() {
    this.empservice.GetEmployee().subscribe((response) => {
      console.log(response);
      this.Employeeary = response;
    });
  }

  Onsubmit(){
    // console.log(this.Employeeformgroup.value);
    if (
      this.Employeeformgroup.value.id != null &&
      this.Employeeformgroup.value.id != ''
    ) {
      this.empservice
        .UpdateEmployee(this.Employeeformgroup.value)
        .subscribe((res) => {
          console.log(res);
          this.getemployees();
          this.Employeeformgroup.setValue({
            id: '',
            name: '',
            mobileNo: '',
            emailID: '',
          });
        });
    } else {
      this.empservice
        .CreateEmployee(this.Employeeformgroup.value)
        .subscribe((res) => {
          console.log(res);
          this.getemployees();
          this.Employeeformgroup.setValue({
            id: '',
            name: '',
            mobileNo: '',
            emailID: '',
          });
        });
    }
  }

  Fillform(emp: Employee) {
    this.Employeeformgroup.setValue({
      id: emp.id,
      name: emp.name,
      mobileNo: emp.mobileNo,
      emailID: emp.emailID,
    });
  }

  DeleteEmp(id: string) {
    this.empservice.DeleteEmployee(id).subscribe((res) => {
      console.log(res);
      this.getemployees();
    });
  }

  fileName = 'ExcelSheet.xlsx';

  exportexcel() {
    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //to save the file
    XLSX.writeFile(wb, this.fileName);
  }

  title = 'angularcrud';  
}
