export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
    }
};

export const getLocalStorage = (key) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Error getting localStorage key "${key}":`, error);
        return null;
    }
};

export const removeLocalItem = (key) => {
    localStorage.removeItem(key);
};

// localStorage.clear()