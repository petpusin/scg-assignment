import { IsNotEmpty, IsNumber } from "class-validator";

export class InputNet {
    @IsNotEmpty()
    @IsNumber()
    netIncome: number
}