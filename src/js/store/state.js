export const storageKey = 'quietmark.bookmarks.v1';
export const categories = ['Reading', 'Tools', 'Design', 'Learning'];

export function validURL(url) {
    try {
        const address = new URL(url);
        return address.protocol === 'https:' || address.protocol === 'http:';
    } catch {
        return false;
    }
}

// Each item is a bookmark: { title, url, category }.
let items = [];
export let storageError = '';

try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!Array.isArray(saved) || !saved.every(item =>
        item && typeof item.title === 'string' && item.title.trim() &&
        typeof item.url === 'string' && validURL(item.url) && categories.includes(item.category))) {
        throw new Error('Invalid saved bookmarks');
    }
    items = saved;
} catch {
    storageError = 'Could not read saved bookmarks. Check your browser storage and reload.';
}

export default { items };
