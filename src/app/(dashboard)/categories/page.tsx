import { ModuleRouteGuard } from "@/features/permissions/components/ModuleRouteGuard";
import { CategoriesView } from "@/features/categories/components/CategoriesView";

export default function CategoriesPage() {
  return (
    <ModuleRouteGuard module="categories" action="read">
      <CategoriesView />
    </ModuleRouteGuard>
  );
}
