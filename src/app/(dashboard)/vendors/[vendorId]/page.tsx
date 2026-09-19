import { VendorDetailView } from "@/features/vendors/components/details/VendorDetailView";

interface VendorDetailPageProps {
  params: Promise<{ vendorId: string }>;
}

export default async function VendorDetailPage({ params }: VendorDetailPageProps) {
  const { vendorId } = await params;
  return <VendorDetailView vendorId={vendorId} />;
}
