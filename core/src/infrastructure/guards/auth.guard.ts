import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {AgentDto} from "@infrastructure/dtos/agent.dto";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException("No bearer access token given !");
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request['agent'] = new AgentDto(payload.sub);
        } catch {
            throw new UnauthorizedException("Invalid access token !");
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException("No authorization header set !");
        }

        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }

}
