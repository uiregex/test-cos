import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { UniLoadingService } from './loading.service';

@Injectable()
export class UniLoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: UniLoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    this.totalRequests++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;

        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
