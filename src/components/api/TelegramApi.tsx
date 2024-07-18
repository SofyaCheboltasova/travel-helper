import ChannelData from "../../utils/interfaces/ChannelData";
import ResourceData from "../../utils/interfaces/ResourceData";

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

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description);
    }

    return data.result;
  }

  public getChannelData = async (
    resourceData: ResourceData
  ): Promise<ChannelData> => {
    const channelData: ChannelData = await this.handleFetch(
      "getChat",
      "chat_id",
      `@${resourceData.name}`
    );

    const { id, title, description } = channelData;
    const { theme, name } = resourceData;
    const channelLink = `https://t.me/${name}`;

    const returnData: ChannelData = {
      id: id,
      title: title,
      description: description,
      theme: theme,
      name: channelLink,
    };

    return returnData;
  };
}

