import { Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EmployeeModule } from './employee/employee.module';
import { join} from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee/entities/employee.entity';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  
  imports: [EmployeeModule, GraphQLModule.forRoot(
    {
      autoSchemaFile: join(process.cwd(),'src/employeeSchema.gql')
    }
  ),
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host:'localhost',
        port:5432,
        username: 'postgres',
        password: '14121999aA',
        database: 'test2',
        entities: [Employee,Project,User],
        synchronize: true,
      }
    ),
    ProjectModule,
    AuthModule,
    UsersModule,
    
],
  controllers: [],
  providers: [],
})
export class AppModule {}
