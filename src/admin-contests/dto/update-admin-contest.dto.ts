import { PartialType } from '@nestjs/swagger';
import { CreateAdminContestDto } from './create-admin-contest.dto';

export class UpdateAdminContestDto extends PartialType(CreateAdminContestDto) {}
