import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class IEditGroup {
    @IsOptional()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsNumber()
    groupId: number
}