import { Controller, Post, Body, Req } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { ClerkPayload, ClerkSignatureInfo } from './dtos';
import { Request } from 'express';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  create(@Req() req: Request, @Body() payload: ClerkPayload) {
    console.log(req.headers);
    const headers = req.headers;
    const signature: ClerkSignatureInfo = {
      svix_id: headers['svix-id'] as string,
      svix_timestamp: headers['svix-timestamp'] as string,
      svix_signature: headers['svix-signature'] as string,
    };
    return this.webhooksService.handleEvent(signature, payload);
  }
}
