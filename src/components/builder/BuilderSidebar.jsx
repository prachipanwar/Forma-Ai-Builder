import { nanoid } from "nanoid";
import { toast } from "sonner";
const fieldTypes = [
  "text",
  "email",
  "textarea",
  "select",
  "checkbox",
  "date",
];

export default function BuilderSidebar({
  setSchema,
}) {
  const addField = (type) => {
    const baseField = {
      id: nanoid(),
      type,
      label: `${type} field`,
      required: false,
    };

    if (
      type === "text" ||
      type === "email" ||
      type === "textarea"
    ) {
      baseField.placeholder = "Enter value";
    }

    if (type === "select") {
      baseField.options = [
        "Option 1",
        "Option 2",
      ];
    }

    setSchema((prev) => [
      ...prev,
      baseField,
    ]);
    toast.success(
        `${type} field added`
      );
  };

  return (
    <div className="h-full lg:sticky lg:top-0 lg:h-screen border-r border-zinc-800 p-5">
      <h2 className="mb-5 font-semibold">
        Add Fields
      </h2>

      <div className="space-y-3">
        {fieldTypes.map((type) => (
          <button
            key={type}
            onClick={() => addField(type)}
            className="w-full rounded-xl border border-zinc-800 bg-white/[0.03] backdrop-blur-xl py-4 capitalize transition hover:bg-zinc-800"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}