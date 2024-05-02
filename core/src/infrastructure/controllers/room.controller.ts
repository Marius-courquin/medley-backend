import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import {RoomDto} from "@infrastructure/dtos/room.dto"
import { RoomService } from "@domain/services/room.service";

@Controller('room')
export class RoomController {
    constructor(
        private service: RoomService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() roomDto: RoomDto) {
        return this.service.create(roomDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param("id", ParseUUIDPipe) id:string) {
        return this.service.getElement(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param("id", ParseUUIDPipe) id:string, @Body() roomDto: RoomDto) {
        return this.service.update(roomDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getAllForEstate(@Query("estateId", ParseUUIDPipe) estateId:string) {
        return this.service.getAllForEstate(estateId);
    }
}