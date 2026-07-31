import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPageContent from "@/components/pages/ServiceDetailPageContent";
import { SERVICES } from "@/lib/site";
import { SERVICE_DETAILS } from "@/lib/service-details";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const detail = SERVICE_DETAILS[slug];

  return <ServiceDetailPageContent service={service} detail={detail} />;
}
