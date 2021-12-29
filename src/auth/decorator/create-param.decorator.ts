import { createParamDecorator, Req } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

export const getUser = createParamDecorator((data, req): User => 
  {return req.user}
)