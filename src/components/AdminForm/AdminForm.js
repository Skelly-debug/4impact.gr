import React, { useState, useRef, useEffect } from "react";
import Toolbar from "../Toolbar/toolbar";
import { ImageIcon, Type, AlignLeft, User, FileText, Link2 } from "lucide-react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const Field = ({ label, hint, error, required, icon: Icon, children }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
        {required && <span className="text-[#1A9EDB]">*</span>}
      </label>
      {hint && <span className="text-xs text-slate-400 italic">{hint}</span>}
    </div>
    {children}
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
        {error}
      </p>
    )}
  </div>
);

const inputClass = (hasError) =>
  cx(
    "w-full px-3.5 py-2.5 rounded-lg text-sm text-slate-800 bg-white border transition",
    "placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1A9EDB]/30 focus:border-[#1A9EDB]",
    hasError ? "border-red-400" : "border-slate-200"
  );

const ImagePreview = ({ src, alt }) => {
  const [visible, setVisible] = useState(true);
  if (!src || !visible) return null;
  return (
    <div className="mt-2 relative inline-block">
      <img
        src={src}
        alt={alt}
        className="h-24 rounded-lg border border-slate-200 object-cover"
        onError={() => setVisible(false)}
      />
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
    </div>
  );
};

function AdminForm({ onSubmit, onCancel, initialArticle = null }) {
  const [newArticle, setNewArticle] = useState({
    id: initialArticle?.id || null,
    title: initialArticle?.title || "",
    content: initialArticle?.content || "",
    previewText: initialArticle?.previewText || "",
    author: initialArticle?.author || "",
    heroImage: initialArticle?.heroImage || "",
    thumbnail: initialArticle?.thumbnail || "",
    imageUrl: initialArticle?.imageUrl || "",
  });

  const [errors, setErrors] = useState({});
  const editorRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleEditorInput = () => {
    setNewArticle((prev) => ({
      ...prev,
      content: editorRef.current?.innerHTML || "",
    }));
    if (errors.content) setErrors((prev) => ({ ...prev, content: null }));
  };

  const handleAddImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl && editorRef.current) {
      editorRef.current.focus();
      document.execCommand("insertImage", false, imageUrl);
    }
  };

  const handleAddLink = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (editorRef.current && !editorRef.current.contains(range.commonAncestorContainer)) return;
    const selectedText = selection.toString().trim();
    const url = prompt("Enter URL:", "https://");
    if (!url) return;
    const displayText = prompt("Display text:", selectedText || "Link");
    if (!displayText) return;
    const link = document.createElement("a");
    link.href = url;
    link.textContent = displayText;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "text-blue-600 underline hover:text-blue-800";
    range.deleteContents();
    range.insertNode(link);
    range.setStartAfter(link);
    range.setEndAfter(link);
    selection.removeAllRanges();
    selection.addRange(range);
    handleEditorInput();
    if (editorRef.current) editorRef.current.focus();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newArticle.title.trim()) newErrors.title = "Title is required";
    if (!newArticle.content.trim() || newArticle.content === "<br>")
      newErrors.content = "Content is required";
    if (!newArticle.previewText.trim()) newErrors.previewText = "Preview text is required";
    if (!newArticle.author.trim()) newErrors.author = "Author name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(newArticle);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = newArticle.content;
      editorRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const isEditing = !!initialArticle;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            {isEditing ? "Edit Article" : "New Article"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEditing
              ? "Update the fields below and save your changes."
              : "Fill in the details to publish a new article."}
          </p>
        </div>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        <div className="px-7 py-6 space-y-6">

          {/* Two-col row: title + author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Title" required icon={Type} error={errors.title}>
              <input
                type="text"
                name="title"
                value={newArticle.title}
                onChange={handleInputChange}
                placeholder="Article title"
                className={inputClass(errors.title)}
              />
            </Field>

            <Field label="Author" required icon={User} error={errors.author}>
              <input
                type="text"
                name="author"
                value={newArticle.author}
                onChange={handleInputChange}
                placeholder="Author name"
                className={inputClass(errors.author)}
              />
            </Field>
          </div>

          {/* Preview text */}
          <Field
            label="Preview Text"
            required
            icon={AlignLeft}
            hint={`${newArticle.previewText.length}/200`}
            error={errors.previewText}
          >
            <textarea
              name="previewText"
              value={newArticle.previewText}
              onChange={handleInputChange}
              placeholder="A short summary shown on the blog listing page…"
              rows={3}
              maxLength={200}
              className={cx(inputClass(errors.previewText), "resize-none")}
            />
          </Field>

          {/* Images row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Hero Image URL" icon={ImageIcon}>
              <input
                type="url"
                name="heroImage"
                value={newArticle.heroImage}
                onChange={handleInputChange}
                placeholder="https://example.com/hero.jpg"
                className={inputClass(false)}
              />
              <ImagePreview src={newArticle.heroImage} alt="Hero preview" />
            </Field>

            <Field label="Thumbnail URL" icon={ImageIcon}>
              <input
                type="url"
                name="thumbnail"
                value={newArticle.thumbnail}
                onChange={handleInputChange}
                placeholder="https://example.com/thumb.jpg"
                className={inputClass(false)}
              />
              <ImagePreview src={newArticle.thumbnail} alt="Thumbnail preview" />
            </Field>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Rich text editor */}
          <Field label="Content" required icon={FileText} error={errors.content}>
            <div
              className={cx(
                "rounded-lg border overflow-hidden",
                errors.content ? "border-red-400" : "border-slate-200"
              )}
            >
              <div className="bg-slate-50 border-b border-slate-200">
                <Toolbar
                  editorRef={editorRef}
                  onAddImage={handleAddImage}
                  onAddLink={handleAddLink}
                />
              </div>
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                className="w-full px-4 py-3 min-h-[280px] text-sm text-slate-700 bg-white focus:outline-none"
                style={{
                  textAlign: "left",
                  direction: "ltr",
                  lineHeight: "1.7",
                }}
              />
            </div>
          </Field>

          <p className="text-xs text-slate-300 italic">* Required fields</p>
        </div>

        {/* Footer actions — sticky at bottom */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-7 py-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#1A9EDB] text-white text-sm font-semibold hover:bg-[#1589c4] active:bg-[#1175aa] transition-colors shadow-sm"
          >
            {isEditing ? "Save changes" : "Publish article"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;