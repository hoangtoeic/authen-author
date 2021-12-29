import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { Employee } from './entities/employee.entity';
import { EmployeeService} from './employee.service';
import { EmployeeCreateDto } from './dto/create-employee.input';

@Resolver(()=>Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService){

  }
  
  @Query(()=>[Employee],{name: "getAllEmployee"})
  findAll(){
    return this.employeeService.findAll();
  }

  @Mutation(()=> Employee, {name: "createEmployee"})
  create(@Args('employeeInput') employee: EmployeeCreateDto) {
    return this.employeeService.create(employee)
  }
}
