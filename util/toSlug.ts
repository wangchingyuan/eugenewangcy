export function convertToSlug(text:string|undefined) {
    if (!text) return ''
    return text.toLowerCase()
               .replace(/ /g, '-')
               .replace(/[^\w-]+/g, '');
  }