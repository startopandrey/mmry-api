import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
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
    console.log('Real called', this.request.headers);
    const headerValue = this.request.headers['authorization'];
    if (!headerValue) {
      console.warn('No JWT');
      return '';
    }
    const clerkUserId = headerValue.replace('Bearer ', '').trim();

    const all = await this.userModel.find()
    console.log(all)
    const currentUser = await this.userModel.findOne({
      clerkUserId: clerkUserId,
    });

    const userId = currentUser._id.toString();
    return userId;
  }
  async getCurrentUserClerkId() {
    console.log('Real called', this.request.headers);
    const headerValue = this.request.headers['authorization'];
    if (!headerValue) {
      console.warn('No JWT');
      return '';
    }
    const clerkUserId = headerValue.replace('Bearer ', '');
    return clerkUserId;
  }
  async getCurrentUserOrThrow(): Promise<UserDocument> | null {
    const currentUserId = await this.getCurrentUserId();
    const currentUser = await this.userModel.findById(currentUserId);
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    return currentUser;
  }
}

export abstract class AuthServiceBase {
  abstract getCurrentUserId(): Promise<string> | null;
  abstract getCurrentUserClerkId(): Promise<string> | null;
  abstract getCurrentUserOrThrow(): Promise<any> | null;
}

@Injectable({ scope: Scope.REQUEST })
export class FakeAuthService implements AuthServiceBase {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    console.log(request.url);
    console.log(request.headers);
  }
  getCurrentUserId() {
    console.log('Fake called');
    return Promise.resolve('660ffa0c2a5f3c77473e1149');
  }
  getCurrentUserClerkId() {
    console.log('Fake called');
    return Promise.resolve('user_2egP7d70DEZsDc80Anbx8IVkkXc');
  }
  async getCurrentUserOrThrow(): Promise<any> {
    const currentUser = await this.userModel.findById(
      '660ffa0c2a5f3c77473e1149',
    );
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    return currentUser;
  }
}
