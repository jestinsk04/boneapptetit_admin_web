import { TextInput } from "flowbite-react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBoxProps {
  handleSearchArgument: (text: string) => void;
}

export const SearchBox = ({ handleSearchArgument }: SearchBoxProps) => {
  return (
    <TextInput
      icon={FaMagnifyingGlass}
      type="text"
      placeholder="Buscar"
      onChange={(e) => handleSearchArgument(e.target.value)}
    />
  );
};
