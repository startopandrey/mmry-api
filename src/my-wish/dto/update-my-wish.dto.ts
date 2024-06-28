import { PartialType } from '@nestjs/swagger';
import { CreateMyWishDto } from './create-my-wish.dto';

export class UpdateMyWishDto extends PartialType(CreateMyWishDto) {}
