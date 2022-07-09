import { Module } from "@nestjs/common";
import { CalculatorTaxController } from "./calculator-tax.controller";

import { CalculatorTaxService } from "./calculator-tax.service";

@Module({
    controllers: [CalculatorTaxController],
    providers: [CalculatorTaxService],
})
export class CalculatorTaxModule { }