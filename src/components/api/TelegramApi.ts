import axios from "axios";
import ChannelData from "../../utils/interfaces/TelegramApi/ChannelData";
import ResourceData from "../../utils/interfaces/TelegramApi/ResourceData";

export default class TelegramApi {
  private botToken: string;
  private queryString: string;
  private url: string = "https://api.telegram.org";

  constructor() {
    this.botToken = `bot${import.meta.env.VITE_TELEGRAM_TOKEN}`;
    this.queryString = `${this.url}/${this.botToken}`;
  }

  public getChannelData = async (
    resourceData: ResourceData
  ): Promise<ChannelData | undefined> => {
    try {
      const channelData = await axios.get(`${this.queryString}/getChat`, {
        params: {
          chat_id: `@${resourceData.link}`,
        },
      });

      const { id, title, description } = channelData.data.result;
      const { theme, link } = resourceData;
      const channelLink = `https://t.me/${link}`;

      const returnData: ChannelData = {
        id: id,
        title: title,
        description: description,
        theme: theme,
        link: channelLink,
      };

      return returnData;
    } catch (error) {
      console.error("Error while fetching channels:", error);
    }
  };
}

