import { useState } from 'react';
import './data-table.theme.scss'

export default function DataTable({ data }) {
    console.log(data)
    const [tableData, setTableData] = useState(data);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }

        const sortedData = [...tableData].sort((a, b) => {
            if (a[key] === null) return 1;
            if (b[key] === null) return -1;

            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setTableData(sortedData);
    };

    const handleDownloadCSV = () => {
        const headers = Object.keys(data[0]).join(","); 
        const rows = tableData
            .map((row) =>
                Object.values(row)
                    .map((value) => (value === null ? "N/A" : value))
                    .join(",")
            )
            .join("\n"); 

        const csvContent = [headers, rows].join("\n"); 
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "table_data.csv";
        link.click();

        URL.revokeObjectURL(url);
    };
    return (
        <div className="table-container">
            <div className="flex justify-between mb-4">
                <button
                    className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-200"
                    onClick={handleDownloadCSV}
                >
                    Save as CSV
                </button>
            </div>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        {Object.keys(data[0]).map((key) => (
                            <th
                                key={key}
                                className="border border-gray-200 px-4 py-2 text-left"
                                onClick={() => handleSort(key)}
                            >
                                {key}{" "}
                                {sortConfig.key === key
                                    ? sortConfig.direction === "ascending"
                                        ? "↑"
                                        : "↓"
                                    : ""}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            {Object.values(row).map((value, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="border border-gray-200 px-4 py-2 text-left"
                                >
                                    {value === null ? "N/A" : value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};