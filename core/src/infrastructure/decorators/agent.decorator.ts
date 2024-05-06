import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Agent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.agent;
  },
);