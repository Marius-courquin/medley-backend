import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { GroundService } from '@domain/services/ground.service';
import { GroundDto } from '@infrastructure/dtos/ground.dto';


@Controller('ground')
export class GroundController {
    constructor(
        private service: GroundService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createGround(@Body() groundDto: GroundDto) {
        return this.service.createGround(groundDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getGround(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getGround(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateGround(@Param('id', ParseUUIDPipe) id: string, @Body() groundDto: GroundDto) {
        return this.service.updateGround(id, groundDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getGroundByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.findGroundByElement(id);
    }

}