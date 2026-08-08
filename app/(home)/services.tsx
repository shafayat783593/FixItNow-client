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
      <section className="relative overflow-hidden py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-muted-foreground">No services available right now.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Popular services
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
