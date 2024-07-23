import ChannelData from "./TelegramApi/ChannelData";

interface ModalProps extends ChannelData {
  onClick: (link: string) => void;
  color?: string;
}

export default ModalProps;

