import React, { useState } from "react";
import { setLocalStorage, getLocalStorage } from "../../../LocalStorage/LocalStorage";

const CustomSelect = ({ onSelect, options= [] }) => {
    const [selected, setSelected] = useState(getLocalStorage("option") || "10");
    const [isOpen, setIsOpen] = useState(false);
   

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option) => {
        setSelected(option);
        setLocalStorage("option", option);
        setIsOpen(false);
        if (onSelect) onSelect(option); 
    };

    return (
        <div className="relative w-20">
            <button
                className="w-full h-8 px-5 border border-primary bg-white text-left outline-none"
                onClick={toggleDropdown}
            >
                {selected}
            </button>

            {/* Dropdown options */}
            {isOpen && (
                <ul className="absolute w-full border border-primary bg-white z-10">
                    {options.map((option) => (
                        <li
                            key={option}
                            className="px-5 py-2 hover:bg-primary hover:text-white cursor-pointer rounded-none"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default React.memo(CustomSelect);
