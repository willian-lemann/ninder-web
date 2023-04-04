import { Loading } from "@components/shared/Loading";

export const Skeleton = () => {
  return (
    <div className="hidden flex-1 w-full md:flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loading size={20} color="text-zinc-400" />

        <span className="mt-10 text-zinc-600">
          Searching for Users nearby you...
        </span>
      </div>
    </div>
  );
};
