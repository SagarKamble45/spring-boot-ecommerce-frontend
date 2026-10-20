import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

// Spring Boot's default multipart limit is 1 MB. If you raise
// spring.servlet.multipart.max-file-size on the backend, raise this too.
export const MAX_IMAGE_SIZE_MB = 5;

/**
 * Image chooser with preview.
 * Props:
 *  - file:     File | null
 *  - onChange: (file | null) => void
 *  - disabled: boolean
 */
export default function ImageUploadField({ file, onChange, disabled = false }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // Build / clean up the preview URL whenever the chosen file changes.
  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSelect = (event) => {
    const selected = event.target.files?.[0];

    // allow picking the same file again after removing it
    event.target.value = "";

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WebP).");
      return;
    }

    if (selected.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setError(`Image must be ${MAX_IMAGE_SIZE_MB} MB or smaller.`);
      return;
    }

    setError("");
    onChange(selected);
  };

  const handleRemove = () => {
    setError("");
    onChange(null);
  };

  return (
    <div>
      <input
        ref={inputRef}
        id="productImage"
        type="file"
        accept="image/*"
        onChange={handleSelect}
        disabled={disabled}
        className="sr-only"
      />

      {file && previewUrl ? (
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-2.5">
          <img
            src={previewUrl}
            alt="Selected product preview"
            className="h-16 w-16 shrink-0 rounded-lg object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </p>
            <p className="text-xs text-slate-400">
              {(file.size / 1024).toFixed(0)} KB
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            aria-label="Remove image"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="flex w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500 transition hover:border-blue-400 hover:bg-blue-50/40 hover:text-blue-600 disabled:opacity-50"
        >
          <ImagePlus className="h-6 w-6" />
          <span className="font-medium">Click to upload an image</span>
          <span className="text-xs text-slate-400">
            JPG, PNG or WebP, up to {MAX_IMAGE_SIZE_MB} MB
          </span>
        </button>
      )}

      {error && (
        <p role="alert" className="mt-1 text-xs font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}