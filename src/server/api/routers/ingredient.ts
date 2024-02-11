import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ingredientRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.ingredient.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),

  add: publicProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.ingredient.create({ data: { name: input } });
    }),
});
