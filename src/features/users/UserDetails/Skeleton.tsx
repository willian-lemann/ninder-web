import { Loading } from "@/components/Loading";

export const Skeleton = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col gap-4">
        <Loading />
        <h1 className="text-title-opacity">Loading details from user...</h1>
      </div>
    </div>
  );
};
