export const setLocalStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
};

export const getLocalStorage = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null; 
};

export const removeLocalItem = (key) => {
    localStorage.removeItem(key);
};

// localStorage.clear()