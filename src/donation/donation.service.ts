import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Transform, plainToClass } from "class-transformer";
import { Donation } from "src/database/entities/Donation.entity";
import { UserDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";
import { DataSource } from "typeorm";
import { v4 as uuidv4 } from 'uuid';




@Injectable()
export class DonationService {
    constructor(private readonly dataSource: DataSource, private readonly userService: UsersService) { }

    async createDonation(body: any): Promise<any> {
        const uuid = uuidv4();
        const token = "c63622-263877-dbf6b1-44c166-846e24"
        const { customer_email, customer_mobile, customer_name } = body
        let user = await this.userService.getUserDetail(customer_email, customer_mobile);
        if (!user) {
            const payload = { email: customer_email, mobile: customer_mobile, promisedAmount: body.txn_amount, password: uuid, fname: customer_name.split(' ')[0] }
            user = await this.userService.createUserService(plainToClass(UserDto, payload));
        }
        const numericPart = uuid.replace(/-/g, '').slice(0, 16).padEnd(16, '0');
        // Add the "rsf" prefix
        const order_id = `rsf${numericPart}`;
        body.order_id = order_id;
        body.token = token;
        const result = await axios.post('https://allapi.in/order/create', body);

        // Extract only necessary user properties
        const { id, fname } = user;
        const donation = {
            userId: id,
            name: fname || body?.customer_name,
            email: customer_email,
            mobile: customer_mobile,
            donation: body.txn_amount,
            status: 'pending',
            orderId: order_id
        };
        await this.dataSource.getRepository(Donation).save(donation);
        return {...result.data, order_id};
    }


    async checkStatus(body: any) {
        const token = "c63622-263877-dbf6b1-44c166-846e24";
        body.token = token;
        const result = await axios.post('https://allapi.in/order/status', body);
        const { results } = result?.data;
        if(results?.status === 'Success'){
            const donation = await this.dataSource.getRepository(Donation).findOne({where: {orderId: body?.order_id}});
            donation.status = 'success';
            await this.dataSource.getRepository(Donation).save(donation);
        }
        // if()
        return result?.data
    }


    async fetchAllDonations() {
        return await this.dataSource.getRepository(Donation).find();
    }
} 