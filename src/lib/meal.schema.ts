import {z} from 'zod';

export const mealSchema = z.object({
    dishName: z.string(),
    servings: z.number().min(1, 'At least 1 serving is required').max(50, 'Maximum 50 servings allowed'),
});

export type MealFormData = z.infer<typeof mealSchema>;