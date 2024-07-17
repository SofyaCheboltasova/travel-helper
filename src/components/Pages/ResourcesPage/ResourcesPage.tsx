import React, { useEffect, useState } from "react";

import resources from "../../../assets/json/resources.json";
import style from "./ResourcesPage.module.scss";

import Modal from "../../Elements/Modal/Modal";
import ChannelData from "../../../utils/interfaces/ChannelData";
import TelegramApi from "../../../api/TelegramApi";

const ResourcesPage = React.memo(() => {
  const [channelData, setChannelData] = useState<ChannelData[]>([]);
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
        console.error("Error fetching channel data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (resources.length > 0) {
      fetchAllChannelData();
    }
  }, []);

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  return (
    <div className={style.content}>
      <ul className={style.list}>
        {channelData.map((data) => (
          <li key={data.id}>
            <Modal data={data} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ResourcesPage;

