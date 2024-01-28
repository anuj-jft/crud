import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";




@Injectable()
export class FundraiserService {
    constructor(private readonly dataSource: DataSource) { }


}