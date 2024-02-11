import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const mealRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.meal.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        ingredients: true,
      },
    });
  }),

  add: publicProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.meal.create({
        data: { name: "", ingredients: { connect: [{ id: 3 }, { id: 4 }] } },
      });
    }),
});
