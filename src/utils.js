// Strips HTML tags from TVMaze API strings (summaries are returned as HTML e.g. <p>...</p>)
export const stripHtml = (html) => (html ? html.replace(/<[^>]*>/g, '') : '');
