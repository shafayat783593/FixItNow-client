// import Image from "next/image";
// import Link from "next/link";
// import { Star, MapPin } from "lucide-react";

// export interface IService {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   rating: number;
//   image: string;
//   location?: string;
// }

// export default function ServiceCard({ service }: { service: IService }) {
//   return (
//     <Link
//       href={`/services/${service.id}`}
//       className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
//     >
//       <div className="relative h-48 w-full overflow-hidden bg-slate-100">
//         <Image
//           src={service.image}
//           alt={service.title}
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           className="object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
//           {service.category}
//         </span>
//       </div>

//       <div className="p-4">
//         <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
//           {service.title}
//         </h3>
//         <p className="mt-1 line-clamp-2 text-sm text-slate-500">
//           {service.description}
//         </p>

//         <div className="mt-3 flex items-center justify-between">
//           <div className="flex items-center gap-1 text-sm text-slate-600">
//             <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
//             <span>{service.rating}</span>
//           </div>
//           {service.location && (
//             <div className="flex items-center gap-1 text-xs text-slate-400">
//               <MapPin className="h-3.5 w-3.5" />
//               <span className="line-clamp-1">{service.location}</span>
//             </div>
//           )}
//         </div>

//         <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
//           <span className="text-sm font-bold text-coral-600">
//             ৳{service.price}
//           </span>
//           <span className="text-xs font-medium text-coral-500 group-hover:underline">
//             View details →
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }