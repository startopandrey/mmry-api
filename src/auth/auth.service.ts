import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(@Inject(REQUEST) private request: Request) {
    console.log(request.url);
    console.log(request.headers);
  }
  getCurrentUserId() {
    return this.request.headers['authorization'];
  }
}
