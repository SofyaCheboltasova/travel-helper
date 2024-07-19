interface SearchBarProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (value: string) => void;
  placeholder?: string;
}

export default SearchBarProps;

