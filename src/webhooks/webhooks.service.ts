import { BadRequestException, Injectable } from '@nestjs/common';
import { ClerkPayload, ClerkSignatureInfo } from './dtos';
import { DeletedObjectJSON, UserJSON, WebhookEvent } from '@clerk/backend';
import { Webhook } from 'svix';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebhooksService {
  constructor(private configService: ConfigService) {}
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
  async createUser(userData: UserJSON) {}
  async deleteUser(userData: DeletedObjectJSON) {}
  async updateUser(userData: UserJSON) {}
}
