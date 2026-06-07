import { useState } from 'react';

export const useCache = (key: string) => {
  const [data, setData] = useState<any>(null);
  const save = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    setData(value);
  };
  return { data, save };
};