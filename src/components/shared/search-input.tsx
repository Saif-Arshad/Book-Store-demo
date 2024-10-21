import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface SearchInputProps {
    callback: (value: string) => void;
    name?: string;
    debounceTime?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
    callback,
    name,
    debounceTime = 500,
}) => {
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [debouncedValue, setDebouncedValue] = useState<string>(""); 

    // Initialize input with query parameter value from URL (if exists)
    useEffect(() => {
        const queryValue = searchParams.get("query"); // Get 'query' param from URL
        if (queryValue) {
            setInputValue(queryValue); // Set input value from URL query
        }
    }, []);
    // Update debounced value after the user stops typing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
            callback(inputValue)
        }, debounceTime);

        return () => {
            clearTimeout(handler); // Clear timeout if the user types again within the debounce period
        };
    }, [inputValue]);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="relative w-full mb-8">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600">
                    <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
            </div>
            <input
                type="text"
                name={name}
                placeholder={`Search Books`}
                value={inputValue}
                onChange={handleInputChange}
                id="voice-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />

        </div>

    );
};

export default SearchInput;