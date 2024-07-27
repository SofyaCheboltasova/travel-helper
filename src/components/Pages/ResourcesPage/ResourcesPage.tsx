import React, { useEffect, useState } from "react";

import style from "./ResourcesPage.module.scss";
import resources from "../../../assets/json/resources.json";

import TelegramApi from "../../api/TelegramApi";
import Header from "../../Elements/Header/Header";
import Loader from "../../Elements/Loader/Loader";
import SearchBar from "../../Elements/SearchBar/SearchBar";
import List, { ListProps } from "../../Elements/List/List";
import ChannelData from "../../../utils/interfaces/TelegramApi/ChannelData";

export default function ResourcesPage() {
  const [channelsData, setChannelsData] = useState<ListProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const api = new TelegramApi();

  useEffect(() => {
    resources && fetchChannelsData();
  }, []);

  useEffect(() => {
    const channels: ListProps[] = hideChannels();
    setChannelsData(channels);
  }, [searchInput]);

  const fetchChannelsData = async () => {
    setIsLoading(true);
    try {
      const channelsData = await Promise.all(
        resources.map((resource) => api.getChannelData(resource))
      );
      const channelsListProps = getListProps(channelsData);
      setChannelsData(channelsListProps);
    } catch (error) {
      console.error("Error fetching channel data");
    } finally {
      setIsLoading(false);
    }
  };

  const getListProps = (channelsData: (ChannelData | undefined)[]) => {
    const filteredData = channelsData.filter((c) => !!c);
    const channelsListProps = filteredData.map((channelData) => {
      const updatedModal = {
        ...channelData,
        onClick: (link: string) => window.open(link, "_blank"),
      };
      return { modal: updatedModal };
    });
    return channelsListProps;
  };

  const hideChannels = () => {
    const newData = channelsData.map((data) => {
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

    return newData;
  };

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

