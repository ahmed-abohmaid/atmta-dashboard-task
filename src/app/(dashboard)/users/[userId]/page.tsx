import { UserProfileView } from "@/features/users/components/profile/UserProfileView";

interface UserProfilePageProps {
  params: Promise<{ userId: string }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { userId } = await params;
  return <UserProfileView userId={userId} />;
}
