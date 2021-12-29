import { ObjectType,Field } from "@nestjs/graphql";
import { Project } from "src/project/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Role } from "src/auth/guard/role.enum";
import { type } from "os";

@ObjectType()
@Entity()
@Unique(['username'])
export class User{
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  
  @Field()
  @Column()
  username: string

  @Field()
  @Column()
  password: string

  @Field()
  @Column({type: "jsonb"})
  role: Role

  @Field()
  @Column()
  salt: string

 async validPassword(password: string): Promise<boolean>
  {
    const hash=await bcrypt.hash(password, this.salt)
    return  this.password === hash
  }

  
}