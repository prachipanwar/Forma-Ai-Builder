import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FieldEditor({ selectedField, schema, setSchema }) {
  if (!selectedField) {
    return <div className="p-5">Select a field</div>;
  }

  const updateField = (key, value) => {
    const updatedSchema = schema.map((field) =>
      field.id === selectedField.id ? { ...field, [key]: value } : field
    );

    setSchema(updatedSchema);
  };

  return (
    <div className="min-h-screen p-5">
      <h2 className="font-semibold mb-5">Field Settings</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Label</Label>

          <Input
            value={selectedField.label}
            onChange={(e) => updateField("label", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Placeholder</Label>

          <Input
            value={selectedField.placeholder}
            onChange={(e) => updateField("placeholder", e.target.value)}
          />
        </div>
        {selectedField.type === "select" && (
          <div className="space-y-2">
            <Label>Options (comma separated)</Label>

            <Input
              value={selectedField.options?.join(", ") || ""}
              onChange={(e) =>
                updateField(
                  "options",
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
