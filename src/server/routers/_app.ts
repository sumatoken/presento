import { latexRouter } from "./latex";
import { usersRouter } from "./users";
import { router } from "../trpc";

export const appRouter = router({
  user: usersRouter,
  latex: latexRouter, // put procedures under "post" namespace
});
export type AppRouter = typeof appRouter;
