import { useEffect, useRef, useState } from "react";

import { atom, useAtom } from "jotai";

import { fetchIcons } from "@/lib/getIcons";

const countAtom = atom(0);
const searchAtom = atom("");
const dataAtom = atom<any[]>([]);
const fetchedAllAtom = atom(false);
const isFirstLoadAtom = atom(true);
const iconInfoAtom = atom({ license: "", github: "" });

function useQuery(path?: string) {
  const [data, setData] = useAtom(dataAtom);
  const [isFirstLoad, setIsFirstLoad] = useAtom(isFirstLoadAtom);
  const [loading, setLoading] = useState(false);
  const [fetchedAll, setFetchedAll] = useAtom(fetchedAllAtom);
  const [searchValue, setSearchValue] = useAtom(searchAtom);
  const [iconInfo, setIconInfo] = useAtom(iconInfoAtom);
  const [inView, setInView] = useState<any>();
  const [entry, setEntry] = useState<any>({});

  const [countRef, setCountRef] = useAtom(countAtom);

  useEffect(() => {
    const handleExec = async () => {
      if (path) {
        const { icons } = await fetchIcons(countRef, path as any, searchValue);
        setIsFirstLoad(false);
        setData(icons);
        setCountRef(countRef + 1);
      }
    };
    handleExec();
  }, []);

  useEffect(() => {
    const handleSetIntersection = () => {
      if (entry?.isIntersecting && !fetchedAll) {
        setLoading(true);
        fetchIcons(countRef, path as any, searchValue).then(
          ({ icons, fetchedAll }) => {
            setFetchedAll(fetchedAll);
            setData((prev) => [...prev, ...icons]);
            setLoading(false);
            setCountRef((prev) => prev + 1);
            setLoading(false);
          }
        );
      }
    };
    handleSetIntersection();
  }, [inView, countRef, fetchedAll]);

  const handleSearch = async (searchValue: string) => {
    fetchIcons(0, path as any, searchValue).then(({ icons, fetchedAll }) => {
      setData([...icons]);
      setLoading(false);

      if (!searchValue) {
        setCountRef(0);
      } else {
        setCountRef(() => 1);
      }

      setFetchedAll(fetchedAll);
      setSearchValue(searchValue);
    });
  };

  return { data, loading, handleSearch, isFirstLoad, setInView, setEntry };
}

export default useQuery;
