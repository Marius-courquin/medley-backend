import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ParseIntFieldsInterceptor implements NestInterceptor {
    constructor(private readonly fields: string[]) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        this.fields.forEach(field => {
            if (request.body && request.body[field] && !isNaN(Number(request.body[field]))) {
                request.body[field] = parseFloat(request.body[field]);
            }
        });
        return next.handle();
    }
}
