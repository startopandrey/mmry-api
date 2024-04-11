import {
  MemoryCard,
  MemoryCardSchema,
} from 'src/memories-card/entities/memory-card.entity';
import { Memory, MemorySchema } from 'src/memories/entities/memory.entity';

export default [
  {
    name: Memory.name,
    schema: MemorySchema,
  },
  {
    name: MemoryCard.name,
    schema: MemoryCardSchema,
  },
];
