import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Donation } from "src/database/entities/Donation.entity";
import { DataSource } from "typeorm";
import { v4 as uuidv4 } from 'uuid';




@Injectable()
export class DonationService{
    constructor(private readonly dataSource: DataSource) {}

    async createDonation(body: any): Promise<any> {
        const uuid = uuidv4();

    // Extract the numeric part of the UUID and pad it to ensure it is 16 digits
    const numericPart = uuid.replace(/-/g, '').slice(0, 16).padEnd(16, '0');

    // Add the "rsf" prefix
        const order_id = `rsf${numericPart}`;
        body.order_id = order_id;
        console.log("🚀 ~ DonationService  ~ createDonation ~ body:", body)
        const result = await axios.post('https://allapi.in/order/create', body);
        return {...result?.data, order_id};
        console.log("🚀 ~ DonationService ~ createDonation ~ result:", result)
        // return await this.dataSource.getRepository(Donation).save(body);
    }


    async checkStatus(body:any){
        const result = await axios.post('https://allapi.in/order/status',body);
        return result?.data
    }
}
