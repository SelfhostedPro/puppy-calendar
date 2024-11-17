import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export const ActivityTypeSchema = z.enum(['meal', 'pee', 'poop', 'water', 'medicine', 'walk', 'training']);
export type ActivityType = z.infer<typeof ActivityTypeSchema>;

export const BaseActivitySchema = z.object({
  type: ActivityTypeSchema,
  description: z.string(),
  duration: z.number().nullable(), // Duration in minutes
});
export type BaseActivity = z.infer<typeof BaseActivitySchema>;

export const ActivityFormSchema = BaseActivitySchema.extend({
  time: z.date(),
});
export type ActivityForm = z.infer<typeof ActivityFormSchema>;

export const ActivitySchema = BaseActivitySchema.extend({
  id: z.string(),
  timestamp: z.instanceof(Timestamp),
  userId: z.string(),
});
export type Activity = z.infer<typeof ActivitySchema>;

export const ReadActivitySchema = BaseActivitySchema.extend({
  id: z.string(),
  timestamp: z.date(),
  userId: z.string(),
});
export type ReadActivity = z.infer<typeof ReadActivitySchema>;

export const ActivityLogSchema = z.record(z.string(), ReadActivitySchema.array());
export type ActivityLog = z.infer<typeof ActivityLogSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});
export type User = z.infer<typeof UserSchema>;
