import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { arrayMove } from "@dnd-kit/sortable";

import SortableField from "../builder/SortableField";

export default function FormRenderer({
  schema,
  setSchema,
  selectedFieldId,
  setSelectedFieldId,
  previewMode,
}) {
  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "date":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            className="border-zinc-800 bg-zinc-950"
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            className="border-zinc-800 bg-zinc-950"
          />
        );

      case "select":
        return (
          <select
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
          >
            {field.options?.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <input type="checkbox" />

            <span className="text-sm">{field.label}</span>
          </div>
        );

      default:
        return null;
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = schema.findIndex((field) => field.id === active.id);

    const newIndex = schema.findIndex((field) => field.id === over.id);

    setSchema((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={schema.map((field) => field.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-5">
          {schema.map((field) => {
            const isSelected = selectedFieldId === field.id;

            return (
              <SortableField id={field.id} key={field.id}>
                <div
                  onClick={() => {
                    if (!previewMode) {
                      setSelectedFieldId(field.id);
                    }
                  }}
                  className={`
  rounded-xl border p-4 transition
  ${
    previewMode
      ? "border-transparent"
      : isSelected
      ? "border-white cursor-pointer"
      : "border-zinc-800 cursor-pointer"
  }
`}
                >
                  {field.type !== "checkbox" && (
                    <Label className="mb-2 block">{field.label}</Label>
                  )}

                  <div>
                    {renderField(field)}
                  </div>
                </div>
              </SortableField>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
