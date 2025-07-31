import { useQuery } from "@tanstack/react-query";
import { FileText, Download, Calendar, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";

interface AnnualReport {
  id: number;
  title: string;
  year: number;
  description?: string;
  fileUrl: string;
  fileSize?: string;
  downloadCount?: number;
}

export default function AnnualReportsSection() {
  const { data: reports = [], isLoading } = useQuery<AnnualReport[]>({
    queryKey: ['/api/annual-reports'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6 space-y-4">
                  <div className="h-12 w-12 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleDownload = (report: AnnualReport) => {
    // In a real implementation, this would track the download
    window.open(report.fileUrl, '_blank');
  };

  return (
    <section className="py-16 bg-white" id="reports">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-neutral">Annual Reports</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transparent reporting of our impact, finances, and achievements year over year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {report.year}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-neutral mb-2">
                {report.title}
              </h3>

              {report.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {report.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                {report.fileSize && (
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {report.fileSize}
                  </span>
                )}
                {report.downloadCount !== undefined && (
                  <span className="flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    {report.downloadCount} downloads
                  </span>
                )}
              </div>

              <Button
                onClick={() => handleDownload(report)}
                className="w-full group"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                Download Report
              </Button>
            </div>
          ))}
        </div>

        {reports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Annual reports will be available soon.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-neutral mb-2">Transparency & Accountability</h3>
            <p className="text-gray-600 text-sm">
              Our annual reports provide detailed insights into our programs, financial management, 
              and impact metrics. We believe in complete transparency with our donors and stakeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}