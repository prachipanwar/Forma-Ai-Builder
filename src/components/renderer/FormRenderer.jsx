import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";

import { format } from "date-fns";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableField from "../builder/SortableField";

export default function FormRenderer({
  schema,
  setSchema,
  selectedFieldId,
  setSelectedFieldId,
  previewMode,
}) {
  const [selectedDates, setSelectedDates] = useState({});

  const inputRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const nextInput = inputRefs.current[index + 1];

      if (nextInput) {
        nextInput.focus();
      }
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

  const renderField = (field, index) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <Input
            ref={(el) => (inputRefs.current[index] = el)}
            type={field.type}
            placeholder={field.placeholder}
            onKeyDown={(e) => {
              if (previewMode) {
                handleKeyDown(e, index);
              }
            }}
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

      case "date":
        return (
          <Popover onClick={(e) => e.stopPropagation()}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start border-zinc-800 bg-zinc-950 text-left font-normal hover:bg-zinc-900"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {selectedDates[field.id] ? (
                  format(selectedDates[field.id], "PPP")
                ) : (
                  <span>Select date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto border-zinc-800 bg-zinc-950 p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={selectedDates[field.id]}
                onSelect={(date) =>
                  setSelectedDates((prev) => ({
                    ...prev,
                    [field.id]: date,
                  }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
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

            <span className="text-sm">
              <>
                {field.label}

                {field.required && <span className="ml-1 text-red-400">*</span>}
              </>
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  if (schema.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed border-zinc-800 text-zinc-500">
        No fields added yet
      </div>
    );
  }

  const fieldsContent = (
    <div className="space-y-5">
      {schema.map((field, index) => {
        const isSelected = selectedFieldId === field.id;

        const fieldCard = (
          <div
            onClick={() => {
              if (!previewMode) {
                setSelectedFieldId(field.id);
              }
            }}
            className={`
              rounded-xl border p-4 pt-10 transition-all duration-200
              ${
                previewMode
                  ? "border-transparent"
                  : isSelected
                  ? "cursor-pointer border-violet-400 shadow-lg shadow-violet-500/20"
                  : "cursor-pointer border-zinc-800"
              }
            `}
          >
            {field.type !== "checkbox" && (
              <Label className="mb-2 block">
                <>
                  {field.label}

                  {field.required && (
                    <span className="ml-1 text-red-400">*</span>
                  )}
                </>
              </Label>
            )}

            <div>{renderField(field, index)}</div>
          </div>
        );

        if (previewMode) {
          return <div key={field.id}>{fieldCard}</div>;
        }

        return (
          <SortableField id={field.id} key={field.id}>
            {fieldCard}
          </SortableField>
        );
      })}
    </div>
  );

  if (previewMode) {
    return fieldsContent;
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={schema.map((field) => field.id)}
        strategy={verticalListSortingStrategy}
      >
        {fieldsContent}
      </SortableContext>
    </DndContext>
  );
}
