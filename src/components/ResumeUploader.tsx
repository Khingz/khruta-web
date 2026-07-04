import { useRef, useState } from "react";
import { Upload, FileText, Trash2, Download } from "lucide-react";
import { Button } from "./primitives/Button";
import type { Profile } from "@/types";

export function ResumeUploader({
  resume,
  onUpload,
  onDelete,
  uploading,
}: {
  resume?: Profile["resume"];
  onUpload: (f: File) => void;
  onDelete: () => void;
  uploading?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  function pickFile(file?: File) {
    if (!file) return;
    if (!/\.(pdf|docx?|rtf)$/i.test(file.name)) return alert("Upload PDF, DOC, or DOCX");
    if (file.size > 10 * 1024 * 1024) return alert("Max 10MB");
    onUpload(file);
  }

  return (
    <div className="surface-card p-6">
      <h3 className="font-display font-semibold text-lg">Resume</h3>
      <p className="text-sm text-[#6B7280] mt-1">PDF, DOC, or DOCX up to 10MB.</p>

      {resume ? (
        <div className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
          <div className="h-10 w-10 rounded-lg bg-white border border-[#E5E7EB] grid place-items-center text-[#5B3FD6]">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-[#1F2937] truncate">{resume.name}</p>
            <p className="text-xs text-[#6B7280]">
              {(resume.size / 1024).toFixed(0)} KB · uploaded{" "}
              {new Date(resume.uploadedAt).toLocaleDateString()}
            </p>
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Download
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            leftIcon={<Trash2 className="h-4 w-4" />}
            className="text-[#DC2626]"
          >
            Delete
          </Button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            pickFile(e.dataTransfer.files?.[0]);
          }}
          className={`mt-5 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${drag ? "border-[#5B3FD6] bg-[#EEF0FB]" : "border-[#E5E7EB] bg-[#F8FAFC]"}`}
        >
          <div className="mx-auto h-12 w-12 rounded-full gradient-brand grid place-items-center text-white mb-3">
            <Upload className="h-5 w-5" />
          </div>
          <p className="font-medium text-[#1F2937]">Drag and drop your resume</p>
          <p className="text-sm text-[#6B7280] mt-1">or browse to choose a file</p>
          <input
            ref={ref}
            type="file"
            accept=".pdf,.doc,.docx,.rtf"
            hidden
            onChange={(e) => pickFile(e.target.files?.[0] ?? undefined)}
          />
          <Button onClick={() => ref.current?.click()} className="mt-4" loading={uploading}>
            Choose file
          </Button>
        </div>
      )}
    </div>
  );
}
