import {Injectable, NotFoundException} from "@nestjs/common";
import {Signature} from "../entities/signature.entity";
import {SignatureWithFileDto} from "@infrastructure/dtos/signatureWithFile.dto";
import {SignatureWithLinkDto} from "@/infrastructure/dtos/signatureWithLink.dto";
import {Picture} from "../entities/picture.entity";
import {FileService} from "./file.service";
import {SignatureDtoMapper} from "@/infrastructure/mappers/signature.dto.mapper";
import {SignatureRepository} from "../repositories/signature.repository";

@Injectable()
export class SignatureService {

    public static readonly TENANT_KEY = 'tenant';
    public static readonly AGENT_KEY = 'agent';

    constructor(
        private readonly repository: SignatureRepository,
        private readonly fileService: FileService,
    ){}

    async get(id: string, leaseInspectionId: string, keySpecification: string): Promise<SignatureWithLinkDto> {
        const signature: Signature = await this.repository.findById(id);
        if (!signature) {
            throw new NotFoundException( 'signature does not exist');
        }
        const picture = await this.fileService.generateSignedUrlForPictureByKey(signature.picture, this.getPictureKey(leaseInspectionId, keySpecification));
        return SignatureDtoMapper.fromModelWithLink(signature, picture);
    }

    async create(signatureWithFileDto: SignatureWithFileDto, leaseInspectionId: string, keySpecification: string): Promise<Signature> {
        const picture: Picture = await this.fileService.savePictureWithKey(signatureWithFileDto.picture, this.getPictureKey(leaseInspectionId, keySpecification));
        const signature = await this.repository.save(new Signature(signatureWithFileDto.signedOn, picture));
        return signature;
    }

    private getPictureKey(leaseInspectionId: string, keySpecification?: string): string {
        return `leaseInspections/${leaseInspectionId}/signatures` + (keySpecification ? `/${keySpecification}` : '');
    }

}