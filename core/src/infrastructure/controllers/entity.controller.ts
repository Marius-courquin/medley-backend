import {Body, Controller, Delete, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {EstateService} from '@domain/services/estate.service';
import {EstateDto} from "@infrastructure/controllers/dtos/estate.dto";
import {EstateDtoMapper} from "@infrastructure/controllers/mappers/estate.dto.mapper";


@Controller('estate')
export class EstateController {
    constructor(
        private service: EstateService,
        private mapper: EstateDtoMapper
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    create(@Body() estateDto: EstateDto) {
        return this.service.create(estateDto);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete')
    delete(@Body() estateDto: EstateDto) {
        return this.service.delete(this.mapper.toModel(estateDto));
    }
}