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
    <div className="h-full lg:sticky lg:top-0 lg:h-screen border-r border-zinc-800 p-4 lg:p-5">
      <h2 className="mb-4 text-sm uppercase tracking-wide text-zinc-500">
        Add Fields
      </h2>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        {fieldTypes.map((type) => (
          <button
            key={type}
            onClick={() => addField(type)}
            className="
            group
            flex
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-4
            py-4
            capitalize
            backdrop-blur-xl
            transition-all
            duration-200
            hover:border-violet-500/30
            hover:bg-white/[0.05]
            hover:shadow-lg
            hover:shadow-violet-500/10
            "
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}