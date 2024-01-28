import { Body, Controller, Post } from "@nestjs/common";
import { FundraiserService } from "./fundraiser.service";


@Controller('fundraiser')
export class FundraiserController {

    constructor(
        private readonly donationService: FundraiserService
    ) {}

    @Post('/')
    async createDonationEvent(@Body() body: any) {
        return '';
    }

    @Post('/status')
    async checkTransactionStatus(@Body() body: any) {
        return '';
    }
}