"use client";

import { CategoryNode } from "@/@types/category";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { CategoryNodeRow } from "@/features/categories/components/CategoryTreeNode/CategoryNodeRow";

interface CategoryTreeNodeProps {
  node: CategoryNode;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  matchIds?: Set<string>;
  onAddChild: (category: CategoryNode) => void;
  onEdit: (category: CategoryNode) => void;
  onDelete: (category: CategoryNode) => void;
}

export function CategoryTreeNode({
  node,
  expandedIds,
  onToggleExpand,
  matchIds,
  onAddChild,
  onEdit,
  onDelete,
}: CategoryTreeNodeProps) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isMatched = matchIds?.has(node.id);

  return (
    <div className="flex flex-col">
      <Accordion
        multiple
        value={isExpanded ? [node.id] : []}
        onValueChange={() => onToggleExpand(node.id)}
        className="w-full"
      >
        <AccordionItem value={node.id} className="border-0">
          <CategoryNodeRow
            node={node}
            isExpanded={isExpanded}
            hasChildren={hasChildren}
            isMatched={isMatched}
            onToggle={() => onToggleExpand(node.id)}
            onAddChild={() => onAddChild(node)}
            onEdit={() => onEdit(node)}
            onDelete={() => onDelete(node)}
          />

          {hasChildren && (
            <AccordionContent className="pt-2 pb-0">
              <div className="border-border/40 hover:border-primary/30 ms-2.5 flex flex-col gap-2 border-s-2 ps-2.5 transition-colors sm:ms-4 sm:ps-3.5">
                {node.children.map((child) => (
                  <CategoryTreeNode
                    key={child.id}
                    node={child}
                    expandedIds={expandedIds}
                    onToggleExpand={onToggleExpand}
                    matchIds={matchIds}
                    onAddChild={onAddChild}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
