import { PartialType } from '@nestjs/swagger';
import { CreateMyFollowerDto } from './create-my-follower.dto';

export class UpdateMyFollowerDto extends PartialType(CreateMyFollowerDto) {}
