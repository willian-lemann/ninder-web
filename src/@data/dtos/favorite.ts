import { User } from "@data/entities";
import { Favorite } from "@data/entities/favorite";

export interface FavoriteDTO extends Omit<Favorite, "userId"> {
  user: User;
}
