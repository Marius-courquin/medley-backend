import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AgentService } from '@domain/services/agent.service';

@Injectable()
export class AgentInterceptor implements NestInterceptor {
    constructor(private agentService: AgentService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const agentDto = request['agent'];

        request['agent'] = await this.agentService.create(agentDto);

        return next.handle();
    }
}
