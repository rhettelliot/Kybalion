// Distinction markdown is discovered at build time via Vite's import.meta.glob;
// each body is a lazily-loaded chunk fetched on demand so the main bundle
// stays lean. Source of truth: ebook-tactical/Post Edits/ — copy revisions in.

export type BodyLoader = () => Promise<string>;

const FILES = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' }) as Record<string, BodyLoader>;

export interface Chapter {
  id: string;
  number: number;          // 0 = preamble
  slug: string;            // content filename without .md
  title: string;
  principle: string;       // Architectural source principle
  operationalClass: string;
  threatVector: string;
  body?: BodyLoader;
}

const META: Omit<Chapter, 'body'>[] = [
  { id: 'd00', number: 0, slug: '00_preface',                   title: 'Preamble',                    principle: 'Installation Directive', operationalClass: 'Ontological Bootstrap',  threatVector: 'Cognitive Sentimentality' },
  { id: 'd01', number: 1, slug: '01_the_rendering_layer',       title: 'The Rendering Layer',         principle: 'Cognitive Rendering',    operationalClass: 'Ontological Architecture', threatVector: 'Unexamined Rendering' },
  { id: 'd02', number: 2, slug: '02_fractal_architecture',      title: 'Fractal Architecture',        principle: 'Correspondence',         operationalClass: 'Structural Analysis',    threatVector: 'Scale-Blindness' },
  { id: 'd03', number: 3, slug: '03_frequency_dynamics',        title: 'Frequency Dynamics',          principle: 'Vibration',              operationalClass: 'State Engineering',      threatVector: 'Frequency Collapse' },
  { id: 'd04', number: 4, slug: '04_spectrum_operations',       title: 'Spectrum Operations',         principle: 'Polarity',               operationalClass: 'Dynamic Transmutation',  threatVector: 'Polarity Entrapment' },
  { id: 'd05', number: 5, slug: '05_periodic_vector_control',   title: 'Periodic Vector Control',     principle: 'Rhythm',                 operationalClass: 'Temporal Dynamics',      threatVector: 'Rhythmic Entrainment' },
  { id: 'd06', number: 6, slug: '06_causal_chain_analysis',     title: 'Causal Chain Analysis',       principle: 'Cause & Effect',         operationalClass: 'Deterministic Logic',    threatVector: 'The Illusion of Chance' },
  { id: 'd07', number: 7, slug: '07_generative_complementarity', title: 'Generative Complementarity', principle: 'Gender',                 operationalClass: 'Creative Functionality', threatVector: 'Monopolar Sterility' },
];

export const CHAPTERS: Chapter[] = META.map((m) => ({ ...m, body: FILES[`../content/${m.slug}.md`] }));

export function chapterById(id: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export function adjacent(id: string): { prev?: Chapter; next?: Chapter } {
  const i = CHAPTERS.findIndex((c) => c.id === id);
  return {
    prev: i > 0 ? CHAPTERS[i - 1] : undefined,
    next: i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : undefined,
  };
}
