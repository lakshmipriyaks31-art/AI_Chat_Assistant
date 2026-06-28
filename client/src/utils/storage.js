const USERS_KEY = 'chatspace_users';
const CHATS_KEY = 'chatspace_chats';

export function getUsers() {
  try {
    return localStorage.getItem(USERS_KEY);
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, users);
}
export function clearUsers(users) {
  localStorage.clear(USERS_KEY);
}

export function getChats(email) {
  try {
    const all = JSON.parse(localStorage.getItem(CHATS_KEY)) || {};
    return all[email] || [];
  } catch {
    return [];
  }
}

export function saveChats(email, chats) {
  try {
    const all = JSON.parse(localStorage.getItem(CHATS_KEY)) || {};
    all[email] = chats;
    localStorage.setItem(CHATS_KEY, JSON.stringify(all));
  } catch {}
}
