import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { ingredientRouter } from "./routers/ingredient";
import { mealRouter } from "./routers/meal";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  ingredient: ingredientRouter,
  meal: mealRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
