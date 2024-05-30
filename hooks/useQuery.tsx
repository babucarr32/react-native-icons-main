import { useEffect, useRef, useState } from "react";

import { atom, useAtom } from "jotai";

import { fetchIcons } from "@/lib/getIcons";

const dataAtom = atom<any[]>([]);
const searchAtom = atom("");
const countAtom = atom(0);
const fetchedAllAtom = atom(false);

function useQuery(path?: string) {
  const [data, setData] = useAtom(dataAtom);
  const [loading, setLoading] = useState(false);
  const [fetchedAll, setFetchedAll] = useAtom(fetchedAllAtom);
  const [searchValue, setSearchValue] = useAtom(searchAtom);
  const [inView, setInView] = useState<any>();
  const [entry, setEntry] = useState<any>({});

  const [countRef, setCountRef] = useAtom(countAtom);

  useEffect(() => {
    const handleExec = async () => {
      if (path) {
        const result = await fetchIcons(countRef, path as any, searchValue);
        setData(result);
        setCountRef(countRef + 1);
      }
    };
    handleExec();
  }, []);

  useEffect(() => {
    const handleSetIntersection = () => {
      if (entry?.isIntersecting && !fetchedAll) {
        setLoading(true);
        fetchIcons(countRef, path as any, searchValue).then((result) => {
          setFetchedAll(result.length === 0);
          setData((prev) => [...prev, ...result]);
          setLoading(false);
          setCountRef((prev) => {
            return prev + 1;
          });
        });
      }
    };
    handleSetIntersection();
  }, [inView, countRef, fetchedAll]);

  const handleSearch = async (searchValue: string) => {
    fetchIcons(0, path as any, searchValue).then((result) => {
      setData([...result]);
      setLoading(false);

      if (!searchValue) {
        setCountRef(0);
      } else {
        setCountRef(() => 1);
      }

      setFetchedAll(false);
      setSearchValue(searchValue);
    });
  };

  return { data, loading, handleSearch, setInView, setEntry };
}

export default useQuery;
