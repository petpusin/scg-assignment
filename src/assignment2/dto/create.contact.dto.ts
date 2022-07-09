import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ICreateContact {

    @IsOptional()
    @IsString()
    logo: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    birthDate: string;

    @IsNotEmpty()
    @IsArray()
    phone: string[];

    @IsNotEmpty()
    @IsArray()
    email: string[];

    @IsNotEmpty()
    @IsArray()
    url: string[];

    @IsNotEmpty()
    @IsNumber()
    groupId: number;
}
