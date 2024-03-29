import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  firstname: string

  @IsString()
  @IsNotEmpty()
  lastname: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string
}