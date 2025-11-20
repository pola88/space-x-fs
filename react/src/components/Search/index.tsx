import { useState } from "react";
import searchIcon from "assets/images/search.svg";
import closeIcon from "assets/images/close.svg";
import { debounce } from "utils/debounce";
import "./index.scss";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const Search = ({ value, onChange }: SearchProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const clear = () => {
    onChange("");
    setCurrentValue("");
  };

  const debouncedOnChange = debounce(onChange, 500);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    const newValue = e.target.value.trim();
    if (newValue.length > 3) {
      debouncedOnChange(newValue);
    } else {
      debouncedOnChange("");
    }
  };

  return (
    <div className="search-input">
      <img className="search-icon" src={searchIcon} alt="Search" />
      <input
        type="text"
        value={currentValue}
        onChange={handleChange}
      />
      {currentValue && <img className="close-icon" src={closeIcon} onClick={clear} alt="Close" />}
    </div>
  );
};
