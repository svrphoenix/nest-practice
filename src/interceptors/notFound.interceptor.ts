import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  constructor(
    private errorMessage: string,
    private param: string = '',
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const params = context.switchToHttp().getRequest().params;
        const messageParam = params[this.param]
          ? `: ${params[this.param]}`
          : this.param;

        if (!data)
          throw new NotFoundException(`${this.errorMessage}${messageParam}`);
      }),
    );
  }
}
