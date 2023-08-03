import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsPhoneNumber, MinLength, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'Anvar', description: '| User firstname' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Sanayev', description: '| User lastname' })
    last_name: string;

    @ApiProperty({ example: 'anvarc1k', description: '| Unique username' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: '+998991234567', description: '| User phone' })
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({ example: 'Qw@r', description: '| User password' })
    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'Qw@r', description: '| User confirm password' })
    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(6)
    confirm_password: string;
}