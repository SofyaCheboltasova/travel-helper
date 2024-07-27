interface ModalProps {
  title: string;
  description?: string;
  theme: string;
  onClick?: (link: string) => void;
  id?: string;
  link?: string;
  color?: string;
  opened?: boolean;
  image?: string;
}

export default ModalProps;

