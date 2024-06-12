import { SignatureWithFileDto } from "../dtos/signatureWithFile.dto";
import { Signature } from "@/domain/entities/signature.entity";
import { SignatureWithLinkDto } from "../dtos/signatureWithLink.dto";
import { Picture } from "@/domain/entities/picture.entity";

export class SignatureDtoMapper{
    static fromModelWithLink(signature: Signature, picture: string): SignatureWithLinkDto {
        return new SignatureWithLinkDto(
            signature.signedOn,
            picture,
            signature.id
        );
    }

    static toModel(signatureDto: SignatureWithFileDto, picture: Picture): Signature {
        return new Signature(
            signatureDto.signedOn,
            picture,
            signatureDto.id
        );
    }

}