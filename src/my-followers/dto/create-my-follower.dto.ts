export class CreateMyFollowerDto {
  clerkUserId: string;
}

export class CreateManualFollowerDto {
  name: string;
  birthday: number;
  address: string;
  postcode: string;
}

export class UnFollowDto {
  clerkUserId: string;
}
