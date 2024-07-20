interface ModalProps {
  id: string;
  title: string;
  description: string;
  theme: string;
  onClick: (link: string) => void;
  link?: string;
  image?: string;
  hidden?: boolean;
}

export default ModalProps;

