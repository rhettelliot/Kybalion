import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { chapterById, adjacent } from '../lib/chapters';

type BodyState =
  | { status: 'loading' }
  | { status: 'ready'; text: string }
  | { status: 'missing' }
  | { status: 'error' };

export default function Chapter() {
  const { chapterId } = useParams();
  const chapter = chapterId ? chapterById(chapterId) : undefined;

  // Distinction bodies are code-split; fetch the markdown chunk on demand.
  const [body, setBody] = useState<BodyState>({ status: 'loading' });
  useEffect(() => {
    if (!chapter) return;
    if (!chapter.body) {
      setBody({ status: 'missing' });
      return;
    }
    let cancelled = false;
    setBody({ status: 'loading' });
    chapter.body()
      .then((text) => { if (!cancelled) setBody({ status: 'ready', text }); })
      .catch(() => { if (!cancelled) setBody({ status: 'error' }); });
    return () => { cancelled = true; };
  }, [chapter]);

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <div className="mono-data text-signal mb-3">DISTINCTION_NOT_FOUND</div>
        <Link to="/distinctions" className="text-ink hover:text-signal transition-colors mono-data">
          ← Return to Index
        </Link>
      </div>
    );
  }

  const { prev, next } = adjacent(chapter.id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Link
        to="/distinctions"
        className="inline-flex items-center gap-2 mono-data text-ink-3 hover:text-ink transition-colors mb-8"
      >
        <ArrowLeft className="w-3 h-3" /> INDEX // {chapter.principle.toUpperCase()}
      </Link>

      {/* Chapter header */}
      <header className="border-b border-border pb-8 mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <span className="mono-data text-signal">
            {chapter.number === 0 ? 'PROTOCOL 00' : `DISTINCTION ${String(chapter.number).padStart(2, '0')}`}
          </span>
          <BookOpen className="w-4 h-4 text-ink-3" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase text-ink display-tight mb-4">
          {chapter.title}
        </h1>
        <div className="flex flex-wrap gap-x-8 gap-y-1 mono-data text-ink-3">
          <span>CLASS: {chapter.operationalClass.toUpperCase()}</span>
          <span className="text-signal/80">THREAT: {chapter.threatVector.toUpperCase()}</span>
        </div>
      </header>

      {/* Body */}
      <article className="chapter-prose">
        {body.status === 'loading' && (
          <div className="flex items-center gap-3 mono-data text-ink-3 py-8">
            <div className="w-1.5 h-1.5 bg-signal blink" /> LOADING_DISTINCTION…
          </div>
        )}
        {body.status === 'ready' && <ReactMarkdown remarkPlugins={[remarkGfm]}>{body.text}</ReactMarkdown>}
        {body.status === 'missing' && <p className="text-ink-3 italic">[Distinction draft pending.]</p>}
        {body.status === 'error' && (
          <p className="text-signal mono-data">
            DISTINCTION_LOAD_FAILED — check your connection and{' '}
            <button onClick={() => window.location.reload()} className="underline hover:text-ink transition-colors">
              reload
            </button>.
          </p>
        )}
      </article>

      {/* Prev / Next */}
      <nav className="mt-16 pt-8 border-t border-border grid grid-cols-2 gap-4">
        {prev ? (
          <Link
            to={`/distinctions/${prev.id}`}
            className="group p-5 border border-border hover:bg-surface hover:border-border-hi transition-colors flex flex-col"
          >
            <div className="mono-data text-ink-3 mb-2 flex items-center gap-1.5">
              <ChevronLeft className="w-3 h-3" /> PREVIOUS
            </div>
            <div className="text-ink font-bold uppercase text-sm group-hover:text-signal transition-colors">
              {prev.title}
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link
            to={`/distinctions/${next.id}`}
            className="group p-5 border border-border hover:bg-surface hover:border-border-hi transition-colors flex flex-col items-end text-right"
          >
            <div className="mono-data text-ink-3 mb-2 flex items-center gap-1.5">
              NEXT <ChevronRight className="w-3 h-3" />
            </div>
            <div className="text-ink font-bold uppercase text-sm group-hover:text-signal transition-colors">
              {next.title}
            </div>
          </Link>
        ) : <div />}
      </nav>
    </div>
  );
}
