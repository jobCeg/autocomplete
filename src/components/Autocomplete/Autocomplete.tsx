import { useRef, useState } from 'react';
import { useAutocomplete } from '../../hooks/useAutocomplete';
import './Autocomplete.css';
import { useClickOutside } from '../../hooks/useClickOutside';

export type AutocompleteOption = {
  label: string;
  value: string;
};

export interface AutocompleteProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  loading?: boolean;
  onSelect?: (selected: AutocompleteOption) => void;
  options: AutocompleteOption[];
  placeholder?: string;
}

export const Autocomplete = ({
  inputProps = {},
  label,
  loading = false,
  onSelect = () => {},
  options = [],
  placeholder,
}: AutocompleteProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { suggestions, loading: isSearching } = useAutocomplete({
    inputText,
    options,
  });
  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);
  useClickOutside(containerRef, closeDropdown);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleOptionClick = (option: AutocompleteOption) => () => {
    onSelect(option);
    setInputText(option.label);
    setShowDropdown(false);
  };

  const highlightMatch = (text: string) => {
    const index = text.toLowerCase().indexOf(inputText.toLowerCase());
    if (index === -1) return text;
    const before = text.slice(0, index);
    const match = text.slice(index, index + inputText.length);
    const after = text.slice(index + inputText.length);
    return (
      <>
        {before}
        <strong>{match}</strong>
        {after}
      </>
    );
  };

  return (
    <div className="autocomplete" data-testid="autocomplete" ref={containerRef}>
      <label className="autocomplete__label" htmlFor="autocomplete">
        {label}
      </label>
      <input
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-label="Autocomplete input"
        className="autocomplete__input"
        disabled={loading}
        id="autocomplete"
        name="autocomplete"
        onChange={handleChange}
        onFocus={openDropdown}
        placeholder={placeholder}
        role="combobox"
        type="text"
        value={inputText}
        {...inputProps}
      />
      {showDropdown && (
        <div
          aria-label="Autocomplete suggestions"
          className="autocomplete__suggestions-container"
          role="listbox"
        >
          <div className="autocomplete__suggestions-list">
            {isSearching ? (
              <div className="autocomplete__suggestions-option">Searching...</div>
            ) : (
              suggestions.map((option) => (
                <div
                  className="autocomplete__suggestions-option"
                  key={option.value}
                  onClick={handleOptionClick(option)}
                  role="option"
                >
                  {highlightMatch(option.label)}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
