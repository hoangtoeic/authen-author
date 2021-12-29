import { Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {JwtService} from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { Repository } from 'typeorm';
import { User } from 'src/db/entities/user.entity';
import { AuthCredentialDto } from './dto/authCredentialsDto.auth';
import { jwtPayload } from './jwt-payload.interface';
import { loginDto } from './dto/loginDto.auth';
//export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService) {}



  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: loginDto): Promise<{accessToken: string}> {
   

    const username = await this.usersService.signIn(user)
    if(!username){
      throw new UnauthorizedException('login failed')
    }

    const payload:jwtPayload = {username}
    const accessToken = await this.jwtService.sign(payload)
    return { accessToken }


  }

  async signup(user: AuthCredentialDto): Promise<User> {
    console.log('auth service')
    return this.usersService.signUp(user)
  }

}