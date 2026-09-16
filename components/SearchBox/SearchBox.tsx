import React from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value?: string;
  defaultValue?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ value, defaultValue, onChange }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default SearchBox;
