import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { RoomDto } from "../dtos/room.dto";
import { RoomService } from "@/domain/services/room.service";

@Controller('room')
export class RoomController {
    constructor(
        private service: RoomService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createRoom(@Body() roomDto: RoomDto) {
        return this.service.createRoom(roomDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getRoom(@Param("id", ParseUUIDPipe) id:string) {
        return this.service.getRoom(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateRoom(@Param("id", ParseUUIDPipe) id:string, @Body() roomDto: RoomDto) {
        return this.service.updateElement(roomDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getRoomByEstate(@Param("estateId", ParseUUIDPipe) estateId:string) {
        return this.service.findByEstate(estateId);
    }
}