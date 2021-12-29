import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from 'src/auth/dto/authCredentialsDto.auth';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/guard/role.enum';
import { loginDto } from 'src/auth/dto/loginDto.auth';
// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>
  )
  {

  }

  
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

async signUp(authCredentialDto:AuthCredentialDto){
  const {username, password,role} = authCredentialDto;

  console.log(username)
  console.log(role)
  //const salt = await bcrypt.genSalt(8);
 // const hashPassword = await bcrypt.hash(password, salt);

  const user = new User();
  user.username= username;
  user.role=Role[role];
  
  console.log(Role[role])
  user.salt=await bcrypt.genSalt(8);
  user.password= await bcrypt.hash(password, user.salt);
  
 return await this.userRepo.save(user)


}

async signIn(authCredentialDto: loginDto) {
  //console.log("here2")
  const {username, password} = authCredentialDto
  //console.log("here3")
  const user = await this.userRepo.findOne({username:username})
  
  if(user && user.validPassword(password)) {
    return username
  }
  else {
    return null
  }
}

  // async findOnex(username: string): Promise<User | undefined> {
  //   return await this.userRepo.findOne(username);
  // }
}