import { createTRPCRouter, privateProcedure } from "../trpc";

export const regulationsRouter = createTRPCRouter({
  acceptRegulation: privateProcedure.mutation(async ({ ctx }) => {
    const { currentUser } = ctx;
    const user = await ctx.prisma.user.findFirst({
      where: {
        userId: currentUser,
      },
    });

    await ctx.prisma.user.update({
      where: { id: user?.id },
      data: { hasConfirmedRegulation: true },
    });
  }),
});
