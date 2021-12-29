import { Body, Controller, Get, Post, Req, Request, SetMetadata, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/db/entities/user.entity';
import { AuthService } from './auth.service';
import { getUser } from './decorator/create-param.decorator';
import { Roles } from './decorator/roles.decorator';
import { AuthCredentialDto } from './dto/authCredentialsDto.auth';
import { Role } from './guard/role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { loginDto } from './dto/loginDto.auth';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  
  // @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body(ValidationPipe) loginDto:loginDto): Promise<{accessToken: string}> {
    return this.authService.login(loginDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

@Post('test')
@UseGuards(JwtAuthGuard)
@Roles('admin')
  async test(@Req() req) {
    return req.user
 // async test(@getUser() user: User) { ///////////// WHY createParamDecorator is not working
    // console.log(req)
  }

  @Post('signup')
  async signup(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signup(authCredentialDto);
  }

}
function constSetMetadata(arg0: string, roles: any) {
  throw new Error('Function not implemented.');
}

