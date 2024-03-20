import { useEffect, useState } from 'react';
import type { AutocompleteOption } from '../components/Autocomplete/Autocomplete';
import { useDebounce } from './useDebounce';

interface UseAutocompleteProps {
  inputText: string;
  options: AutocompleteOption[];
}

const DEBONCE_DELAY = 300 as const;

export const useAutocomplete = ({ inputText, options }: UseAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<AutocompleteOption[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedInputText = useDebounce(inputText, DEBONCE_DELAY);

  useEffect(() => {
    const filterSuggestions = async (text: string) => {
      setLoading(true);
      // Simulate async call
      await new Promise((resolve) => setTimeout(resolve, DEBONCE_DELAY));

      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(text.toLowerCase())
      );
      setLoading(false);
      setSuggestions(filtered);
    };

    if (debouncedInputText !== '') {
      filterSuggestions(debouncedInputText);
    } else {
      setSuggestions(options);
    }
  }, [debouncedInputText, options]);

  return {
    loading,
    suggestions,
  };
};
