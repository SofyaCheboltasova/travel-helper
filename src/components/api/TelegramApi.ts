import ModalProps from "../../utils/interfaces/ModalProps";
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

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description);
    }

    return data.result;
  }

  public getChannelData = async (
    resourceData: ResourceData
  ): Promise<ModalProps> => {
    const channelData: ModalProps = await this.handleFetch(
      "getChat",
      "chat_id",
      `@${resourceData.link}`
    );

    const { id, title, description } = channelData;
    const { theme, link } = resourceData;
    const channelLink = `https://t.me/${link}`;

    const returnData: ModalProps = {
      id: id,
      title: title,
      description: description,
      theme: theme,
      link: channelLink,
    };

    return returnData;
  };
}

