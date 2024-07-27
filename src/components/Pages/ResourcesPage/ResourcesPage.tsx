import React, { useEffect, useState } from "react";

import style from "./ResourcesPage.module.scss";
import resources from "../../../assets/json/resources.json";

import TelegramApi from "../../api/TelegramApi";
import Header from "../../Elements/Header/Header";
import SearchBar from "../../Elements/SearchBar/SearchBar";
import List, { ListProps } from "../../Elements/List/List";
import Loader from "../../Elements/Loader/Loader";

export default function ResourcesPage() {
  const [channelsData, setChannelsData] = useState<ListProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const api = new TelegramApi();

    async function fetchChannelsData() {
      setIsLoading(true);
      try {
        const channelsData = await Promise.all(
          resources.map((resource) => api.getChannelData(resource))
        );

        const channelsDataFiltered = channelsData.filter(
          (channelData) => channelData !== undefined
        );
        const channelsListProps = channelsDataFiltered.map((channelData) => {
          return {
            modal: {
              ...channelData,
              onClick: (link: string) => window.open(link, "_blank"),
            },
          };
        });
        setChannelsData(channelsListProps);
      } catch (error) {
        console.error("Error fetching channel data");
      } finally {
        setIsLoading(false);
      }
    }

    if (resources.length > 0) {
      fetchChannelsData();
    }
  }, []);

  useEffect(() => {
    const hiddenData: ListProps[] = channelsData.map((data) => {
      const isInputEmpty = searchInput.trim() === "";
      if (isInputEmpty) return { ...data, hidden: false };

      const { title, description, theme } = data.modal;
      const isInputMatch = isSubstrInTexts(searchInput, [
        title,
        description!,
        theme,
      ]);

      return { modal: { ...data.modal }, hidden: !isInputMatch };
    });

    setChannelsData(hiddenData);
  }, [searchInput]);

  const isSubstrInTexts = (substring: string, texts: string[]): boolean => {
    const isSubstrInTexts = texts.reduce((sum, text) => {
      return text.toLowerCase().includes(substring.toLowerCase())
        ? sum + 1
        : sum;
    }, 0);
    return isSubstrInTexts > 0;
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.trim().toLowerCase();
    setSearchInput(searchInput);
  };

  if (isLoading) {
    return <Loader text={"Загружаем каналы..."} />;
  }

  return (
    <div className={style.resources__wrapper} key="resources">
      <Header
        borders={true}
        children={<SearchBar onChange={handleSearchInput} />}
      />
      <List props={channelsData} />
    </div>
  );
}

