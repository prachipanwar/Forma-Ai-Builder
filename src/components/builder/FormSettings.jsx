import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FormSettings({
  formTitle,
  setFormTitle,
  formDescription,
  setFormDescription,
  submitButtonText,
  setSubmitButtonText,
}) {
  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
  
  <div>
    <h2 className="text-lg font-semibold">
      Form Settings
    </h2>

    <p className="mt-1 text-sm text-zinc-500">
      Customize your form metadata
    </p>
  </div>

  <div className="space-y-2">
    <Label>Form Title</Label>

    <Input
      value={formTitle || ""}
      onChange={(e) =>
        setFormTitle(e.target.value)
      }
      placeholder="Enter form title"
      className="border-white/10 bg-black/20"
    />
  </div>

  <div className="space-y-2">
    <Label>Description</Label>

    <Textarea
      value={formDescription || ""}
      onChange={(e) =>
        setFormDescription(
          e.target.value
        )
      }
      placeholder="Enter form description"
      className="border-white/10 bg-black/20"
    />
  </div>

  <div className="space-y-2">
    <Label>Submit Button Text</Label>

    <Input
      value={submitButtonText || ""}
      onChange={(e) =>
        setSubmitButtonText(
          e.target.value
        )
      }
      placeholder="Submit"
      className="border-white/10 bg-black/20"
    />
  </div>
</div>
  );
}