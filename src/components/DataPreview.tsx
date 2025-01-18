import React from 'react';
import { Table } from 'lucide-react';

interface DataPreviewProps {
  data: string;
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
  const parsedData = JSON.parse(data);
  const headers = Object.keys(parsedData[0] || {});

  return (
    <div className="h-full overflow-auto">
      {parsedData.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-500">
          <Table className="w-12 h-12 mb-2" />
          <p>No data available</p>
        </div>
      ) : (
        <div className="p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parsedData.slice(0, 100).map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {headers.map((header) => (
                    <td
                      key={`${rowIndex}-${header}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {row[header]?.toString() || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {parsedData.length > 100 && (
            <div className="text-center py-4 text-sm text-gray-500">
              Showing first 100 rows of {parsedData.length} total rows
            </div>
          )}
        </div>
      )}
    </div>
  );
};