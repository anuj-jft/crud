import { Body, Controller, Post } from "@nestjs/common";
import { DonationService } from "./donation.service";


@Controller('donation')
export class DonationController {

    constructor(
        private readonly donationService: DonationService
    ) {}

    @Post('/')
    async createDonationEvent(@Body() body: any) {
        return await this.donationService.createDonation(body)
    }

    @Post('/status')
    async checkTransactionStatus(@Body() body: any) {
        return await this.donationService.checkStatus(body);
    }
}