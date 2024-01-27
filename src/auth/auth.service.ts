import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from 'src/utils/utils.service';
import { CurrentUserDto } from 'src/utils/dto/current-user.dto';
import { LuxonService } from 'src/luxon/luxon.service';
import { DataSource } from 'typeorm';
import { User } from 'src/database/entities/User.entity';
import { PaytmChecksum } from './paytmchecksum.service';
import https from 'https';
import axios from 'axios';
import { UserDto } from 'src/users/dto/user.dto';


@Injectable()
export class AuthService {
	// public readonly razorpay: any;
	// private paytmParams = {};


	constructor(
		private usersService: UsersService,
		private utilsService: UtilsService,
		private dataSource: DataSource,
		// private paytmChecksum: PaytmChecksum
	) { 
		
		// this.paytmParams['body'] = {
		// 	"requestType"   : "Payment",
		// 	"mid"           : "ofOkcd69935969274911",
		// 	"websiteName"   : "WEBSTAGING",
		// 	"orderId"       : "ORDERID_98765",
		// 	"callbackUrl"   : "https://<callback URL to be used by merchant>",
		// 	"txnAmount"     : {
		// 		"value"     : "1.00",
		// 		"currency"  : "INR",
		// 	},
		// 	"userInfo"      : {
		// 		"custId"    : "CUST_001",
		// 	},
		// };
	}

	async loginService(loginDto: LoginDto): Promise<any> {
		let user = await this.usersService.getUserByEmail(loginDto.email);
		user.lastLogin = LuxonService.getStandardDate;
		user = await this.dataSource.getRepository(User).save(user);
		return {
			accessToken: await this.utilsService.jwtToken(user),
			...user
		}
	}

	async createUserService(userDto: UserDto): Promise<any> {
		return await this.usersService.createUserService(userDto);
	}


	// async receiveDonation(options: any):Promise<any>{
	// 	const paytmEndpoint = 'https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=ofOkcd69935969274911&orderId=76hsg2'; // Staging URL, change to production URL in production

	// 	// const paytmEndpoint = 'https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction'; // Staging URL, change to production URL in production
    // const paytmMerchantKey = 'your_merchant_key';
    // // Construct the payload and make the HTTP request to Paytm
    // // ...
	// const requestData = {
	// 	mid: 'ofOkcd69935969274911',
	// 	orderId: '76hsg2', // Replace with a unique order ID for each transaction
	// 	txnAmount: {
	// 	  value: '1.00', // Replace with the actual transaction amount
	// 	  currency: 'INR', // Replace with the currency code of your choice
	// 	},
	// 	userInfo: {
	// 	  custId: 'cust111', // Replace with the customer's ID in your system
	// 	},
	// 	callbackUrl: 'https://your-callback-url.com/paytm/callback', // Replace with your actual callback URL
	// 	paymentMode: 'DEBIT_CARD', // Payment mode (e.g., DEBIT_CARD, CREDIT_CARD, NET_BANKING, etc.)
	// 	// promoCode: 'your_promo_code', // Optional: Replace with a promotional code if applicable
	//   };
	  
	//   // Example of constructing the payload for the Paytm API request
	//   const payload = {
	// 	head: {
	// 	  clientId: 'ofOkcd69935969274911', // Replace with your client ID
	// 	  version: 'v1',
	// 	},
	// 	body: requestData,
	//   };
	  

    // // Example: Using axios for making the request
    // const response = await axios.post(paytmEndpoint, payload, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // console.log("🚀 ~ AuthService ~ receiveDonation ~ response:", response)

    // // Process the response and return it to the controller
    // return response.data;
		// this.paytmChecksum.generateSignature(JSON.stringify(this.paytmParams['body']), "soNWNNI84GN9ObJB").then(async (checksum) =>{

		// 	this.paytmParams['head'] = {
		// 		"signature"    : checksum
		// 	};
		// 		console.log("🚀 ~ AuthService ~ this.paytmChecksum.generateSignature ~ checksum:", checksum)
		
		// 	var post_data = JSON.stringify(this.paytmParams);
		
		// 	var options = {
		
		// 		/* for Staging */
		// 		hostname: 'securegw-stage.paytm.in',
		
		// 		/* for Production */
		// 		// hostname: 'securegw.paytm.in',
		
		// 		port: 443,
		// 		path: '/theia/api/v1/initiateTransaction?mid=ofOkcd69935969274911&orderId=ORDERID_98765',
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			'Content-Length': `${post_data.length}`
		// 		}
		// 	};
		
		// 	var response = "";
		// 	const res = await fetch('https://securegw-stage.paytm.in:443/theia/api/v1/initiateTransaction?mid=ofOkcd69935969274911&orderId=ORDERID_98765',{
		// 		method: 'POST',
		// 		headers: options.headers,
		// 		body: JSON.stringify(post_data)
				
		// 	})
		// 	console.log("🚀 ~ AuthService ~ this.paytmChecksum.generateSignature ~ res:", res)
		// 	var post_req = https.request(options, function(post_res) {
		// 		post_res.on('data', function (chunk) {
		// 			response += chunk;
		// 			console.log("🚀 ~ AuthService ~ chunk:", chunk)
		// 		});
		
		// 		post_res.on('end', function(){
		// 			console.log('Response: ', response);
		// 		});
		// 	});
		// 	console.log("🚀 ~ AuthService ~ varpost_req=https.request ~ post_req:", post_req)
		
		// 	console.log("🚀 ~ AuthService ~ this.paytmChecksum.generateSignature ~ post_data:", post_data)
		// 	post_req.write(post_data);
		// 	post_req.end();
		// });
	// }
}
