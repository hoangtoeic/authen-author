import { ObjectType,Field } from "@nestjs/graphql";
import { Project } from "src/project/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Employee{
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  
  @Field()
  @Column()
  FirstName: string

  @Field()
  @Column()
  LastName: string

  @Field({nullable: true})
  @Column({nullable:true})
  address: string

  @ManyToOne(()=>Project, project=>project.employees)
  @Field(()=>Project)
  project: Project

  @Column()
  @Field()
  projectID:string
}