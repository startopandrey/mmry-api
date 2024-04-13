export type WebhookEventType = any;

export interface ClerkPayload {
  type: WebhookEventType;
  data: any;
}

export interface ClerkSignatureInfo {
  svix_id: string;
  svix_timestamp: string;
  svix_signature: string;
}
