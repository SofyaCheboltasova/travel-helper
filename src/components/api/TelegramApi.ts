import ModalProps from "../../utils/interfaces/ModalProps";
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

  private async handleFetch(method: string, field: string, param: string) {
    const response = await fetch(
      `${this.queryString}/${method}?${field}=${param}`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.result;
  }

  public getChannelData = async (
    resourceData: ResourceData
  ): Promise<ChannelData> => {
    const channelData: ModalProps = await this.handleFetch(
      "getChat",
      "chat_id",
      `@${resourceData.link}`
    );

    const { id, title, description } = channelData;
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
  };
}

