import { getAllService, IService } from "@/lib/api/service";
// import ServiceCard from "./_components/ServiceCard";
import { ServiceCard } from "../(public)/_components/service/serviceCard";
// import ServiceCard from "./_components/ServiceCard";


export interface ServiceData {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  duration: number; 
  createdAt: string;
  updatedAt: string;
}

interface ServiceCardProps {
  service: ServiceData;
}




export default async function Services() {
  const response = await getAllService({ limit: 8 });
  const services: ServiceData[] = response?.data ?? [];
  if (!services.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-slate-500">No services available right now.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Popular services
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}