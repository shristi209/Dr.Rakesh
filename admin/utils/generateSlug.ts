// utils/generateSlug.ts

const existingSlugs: string[] = [];

export function generateUniqueSlug(username: string): string {
  if (!username || username.trim() === '') {
    throw new Error('Username is required and cannot be empty');
  }

  const baseSlug = username.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  existingSlugs.push(slug);

  return slug;
}
