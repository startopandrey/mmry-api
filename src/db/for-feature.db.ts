import { Activity, ActivitySchema } from 'src/activities/entities/activity.entity';
import {
  Category,
  CategorySchema,
} from 'src/categories/entities/category.entity';
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
    name: Category.name,
    schema: CategorySchema,
  },
  {
    name: Activity.name,
    schema: ActivitySchema,
  },
];
