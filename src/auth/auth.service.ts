import { BadGatewayException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class AuthService implements AuthServiceBase {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    console.log(request.url);
    console.log(request.headers);
  }
  async getCurrentUserId() {
    console.log('Real called');
    const headerValue = this.request.headers['authorization'];
    if (!headerValue) {
      console.warn('No JWT');
      return null;
    }
    const clerkUserId = headerValue.replace('Bearer ', '');
    const currentUser = await this.userModel.findOne({
      clerkUserId: clerkUserId,
    });
    const userId = currentUser._id.toString();
    return userId;
  }
}

export abstract class AuthServiceBase {
  abstract getCurrentUserId(): Promise<string> | null;
}

@Injectable({ scope: Scope.REQUEST })
export class FakeAuthService implements AuthServiceBase {
  getCurrentUserId() {
    console.log('Fake called');
    return Promise.resolve('660ffa0c2a5f3c77473e1149');
  }
}
