'use client';
import { useSearchParams } from 'next/navigation';
import { removeKeysFromUrlQuery } from '@jsmastery/utils';

interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Searchbar({ value, onChange }: SearchbarProps) {
  const searchParams = useSearchParams();

  const handleClear = () => {
    onChange('');
    const newUrl = removeKeysFromUrlQuery({
      params: searchParams.toString(),
      keysToRemove: ['query'],
    });
    window.history.pushState({}, '', newUrl);
  };

  return (
    <div className="mb-6 flex justify-center relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or email..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}