import { useRouter } from "next/router";

export default function User() {
  const { query } = useRouter();

  return <div>{query.id}</div>;
}
