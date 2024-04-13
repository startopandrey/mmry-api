import { BadRequestException, Injectable } from '@nestjs/common';
import { ClerkPayload, ClerkSignatureInfo } from './dtos';
//import { DeletedObjectJSON, UserJSON, WebhookEvent } from '@clerk/backend';
import { Webhook } from 'svix';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type DeletedObjectJSON = any;
export type UserJSON = any;
export type WebhookEvent = any;

@Injectable()
export class WebhooksService {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async handleEvent(
    { svix_id, svix_timestamp, svix_signature }: ClerkSignatureInfo,
    payload: ClerkPayload,
  ) {
    if (!svix_id || !svix_timestamp || !svix_signature) {
      throw new BadRequestException('Error occured -- no svix headers');
    }
    let evt: WebhookEvent;
    const secretKey = this.configService.get('CLERK_WEBHOOK_SECRET_KEY');
    // console.log({secretKey, payloadAsString});
    try {
      const wh = new Webhook(secretKey);
      evt = wh.verify(JSON.stringify(payload), {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
    const eventData = evt.data;
    const eventType = evt.type;
    console.log(`User ${eventData.id} was ${eventType}`);
    // Handle the webhooks
    switch (eventType) {
      case 'user.created':
        await this.createUser(eventData as UserJSON);
        return;
      case 'user.deleted':
        await this.deleteUser(eventData as DeletedObjectJSON);
        return;
      case 'user.updated':
        await this.updateUser(eventData as UserJSON);
        return;
      default:
        break;
    }
    return { success: true };
  }
  private async createUser(userData: UserJSON) {
    const {
      id,
      username,
      first_name,
      last_name,
      image_url,
      email_addresses,
      created_at,
      updated_at,
      public_metadata,
    } = userData;
    console.log({ userData });
    const generatedUser: User = {
      clerkUserId: id,
      username: username ?? `user_${new Date().getTime()}`,
      emailAddress: email_addresses[0].email_address,
      metadata: {
        createdAt: created_at,
        updatedAt: updated_at,
      },
      profile: {
        firstName: first_name,
        lastName: last_name,
        isVerified: email_addresses[0].verification.status == 'verified',
        birthday: public_metadata.birthday as string,
        profileImage:
          (image_url as string) ??
          (public_metadata.profileImage as string) ??
          '',
      },
      followers: [],
      memories: [],
      manualFollowers: [],
    };
    console.log({ generatedUser });
    const newUser = await new this.userModel(generatedUser);
    return newUser.save();
  }
  private async deleteUser(userData: DeletedObjectJSON) {
    const userId = userData.id;
    await this.userModel.findOneAndDelete({
      clerkUserId: userId,
    });
    return 'SUCCESS';
  }
  private async updateUser(userData: UserJSON) {
    const {
      id,
      username,
      first_name,
      last_name,
      image_url,
      email_addresses,
      created_at,
      updated_at,
      public_metadata,
    } = userData;
    const generatedUser = {
      username,
      emailAddress: email_addresses[0].email_address,
      metadata: {
        createdAt: created_at,
        updatedAt: updated_at,
      },
      profile: {
        firstName: first_name,
        lastName: last_name,
        birthday: public_metadata.birthday as string,
        profileImage:
          (image_url as string) ??
          (public_metadata.profileImage as string) ??
          '',
      },
    };
    const newUser = await this.userModel.findOneAndUpdate(
      { clerkUserId: id },
      generatedUser,
    );
    return newUser;
  }
}
