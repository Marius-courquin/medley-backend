import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { WallSocketService } from '@domain/services/wallSocket.service';
import { WallSocketDto } from '@infrastructure/dtos/wallSocket.dto';

@Controller('wall_socket')
export class wallSocketController {
    constructor(
        private service: WallSocketService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createWallSocket(@Body() wallSocketDto: WallSocketDto) {
        return this.service.createWallSocket(wallSocketDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getWallSocket(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getWallSocket(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateWallSocket(@Param('id', ParseUUIDPipe) id: string, @Body() wallSocketDto: WallSocketDto) {
        return this.service.updateWallSocket(id, wallSocketDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getWallSocketBySubElement(@Query('subElementId', ParseUUIDPipe) id: string) {
        return this.service.findWallSocketBySubElement(id);
    }

}
