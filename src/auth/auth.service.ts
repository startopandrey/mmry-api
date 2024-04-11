import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthService implements AuthServiceBase {
  constructor(@Inject(REQUEST) private request: Request) {
    console.log(request.url);
    console.log(request.headers);
  }
  getCurrentUserId() {
    console.log('Real called');
    const headerValue = this.request.headers['authorization'];
    if (!headerValue) {
      console.warn('No JWT');
      return null;
    }
    const userId = headerValue.replace('Bearer ', '');
    return userId;
  }
}
export abstract class AuthServiceBase {
  abstract getCurrentUserId(): string | null;
}

@Injectable({ scope: Scope.REQUEST })
export class FakeAuthService implements AuthServiceBase {
  getCurrentUserId(): string {
    console.log('Fake called')
    return '660ffa0c2a5f3c77473e1149';
  }
}
