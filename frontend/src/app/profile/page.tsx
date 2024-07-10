import { getServerSession } from 'next-auth';
import { authConfig } from '../configs/auth';

const page = async () => {
  const session = await getServerSession(authConfig);
  return (
    <main>
      <h1>User profile page</h1>
      email: {session?.user?.email}
      <br />
      is_email_verified: {session?.user?.is_email_verified ? '+' : '-'}
    </main>
  );
};

export default page;
