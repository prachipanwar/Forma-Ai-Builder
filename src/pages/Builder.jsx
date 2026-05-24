import { useEffect, useState } from "react";

import FormRenderer from "@/components/renderer/FormRenderer";
import BuilderSidebar from "@/components/builder/BuilderSidebar";
import FieldEditor from "@/components/builder/FieldEditor";
import AIPrompt from "@/components/builder/AiPrompt";
import FormSettings from "@/components/builder/FormSettings";
import FormSkeleton from "@/components/renderer/FormSkeleton";
import { Button } from "@/components/ui/button";

import { initialSchema } from "@/data/formSchema";

export default function Builder() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [schema, setSchema] = useState(() => {
    const savedSchema = localStorage.getItem("form-schema");

    return savedSchema ? JSON.parse(savedSchema) : initialSchema;
  });

  const [selectedFieldId, setSelectedFieldId] = useState(initialSchema[0]?.id);

  const [previewMode, setPreviewMode] = useState(false);

  const [formTitle, setFormTitle] = useState("Untitled Form");

  const [formDescription, setFormDescription] = useState(
    "Customize your form description"
  );

  const [submitButtonText, setSubmitButtonText] = useState("Submit");

  const selectedField = schema.find((field) => field.id === selectedFieldId);

  useEffect(() => {
    localStorage.setItem("form-schema", JSON.stringify(schema));
  }, [schema]);

  useEffect(() => {
    if (
      schema.length > 0 &&
      !schema.find((field) => field.id === selectedFieldId)
    ) {
      setSelectedFieldId(schema[0].id);
    }
  }, [schema, selectedFieldId]);

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <div
        className={`
       grid grid-cols-1
       ${previewMode ? "grid-cols-1" : "lg:grid-cols-[260px_1fr_320px]"}
     `}
      >
        {!previewMode && <BuilderSidebar setSchema={setSchema} />}

        <div className="min-h-screen border-x border-white/5 p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
            <div>
              <h1 className="text-2xl font-semibold">Forma AI Builder 🚀</h1>

              <p className="mt-1 text-sm text-zinc-500">
                Build intelligent forms visually
              </p>
            </div>

            <Button
              onClick={() => setPreviewMode(!previewMode)}
              className="
              cursor-pointer
              rounded-xl
              bg-gradient-to-r
              from-violet-500
              to-cyan-500
              px-4 py-2
              font-medium
              text-white
              shadow-lg
              shadow-violet-500/20
              transition-all
              duration-200
              hover:scale-[1.02]
              hover:opacity-90
              "
            >
              {previewMode ? "Exit Preview" : "Preview"}
            </Button>
          </div>

          <div className="mx-auto max-w-4xl">
            {!previewMode && (
              <AIPrompt
                setIsGenerating={setIsGenerating}
                setSchema={setSchema}
              />
            )}

            {!previewMode && (
              <div className="mb-6">
                <FormSettings
                  formTitle={formTitle}
                  setFormTitle={setFormTitle}
                  formDescription={formDescription}
                  setFormDescription={setFormDescription}
                  submitButtonText={submitButtonText}
                  setSubmitButtonText={setSubmitButtonText}
                />
              </div>
            )}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h1 className="text-2xl sm:text-3xl font-bold">{formTitle}</h1>

              <p className="mt-2 text-sm text-zinc-400">{formDescription}</p>

              <div className="mt-6">
                {isGenerating ? (
                  <FormSkeleton />
                ) : (
                  <FormRenderer
                    schema={schema}
                    setSchema={setSchema}
                    setSelectedFieldId={setSelectedFieldId}
                    selectedFieldId={selectedFieldId}
                    previewMode={previewMode}
                  />
                )}
              </div>

              <Button
                className="
    mt-6 w-full rounded-xl
    bg-gradient-to-r
    from-violet-500
    to-cyan-500
    text-white
    shadow-lg
    shadow-violet-500/20
    transition-all
    duration-200
    hover:opacity-90
    py-5
  "
              >
                {submitButtonText}
              </Button>
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
