import { IsNotEmpty, IsOptional } from "class-validator"

export class InputEmail {
    @IsNotEmpty()
    to: string

    @IsNotEmpty()
    from: string

    @IsOptional()
    message?: string

    @IsOptional()
    template_id?: string
}