import { useState } from "react";
import CustomSelect from "./CustomSelect"; // Import CustomSelect here

const Table = ({ title = "New Users", headers = {}, data = [] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = parseInt(localStorage.getItem("option"), 10) || 10;

    // Filtered data based on search
    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Paginated data
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="table-container border rounded-md shadow-md p-4">
            {/* Table Title */}
            {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

            {/* Rows Per Page Dropdown */}
            <CustomSelect />

            {/* Search and Rows Per Page Controls */}
            <div className="flex justify-between items-center mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />


            </div>

            {/* Table Structure */}
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        {/* Render headers dynamically */}
                        {Object.keys(headers).map((key) => (
                            <th
                                key={key}
                                className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
                            >
                                {headers[key]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render rows dynamically */}
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.keys(headers).map((key) => (
                                    <td key={key} className="border border-gray-300 px-4 py-2">
                                        {row[key] || "-"} {/* Show "-" if the key is not present */}
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
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of{" "}
                    {Math.ceil(filteredData.length / rowsPerPage)}
                </span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) =>
                            Math.min(prev + 1, Math.ceil(filteredData.length / rowsPerPage))
                        )
                    }
                    className="px-4 py-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    disabled={
                        currentPage === Math.ceil(filteredData.length / rowsPerPage)
                    }
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
