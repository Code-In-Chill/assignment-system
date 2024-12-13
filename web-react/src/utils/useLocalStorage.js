import {useEffect, useState} from "react";

function useLocalStorage(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);

        // If the stored value is not null, parse it, otherwise return the default value
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;