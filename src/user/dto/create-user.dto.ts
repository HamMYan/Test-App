import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phoneNumber: number;

    @ApiProperty()
    role: number;

    @ApiProperty({default: 0})
    isVerify: number;
}


export class Login{
   
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string; 
}