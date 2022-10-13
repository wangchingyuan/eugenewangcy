export function convertToSlug(text:string) {
    if (!text) return ''
    return text.toLowerCase()
               .replace(/ /g, '-')
               .replace(/[^\w-]+/g, '');
  }