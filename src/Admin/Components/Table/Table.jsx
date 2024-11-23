import React, { useState, useEffect, useCallback } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import { getLocalStorage } from "../../../LocalStorage/LocalStorage";

const Table = ({ title = '', headers = [], data = [], filter = false, searchInput = false }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(
        parseInt(getLocalStorage("option"), 10) || 10
    );

    useEffect(() => {
        const savedOption = parseInt(getLocalStorage("option"), 10) || 10;
        setRowsPerPage(savedOption);
        setCurrentPage(1);
    }, []);

    const handleRowsPerPageChange = useCallback((option) => {
        setRowsPerPage(parseInt(option, 10));
        setCurrentPage(1);
    });

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Paginated data based on the selected rowsPerPage
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const propsOptions = ["2", "5", "10", "20", "30", "50"];
    return (
        <div className="table-container border rounded-md shadow-md p-4">
            <div className="flex items-center justify-between mb-3 h-8">
                <div>
                    {filter && <CustomSelect onSelect={handleRowsPerPageChange} options={propsOptions} />}
                </div>
                <div>
                    {searchInput && (
                        <div className="flex justify-between items-center">
                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-8 px-4 py-2 focus:outline-none focus:border-b-2 border-primary inputShadow"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Table Title */}
            {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

            {/* Table Structure */}
            <table className="table-auto border-collapse border border-gray-300 overflow-x-scroll w-full">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="border border-gray-300 px-4 py-2 bg-gray-100 text-left capitalize font-medium"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(headers).map((headerKey) => (
                                    <td key={headerKey} className="border border-gray-300 px-5 py-3 text-sm">
                                        {row[headerKey] || "N/A"}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                className="border border-gray-300 px-4 py-2 text-center"
                                colSpan={Object.keys(headers).length}
                            >
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {filter && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-4 py-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        className="px-4 py-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default React.memo(Table);
