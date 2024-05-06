import NoHistory from "./NoHistory"

interface TransactionHistoryProps {
    userData: any;
    titles: any;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ userData, titles }) => {
    return <>{userData && (userData.userType === "donor") &&
        <>
            <div className="mt-4">
                <div className="border-[#1f1e1c] w-1200 flex items-start flex-col rounded-tr-lg rounded-br-lg p-10 bg-white shadow-md">
                    <h1 className='text-s text-[#2d2d2d] my-2'>
                        <b>Transaction History</b>
                    </h1>
                    <div className="overflow-x-auto">
                        {titles && titles.length > 0 ?
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2"></th>
                                        <th className="px-4 py-2">Campaign</th>
                                        <th className="px-4 py-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.historyCampaigns.map((data: any, idx: any) => (
                                        <tr key={idx}>
                                            <td className="border px-4 py-2">{idx + 1}</td>
                                            <td className="border px-4 py-2">{titles[idx]}</td>
                                            <td className="border px-4 py-2">{userData.historyAmount[idx]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <NoHistory />}
                    </div>
                </div>
            </div>
        </>
    }</>
}

export default TransactionHistory