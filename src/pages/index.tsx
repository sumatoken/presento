import { trpc } from '../utils/trpc';

export default function UserPage() {
  const hello = trpc.user.hello.useQuery();
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  console.log(hello.data)
  return (
    <div>
      <h1>Hello user page {hello.data.text}</h1>
    </div>
  );
}