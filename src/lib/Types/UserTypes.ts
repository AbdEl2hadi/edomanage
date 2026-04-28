import type z from "zod";
import type { newUserSchema, userSchema } from "../Schemas/UserSchemas";

export type User = z.infer<typeof userSchema>

export type NewUser = z.infer<typeof newUserSchema>
