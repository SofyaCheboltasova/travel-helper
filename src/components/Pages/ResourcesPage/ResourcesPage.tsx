import React, { useEffect, useState } from "react";

import style from "./ResourcesPage.module.scss";
import resources from "../../../assets/json/resources.json";

import Modal from "../../Elements/Modal/Modal";
import TelegramApi from "../../api/TelegramApi";
import SearchBar from "../../Elements/SearchBar/SearchBar";
import Header from "../../Elements/Header/Header";
import ModalProps from "../../../utils/interfaces/ModalProps";

export default function ResourcesPage() {
  const [channelData, setChannelData] = useState<ModalProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const api = new TelegramApi();

    async function fetchAllChannelData() {
      setIsLoading(true);
      try {
        const allChannelData = await Promise.all(
          resources.map((resource) => api.getChannelData(resource))
        );
        setChannelData(allChannelData.flat());
      } catch (error) {
        console.error("Error fetching channel data");
      } finally {
        setIsLoading(false);
      }
    }

    if (resources.length > 0) {
      fetchAllChannelData();
    }
  }, []);

  useEffect(() => {
    const searchedData: ModalProps[] = channelData.map((data) => {
      const isInputEmpty: boolean = searchInput.trim() === "";
      if (isInputEmpty) return { ...data, hidden: false };

      const { title, description, theme } = data;
      const isInputMatch: boolean = isSubstrInTexts(searchInput, [
        title,
        description,
        theme,
      ]);

      return { ...data, hidden: !isInputMatch };
    });

    setChannelData(searchedData);
  }, [searchInput]);

  const isSubstrInTexts = (substring: string, texts: string[]): boolean => {
    const isSubstrInTexts = texts.reduce((sum, text) => {
      return text.toLowerCase().includes(substring.toLowerCase())
        ? sum + 1
        : sum;
    }, 0);
    return isSubstrInTexts > 0;
  };

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.trim().toLowerCase();
    setSearchInput(searchInput);
  };

  return (
    <div className={style.resources__wrapper} key="resources">
      <Header children={<SearchBar onChange={handleSearchInput} />} />

      <ul className={style.resources__list}>
        {channelData.map((data) => (
          <li key={data.id} className={data.hidden ? style.hidden : ""}>
            <Modal data={data} />
          </li>
        ))}
      </ul>
    </div>
  );
}

