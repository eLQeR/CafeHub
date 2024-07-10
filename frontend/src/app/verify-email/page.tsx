'use client';

import { Loader } from '@/components/Loader';
import { API } from '@/services/apiRequests';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import s from './verify.module.scss';
import Link from 'next/link';

const Verify = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const uuid = searchParams.get('uuid') || '';
  const isMounted = useRef(false);

  useEffect(() => {
    if (!uuid) return;

    if (!isMounted.current) {
      setIsLoading(true);
      API.getEmailVerify(uuid)
        .then((res) => {
          if (res.result) {
            setResponse(res.result);
            toast.success('Ви успішно активували Ваш акаунт');
          } else if (res.detail) {
            setResponse(res.detail);
            toast.error('Ви перейшли за помилковим посиланням');
          }
        })
        .finally(() => setIsLoading(false));

      isMounted.current = true;
    }
  }, [uuid]);

  return (
    <main>
      <div className={s.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {response === 'Your email has been verified' && (
              <h1 className={s.response}>Ви успішно активували Ваш акаунт</h1>
            )}
            {response === 'No User matches the given query.' && (
              <h1 className={s.response}>
                Ви перейшли за помилковим посиланням
              </h1>
            )}
            {response !== '' && (
              <div className={s.buttons}>
                <Link className={s.link} href='/'>
                  На головну
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Verify;
