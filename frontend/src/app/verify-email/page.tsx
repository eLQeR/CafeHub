'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
  const searchParams = useSearchParams();
  const [uuid, setUuid] = useState<string | null>('');
  console.log('searchParams:', searchParams);

  useEffect(() => {
    if (searchParams) {
      setUuid(searchParams.get('uuid'));
    }
  }, []);

  return (
    <main>
      <h1>email verification</h1>
      {uuid}
    </main>
  );
};

export default page;
