import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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
  const deleteField = () => {
    const updatedSchema = schema.filter(
      (field) => field.id !== selectedField.id
    );

    setSchema(updatedSchema);
    toast.success("Field deleted");
  };

  return (
    <div className="h-screen lg:sticky lg:top-0 lg:h-screen p-5">
      <h2 className="font-semibold mb-5">Field Settings</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Label</Label>

          <Input
            value={selectedField.label || ""}
            onChange={(e) => updateField("label", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Placeholder</Label>

          <Input
            value={selectedField.placeholder || ""}
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
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 p-3">
          <Label>Required Field</Label>

          <Checkbox
            checked={selectedField.required}
            onCheckedChange={(checked) => updateField("required", checked)}
          />
        </div>
        <Button
          onClick={deleteField}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 py-5 text-red-400 transition hover:bg-red-500/20 cursor-pointer"
        >
          <Trash2 size={18} />
          Delete Field
        </Button>
      </div>
    </div>
  );
}
