import React, { memo, useEffect, useCallback } from 'react';

let waiting = false;
function wait(ms: any) {
  if (!waiting) {
    waiting = true;
    console.log('waiting...');
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
    console.log('finished waiting...');
    waiting = false;
  }
}

// eslint-disable-next-line react/display-name
const SlowComponent = memo(({ onClick }: { onClick: any }) => {
  wait(2000);

  useEffect(() => {
    console.log('rendered SlowComponent');
  }, []);

  console.log('-- re-render of SlowComponent');

  return <button onClick={onClick}>Slow Component - button!</button>;
});

const ExampleWithUseCallback = () => {
  const [count, setCount] = React.useState(0);
  const onClick = useCallback(() => console.log('Hello!'), []);
  
  return (
    <>
      <h1>Example with useCallback</h1>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <p>
        Clicking to Increase Count should not trigger the Slow Component to
        re-render.
      </p>
      <SlowComponent onClick={onClick} />
    </>
  );
};

const Example = () => {
  const [count, setCount] = React.useState(0);
  const onClick = () => console.log('Hello!');
  return (
    <>
      <h1>Example with *no* useCallback</h1>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <p>
        Clicking to Increase Count *will* trigger the Slow Component to
        re-render.
      </p>
      <SlowComponent onClick={onClick} />
    </>
  );
};

const Callback = () => {
  return (
    <>
      <Example />
      <hr />
      <ExampleWithUseCallback />
    </>
  );
};

export default Callback;
