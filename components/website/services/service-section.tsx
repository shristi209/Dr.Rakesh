import { ServiceCard } from "./service-card";
import { ServiceData } from "@/app/api/apiservice";

interface ServicesSectionProps {
  serviceData: ServiceData;
}

export function ServicesSection({ serviceData }: ServicesSectionProps) {
  if (!serviceData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No services available at the moment.</p>
      </div>
    );
  }

  // Split title into words and handle coloring first two words
  const titleWords = serviceData.Title?.split(' ').filter(word => word.length > 0) || [];
  const firstTwoWordsTitle = titleWords.slice(0, 2).join(' ');
  const remainingWordsTitle = titleWords.slice(2).join(' ');

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-4">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                {serviceData.Name}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-emerald-600">{firstTwoWordsTitle}</span>
              {remainingWordsTitle && <span className="text-gray-900 ml-2">{remainingWordsTitle}</span>}
            </h2>

            <p className="text-gray-600 max-w-2xl leading-relaxed">
              {serviceData.Description}
            </p>
          </div>
        </div>

        <div>
          {!serviceData.details || serviceData.details.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No service details available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceData.details.map((detail) => (
                <ServiceCard
                  key={detail.DetailID}
                  title={detail.ServiceTitle}
                  description={detail.ServiceDescription}
                  image={detail.ServicePicture}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
