import {IsString, MinLength, MaxLength, Matches} from 'class-validator';
import { Role } from '../guard/role.enum';


export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString({message: 'string'})
  @MinLength(4)
  @MaxLength(20)
  role: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  
 
}