import { useState, useEffect } from "react";

import FormRenderer from "@/components/renderer/FormRenderer";
import { initialSchema } from "@/data/formSchema";
import { Button } from "@/components/ui/button";
import BuilderSidebar from "@/components/builder/BuilderSidebar";
import FieldEditor from "@/components/builder/FieldEditor";
import AIPrompt from "@/components/builder/AIPrompt";
export default function Builder() {
  const [schema, setSchema] = useState(() => {
    const savedSchema = localStorage.getItem("form-schema");

    return savedSchema ? JSON.parse(savedSchema) : initialSchema;
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState(initialSchema[0]?.id);

  const selectedField = schema.find((field) => field.id === selectedFieldId);

  useEffect(() => {
    localStorage.setItem("form-schema", JSON.stringify(schema));
  }, [schema]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div
        className={`
    grid
    ${previewMode ? "grid-cols-1" : "grid-cols-[260px_1fr_320px]"}
  `}
      >
        {!previewMode && <BuilderSidebar setSchema={setSchema} />}

        <div className="min-h-screen border-x border-zinc-800 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">AI Form Copilot</h1>

            <Button
              onClick={() => setPreviewMode(!previewMode)}
              className="rounded-xl bg-white px-4 py-2 text-black font-medium"
            >
              {previewMode ? "Exit Preview" : "Preview"}
            </Button>
          </div>
          <div className="max-w-2xl mx-auto">
            {!previewMode && <AIPrompt setSchema={setSchema} />}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <FormRenderer
                schema={schema}
                setSchema={setSchema}
                setSelectedFieldId={setSelectedFieldId}
                selectedFieldId={selectedFieldId}
                previewMode={previewMode}
              />
            </div>
          </div>
        </div>

        {!previewMode && (
          <FieldEditor
            selectedField={selectedField}
            schema={schema}
            setSchema={setSchema}
          />
        )}
      </div>
    </div>
  );
}
