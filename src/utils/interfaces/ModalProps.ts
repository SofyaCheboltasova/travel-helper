import ChannelData from "./TelegramApi/ChannelData";

interface ModalProps extends ChannelData {
  onClick: (link: string) => void;
}

export default ModalProps;

