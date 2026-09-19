import { CategoriesView } from "@/features/categories/components/CategoriesView";
import { ModuleRouteGuard } from "@/features/permissions/components/ModuleRouteGuard";

export default function CategoriesPage() {
  return (
    <ModuleRouteGuard module="categories" action="read">
      <CategoriesView />
    </ModuleRouteGuard>
  );
}
