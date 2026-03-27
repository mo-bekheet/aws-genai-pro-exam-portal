import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ComparisonMeta, ComparisonData } from '@/types/comparison';

const comparisonsDirectory = path.join(process.cwd(), 'src/data/comparisons');

export function getComparisonSlugs(): string[] {
  if (!fs.existsSync(comparisonsDirectory)) {
    return [];
  }
  return fs.readdirSync(comparisonsDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

export function getComparisonBySlug(slug: string): ComparisonData | null {
  const fullPath = path.join(comparisonsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const meta: ComparisonMeta = {
    slug,
    title: data.title,
    subtitle: data.subtitle || '',
    domain: data.domain,
    services: data.services,
    recommendation: data.recommendation,
    exam_tip: data.exam_tip,
    related: data.related || [],
  };
  
  return { meta, content };
}

export function getAllComparisons(): ComparisonMeta[] {
  const slugs = getComparisonSlugs();
  return slugs
    .map(slug => getComparisonBySlug(slug)?.meta)
    .filter((meta): meta is ComparisonMeta => meta !== null);
}

export function filterComparisons(
  comparisons: ComparisonMeta[],
  searchQuery: string,
  domain: string
): ComparisonMeta[] {
  return comparisons.filter(comp => {
    const matchesDomain = domain === 'all' || comp.domain === domain;
    const matchesSearch = searchQuery === '' || 
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesDomain && matchesSearch;
  });
}

export function getRelatedComparisons(slug: string): ComparisonMeta[] {
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return [];
  
  return comparison.meta.related
    .map(relSlug => getComparisonBySlug(relSlug)?.meta)
    .filter((meta): meta is ComparisonMeta => meta !== null);
}