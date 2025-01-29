import './data-table.theme.scss'

export default function DataTable({ data }) {
    return (
        <div className="table-container">
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        {Object.keys(data[0]).map((key) => (
                            <th
                                key={key}
                                className="border border-gray-200 px-4 py-2 text-left"
                            >
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
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