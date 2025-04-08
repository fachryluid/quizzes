export const sanitizeJSON = (text) => {
  return text.replace(/^```json\s*|\s*```$/g, '').trim();
}