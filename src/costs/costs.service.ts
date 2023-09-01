import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Cost, CostsDocument} from "../schemas/costs.schema";
import {CreateCostDto} from "./dto/create-cost.dto";

@Injectable()
export class CostsService {
    constructor(@InjectModel(Cost.name) private costsModel: Model<CostsDocument>) {
    }

    async findAll(): Promise<Cost[]> {
        return this.costsModel.find();
    }

    async create(createCostDto: CreateCostDto):
}