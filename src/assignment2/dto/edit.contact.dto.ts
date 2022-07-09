import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class IEditContact {
    @IsOptional()
    @IsString()
    logo: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    birthDate: string;

    @IsOptional()
    @IsArray()
    phone: string[];

    @IsOptional()
    @IsArray()
    email: string[];

    @IsOptional()
    @IsArray()
    url: string[];

    @IsNotEmpty()
    @IsNumber()
    contactId: number
}
