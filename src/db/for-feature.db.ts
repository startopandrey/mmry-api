import {
  AdminActivity,
  AdminActivitySchema,
} from 'src/admin-activities/entities/admin-activity.entity';
import {
  AdminCategory,
  AdminCategorySchema,
} from 'src/admin-categories/entities/admin-category.entity';
import {
  AdminContest,
  AdminContestSchema,
} from 'src/admin-contests/entities/admin-contest.entity';
import {
  MemoryCard,
  MemoryCardSchema,
} from 'src/memories-card/entities/memory-card.entity';
import { Memory, MemorySchema } from 'src/memories/entities/memory.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';

export default [
  {
    name: Memory.name,
    schema: MemorySchema,
  },
  {
    name: MemoryCard.name,
    schema: MemoryCardSchema,
  },
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: AdminCategory.name,
    schema: AdminCategorySchema,
  },
  {
    name: AdminActivity.name,
    schema: AdminActivitySchema,
  },
  {
    name: AdminContest.name,
    schema: AdminContestSchema,
  },
];
