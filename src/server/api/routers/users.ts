import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

const createUserSchema = z.object({
  name: z.string(),
  userId: z.string(),
  email: z.string().email("it should be an email and an valid one."),
});

export const usersRouter = createTRPCRouter({
  create: privateProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, userId, email } = input;

      await ctx.prisma.user.create({
        data: {
          email,
          name,
          userId,
        },
      });
    }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users;
  }),
});
