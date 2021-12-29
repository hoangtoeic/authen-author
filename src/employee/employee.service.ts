import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCreateDto } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>)
  {}
  async findAll(): Promise<Employee[]>{
    return this.employeeRepo.find();
  //  let emp: Employee = new Employee()
  //  emp.id = "1"
  //  emp.FirstName="hoang"
  //  emp.LastName = "nguyen"
  //  emp.address = "Viet Nam"
  //  return [emp]

  }

  async create(employee: EmployeeCreateDto):Promise<Employee>{
    let emp = this.employeeRepo.create(employee);
    return this.employeeRepo.save(emp);
  }

}
