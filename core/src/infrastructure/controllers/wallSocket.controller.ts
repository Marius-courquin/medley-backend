import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { WallSocketService } from '@domain/services/wallSocket.service';
import { WallSocketDto } from '@infrastructure/dtos/wallSocket.dto';

@Controller('wall_socket')
export class WallSocketController {
    constructor(
        private service: WallSocketService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createWallSocket(@Body() wallSocketDto: WallSocketDto) {
        return this.service.create(wallSocketDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getWallSocket(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() wallSocketDto: WallSocketDto) {
        return this.service.update(id, wallSocketDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getBySubElement(@Query('subElementId', ParseUUIDPipe) id: string) {
        return this.service.getBySubElement(id);
    }

}
