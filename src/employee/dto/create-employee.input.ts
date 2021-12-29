import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class EmployeeCreateDto {
  

  
  @Field()
  FirstName: string

  @Field()
  LastName: string

  @Field({nullable: true})
  address: string

  @Field()
  projectID: string
}