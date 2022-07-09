import { Body, Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CalculatorTaxService } from './calculator-tax.service';
import { InputNet } from './dto/input-net.dto';

@Controller('calculator-tax')
export class CalculatorTaxController {
    constructor(
        private readonly calculatorService: CalculatorTaxService
    ) { }

    @Get('')
    async calculator(@Res() res: Response, @Body('') arg: InputNet) {
        const result: number = await this.calculatorService.calculateTaxIncome(arg.netIncome)
        return res.json({ personalIncomeTax: result })
    }
}
