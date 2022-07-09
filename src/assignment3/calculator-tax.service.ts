import { BadRequestException, HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorTaxService {
    calculateTaxIncome(netIncome: number) {
        try {
            if (netIncome < 0) {
                throw new BadRequestException("please input more than zero !!!");
            }
            if (typeof netIncome != "number") {
                throw new BadRequestException("please input number !!!");
            }
            const valueTex = calculateTax(netIncome);
            return valueTex
        } catch (error) {
            throw new HttpException({
                status: error.status,
                message: error.message
            }, error.status)
        }
    }
}


const calculateTax = (netIncome: number) => {
    let PIT = 0;
    switch (true) {
        case netIncome >= 0 && netIncome <= 150000:
            return PIT;

        case netIncome > 150000 && netIncome <= 300000:
            PIT = ((netIncome - 150000) * 5) / 100;
            return PIT;

        case netIncome > 300000 && netIncome <= 500000:
            PIT = ((netIncome - 300000) * 10) / 100 + 7500;
            return PIT;

        case netIncome > 500000 && netIncome <= 750000:
            PIT = ((netIncome - 500000) * 15) / 100 + 27500;
            return PIT;

        case netIncome > 750000 && netIncome <= 1000000:
            PIT = ((netIncome - 750000) * 20) / 100 + 65000;
            return PIT;

        case netIncome > 1000000 && netIncome <= 2000000:
            PIT = ((netIncome - 1000000) * 25) / 100 + 115000;
            return PIT;

        case netIncome > 2000000 && netIncome <= 5000000:
            PIT = ((netIncome - 2000000) * 30) / 100 + 365000;
            return PIT;

        case netIncome > 5000000:
            PIT = ((netIncome - 5000000) * 35) / 100 + 1265000;
            return PIT;

        default:
            return PIT;
    }
};
