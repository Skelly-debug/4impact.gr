"use client";

import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  Plus,
  LogOut,
  FileText,
  Search,
  ChevronRight,
  Calendar,
  User,
  LayoutDashboard,
  TrendingUp,
  Settings,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import DOMPurify from "dompurify";
import AdminForm from "../AdminForm/AdminForm";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

/* ─── tiny helpers ─────────────────────────────────────────── */

const cx = (...classes) => classes.filter(Boolean).join(" ");

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("el-GR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* ─── sub-components ───────────────────────────────────────── */

const NavItem = ({ icon: Icon, label, active, href }) => (
  <Link
    href={href}
    className={cx(
      "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
      active
        ? "bg-[#1A9EDB]/20 text-[#1A9EDB]"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    )}
  >
    <Icon className="h-4 w-4 flex-shrink-0" />
    {label}
  </Link>
);

const StatCard = ({ label, value, sub }) => (
  <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex flex-col gap-1 shadow-sm">
    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
      {label}
    </span>
    <span className="text-3xl font-bold text-slate-800 tabular-nums">{value}</span>
    {sub && <span className="text-xs text-slate-400">{sub}</span>}
  </div>
);

const Feedback = ({ message, type }) => {
  if (!message) return null;
  return (
    <div
      className={cx(
        "fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium border",
        type === "success"
          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
          : "bg-red-50 text-red-800 border-red-200"
      )}
    >
      <span
        className={cx(
          "w-2 h-2 rounded-full flex-shrink-0",
          type === "success" ? "bg-emerald-500" : "bg-red-500"
        )}
      />
      {message}
    </div>
  );
};

const EmptyState = ({ onAdd }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-[#E8F4FC] flex items-center justify-center mb-4">
      <FileText className="h-7 w-7 text-[#1A9EDB]" />
    </div>
    <h3 className="text-lg font-semibold text-slate-700 mb-1">No articles yet</h3>
    <p className="text-sm text-slate-400 mb-6 max-w-xs">
      Start building your content library by adding your first article.
    </p>
    <button
      onClick={onAdd}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A9EDB] text-white text-sm font-semibold hover:bg-[#1589c4] transition-colors shadow-sm"
    >
      <Plus className="h-4 w-4" />
      Add first article
    </button>
  </div>
);

const ArticleRow = ({ article, onEdit, onDelete }) => (
  <div className="group relative bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all duration-150">
    {/* status strip */}
    <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-[#1A9EDB] rounded-l-xl" />

    <div className="flex items-start gap-4 pl-3">
      {/* thumbnail */}
      {article.thumbnail ? (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-20 h-20 object-cover rounded-lg border border-slate-100 flex-shrink-0"
        />
      ) : (
        <div className="w-20 h-20 rounded-lg bg-[#E8F4FC] flex items-center justify-center flex-shrink-0">
          <FileText className="h-7 w-7 text-[#1A9EDB]/50" />
        </div>
      )}

      {/* body */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-800 text-base leading-snug mb-1 line-clamp-1">
          {article.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <User className="h-3 w-3" />
            {article.author}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="h-3 w-3" />
            {formatDate(article.publishedDate)}
          </span>
        </div>

        {article.previewText && (
          <p className="text-sm text-slate-500 italic mb-1.5 line-clamp-1">
            "{article.previewText}"
          </p>
        )}

        <div
          className="text-sm text-slate-400 line-clamp-1"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.content),
          }}
        />
      </div>

      {/* actions */}
      <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(article)}
          title="Edit article"
          className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-[#E8F4FC] hover:border-[#1A9EDB] hover:text-[#1A9EDB] transition-colors"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(article.id)}
          title="Delete article"
          className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    />
    <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      {children}
    </div>
  </div>
);

/* ─── main component ───────────────────────────────────────── */

const ArticleMonitoring = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [articleToDeleteId, setArticleToDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      if (!session) return;
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setArticles(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        showFeedback("Error loading articles", "error");
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, [session]);

  const showFeedback = (message, type = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: "", type: "" }), 5000);
  };

  const handleDeleteArticle = (articleId) => {
    setArticleToDeleteId(articleId);
    setIsConfirmModalOpen(true);
  };

  const confirmDeletion = async () => {
    const articleId = articleToDeleteId;
    setIsConfirmModalOpen(false);
    setArticleToDeleteId(null);
    if (!articleId) return;
    try {
      const response = await fetch(`/api/articles?id=${articleId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete article");
      setArticles((current) => current.filter((a) => a.id !== articleId));
      showFeedback("Article removed successfully.", "success");
    } catch (error) {
      showFeedback(error.message || "Error deleting article", "error");
    }
  };

  const handleUpdateArticle = async (updatedData) => {
    try {
      const response = await fetch("/api/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedData, id: editingArticle.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update article");
      setArticles(articles.map((a) => (a.id === data.id ? data : a)));
      setEditingArticle(null);
      showFeedback("Article updated.", "success");
    } catch (error) {
      showFeedback(error.message || "Error updating article", "error");
    }
  };

  const handleAddArticle = async (newArticleData) => {
    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticleData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add article");
      setArticles((prev) => [data, ...prev]);
      setIsAddModalOpen(false);
      showFeedback("Article published.", "success");
    } catch (error) {
      showFeedback(error.message || "Error adding article", "error");
    }
  };

  const filtered = articles.filter(
    (a) =>
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.author?.toLowerCase().includes(search.toLowerCase())
  );

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F7F8FA]">
        <div className="w-8 h-8 border-2 border-[#1A9EDB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Feedback message={feedback.message} type={feedback.type} />

      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-[#0F1B2D] fixed top-0 left-0 bottom-0">
        {/* brand */}
        <div className="px-5 pt-7 pb-6 border-b border-white/10">
          <div className="text-[#1A9EDB] font-black text-lg leading-none tracking-tight">
            4IMP<span className="text-white">ACT</span>
          </div>
          <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-medium">
            Communications
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 pt-5 space-y-1">
          <p className="px-4 text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-2">
            Content
          </p>
          <NavItem icon={LayoutDashboard} label="Home"     href="/home"     active={pathname === "/home"} />
          <NavItem icon={FileText}        label="Articles" href="/admin"    active={pathname === "/admin"} />
          <NavItem icon={TrendingUp}      label="Blog"     href="/blog"     active={pathname === "/blog"} />
          <NavItem icon={Settings}        label="Services" href="/services" active={pathname === "/services"} />
        </nav>

        {/* user */}
        <div className="px-4 py-5 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#1A9EDB]/20 flex items-center justify-center text-[#1A9EDB] font-bold text-xs">
              {session?.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {session?.user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {session?.user?.email || ""}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/home" })}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile drawer ── */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          {/* panel */}
          <aside className="relative flex flex-col w-64 min-h-screen bg-[#0F1B2D] shadow-2xl">
            <div className="px-5 pt-7 pb-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[#1A9EDB] font-black text-lg leading-none tracking-tight">
                  4IMP<span className="text-white">ACT</span>
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-medium">
                  Communications
                </div>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 px-3 pt-5 space-y-1">
              <p className="px-4 text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-2">
                Content
              </p>
              <NavItem icon={LayoutDashboard} label="Home"     href="/home"     active={pathname === "/home"} />
              <NavItem icon={FileText}        label="Articles" href="/admin"    active={pathname === "/admin"} />
              <NavItem icon={TrendingUp}      label="Blog"     href="/blog"     active={pathname === "/blog"} />
              <NavItem icon={Settings}        label="Services" href="/services" active={pathname === "/services"} />
            </nav>

            <div className="px-4 py-5 border-t border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#1A9EDB]/20 flex items-center justify-center text-[#1A9EDB] font-bold text-xs">
                  {session?.user?.name?.[0]?.toUpperCase() || "A"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {session?.user?.name || "Admin"}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {session?.user?.email || ""}
                  </p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/auth" })}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main ── */}
      <div className="lg:ml-60 flex-1 flex flex-col">
        {/* top bar */}
        <header className="sticky top-0 z-30 bg-[#F7F8FA]/80 backdrop-blur-md border-b border-slate-200 px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>Content</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-700">Articles</span>
          </div>
          <div className="flex items-center gap-3">
            {/* search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg placeholder-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1A9EDB]/30 focus:border-[#1A9EDB] w-52 transition"
              />
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A9EDB] text-white text-sm font-semibold hover:bg-[#1589c4] active:bg-[#1175aa] transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New article</span>
            </button>
            {/* mobile hamburger */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* page content */}
        <main className="flex-1 px-6 lg:px-8 py-8 max-w-5xl w-full mx-auto">
          {/* page heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Article Management
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Review, edit, and publish content for the 4Impact blog.
            </p>
          </div>

          {/* stats row */}
          {!isLoading && articles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <StatCard
                label="Total articles"
                value={articles.length}
                sub="All time"
              />
              <StatCard
                label="This month"
                value={
                  articles.filter((a) => {
                    const d = new Date(a.publishedDate);
                    const now = new Date();
                    return (
                      d.getMonth() === now.getMonth() &&
                      d.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
                sub="Published"
              />
              <StatCard
                label="Authors"
                value={new Set(articles.map((a) => a.author)).size}
                sub="Unique contributors"
              />
            </div>
          )}

          {/* list */}
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-[#1A9EDB] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 && search ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search className="h-8 w-8 text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">
                No articles match <span className="font-semibold">"{search}"</span>
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-xs text-[#1A9EDB] hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : articles.length === 0 ? (
            <EmptyState onAdd={() => setIsAddModalOpen(true)} />
          ) : (
            <div className="space-y-3">
              {filtered.map((article) => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  onEdit={setEditingArticle}
                  onDelete={handleDeleteArticle}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ── Edit modal ── */}
      {editingArticle && (
        <Modal onClose={() => setEditingArticle(null)}>
          <AdminForm
            initialArticle={editingArticle}
            onSubmit={handleUpdateArticle}
            onCancel={() => setEditingArticle(null)}
          />
        </Modal>
      )}

      {/* ── Add modal ── */}
      {isAddModalOpen && (
        <Modal onClose={() => setIsAddModalOpen(false)}>
          <AdminForm
            onSubmit={handleAddArticle}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>
      )}

      {/* ── Confirm delete ── */}
      {isConfirmModalOpen && (
        <ConfirmationModal
          title="Delete article?"
          message="This action is permanent and cannot be undone."
          onConfirm={confirmDeletion}
          onCancel={() => {
            setIsConfirmModalOpen(false);
            setArticleToDeleteId(null);
          }}
        />
      )}
    </div>
  );
};

export default ArticleMonitoring;