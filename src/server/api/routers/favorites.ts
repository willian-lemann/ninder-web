import { Favorite } from "@/features/favorites/types/favorite";
import { exclude } from "@/utils/exclude";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

const toggleSchema = z.object({
  favoritedUserId: z.string(),
});

export const favoritesRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const { currentUser } = ctx;
    const user = await ctx.prisma.user.findFirst({
      where: {
        userId: currentUser,
      },
    });

    if (!user) return [];

    const favorites = await ctx.prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        user: true,
        favoritedUser: true,
      },
    });

    favorites.forEach((favorite) => {
      exclude(favorite, ["favoritedUserId", "user", "userId"]);
    });

    const mappedFavorites = favorites.map((favorite) => ({
      id: favorite.id,
      user: favorite.favoritedUser,
    }));

    return mappedFavorites;
  }),
  toggle: privateProcedure
    .input(toggleSchema)
    .mutation(async ({ input, ctx }) => {
      const { currentUser } = ctx;
      const user = await ctx.prisma.user.findFirst({
        where: {
          userId: currentUser,
        },
      });

      if (!user) return;

      const favorited = await ctx.prisma.favorite.findFirst({
        where: { userId: user.id },
      });

      if (favorited) {
        await ctx.prisma.favorite.delete({
          where: { id: favorited.id },
        });

        return;
      }

      const createdFavorited = await ctx.prisma.favorite.create({
        data: { userId: user.id, favoritedUserId: input.favoritedUserId },
      });
    }),
});
