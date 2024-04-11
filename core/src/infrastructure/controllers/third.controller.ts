import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query} from '@nestjs/common';
import {ThirdService} from '@domain/services/third.service';
import {ThirdDto} from "@infrastructure/dtos/third.dto";

@Controller('third')
export class ThirdController {
    constructor(
        private service: ThirdService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createThird(@Body() thirdDto: ThirdDto) {
        return this.service.createThird(thirdDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getThird(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.getThird(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateThird(@Param('id', ParseUUIDPipe) id: string, @Body() thirdDto: ThirdDto) {
        return this.service.updateThird(id, thirdDto);
    }

}

