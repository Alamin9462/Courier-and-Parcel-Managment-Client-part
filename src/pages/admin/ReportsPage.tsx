/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FileText, Download, CalendarDays } from "lucide-react";
import { useLazyExportParcelsCSVQuery  } from "../../redux/feature/parcel/Parcel";


const reports = [
  {
    id: 1,
    name: "Monthly Parcel Report",
    date: "2025-08-01",
    type: "PDF",
    size: "1.2 MB",
  },
  {
    id: 2,
    name: "Agent Performance",
    date: "2025-07-31",
    type: "Excel",
    size: "800 KB",
  },
  {
    id: 3,
    name: "Revenue Summary",
    date: "2025-07-30",
    type: "PDF",
    size: "950 KB",
  },
  {
    id: 4,
    name: "Failed Deliveries",
    date: "2025-07-29",
    type: "PDF",
    size: "600 KB",
  },
];

const ReportsPage = () => {
  const [triggerExport] : any = useLazyExportParcelsCSVQuery (undefined);

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDownload = async (reportId: number) => {
    try {
      setLoadingId(reportId);
      const res = await triggerExport();

      if (!res.data) throw new Error("No data received");

      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      a.download = "parcel_report.csv";

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setLoadingId(null);
    } catch (err) {
      setLoadingId(null);
      alert("ডাউনলোডে সমস্যা হয়েছে!");
      console.error(err);
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-[#202938]">
        <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-[#007088]" /> Reports
      </h1>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-[500px] w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-[#F5F7FA]">
            <tr>
              <th>Report Name</th>
              <th>Date</th>
              <th>Type</th>
              <th>Size</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 transition">
                <td className="px-2 py-2 font-medium text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#007088]" /> {report.name}
                </td>
                <td className="px-2 py-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#007088]" />
                  <span>{report.date}</span>
                </td>
                <td className="px-2 py-2">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    {report.type}
                  </span>
                </td>
                <td className="px-2 py-2">{report.size}</td>
                <td className="px-2 py-2">
                  <button
                    onClick={() => handleDownload(report.id)}
                    disabled={loadingId === report.id}
                    className="p-1 rounded hover:bg-blue-100 flex items-center gap-1"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-blue-600" />
                    {loadingId === report.id ? "Downloading..." : "Download"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;