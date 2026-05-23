import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { GripVertical } from "lucide-react";

export default function SortableField({
  id,
  children,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(
      transform
    ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-grab items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-800 active:cursor-grabbing"
      >
        <GripVertical size={18} />
      </div>

      {children}
    </div>
  );
}