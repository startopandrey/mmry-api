import { PartialType } from '@nestjs/swagger';
import { CreateUserFollowerDto } from './create-user-follower.dto';

export class UpdateUserFollowerDto extends PartialType(CreateUserFollowerDto) {}
