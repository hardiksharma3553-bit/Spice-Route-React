import { useRef } from 'react';

function Example() {
  const inputRef = useRef(null);

  return (
    <input ref={inputRef} placeholder="Enter name" />
  );
}

export default Example;