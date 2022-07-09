import { IsNotEmpty, IsString } from "class-validator";

export class ICreateGroup {
    @IsNotEmpty()
    @IsString()
    name: string
}