import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query} from '@nestjs/common';
import {ThirdService} from '@domain/services/third.service';
import {ThirdDto} from "@infrastructure/dtos/third.dto";

@Controller('third')
export class ThirdController {
    constructor(
        private service: ThirdService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() thirdDto: ThirdDto) {
        return this.service.create(thirdDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    find(@Query('id') id: string) {
        return this.service.find(id);
    }

    @HttpCode(HttpStatus.OK)
    @Delete()
    delete(@Query('id') id: string) {
        return this.service.delete(id);
    }
}

