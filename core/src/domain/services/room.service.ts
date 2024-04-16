import { Injectable } from "@nestjs/common";
import { EstateRepository } from "../repositories/estate.repository";

@Injectable()
export class RoomRepository {
    constructor( 
        private readonly roomRepository: RoomRepository,
        private readonly estateRepository: EstateRepository
    ) {}

    async findById(id: string): Promise<any> {
        return {};
    }

    async updateElement(room: any): Promise<any> {
        return {};
    }
}