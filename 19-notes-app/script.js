const notesContainer = document.querySelector('.notes-container');
const newNoteButton = document.querySelector('.add-note-button');
const emptyState = document.querySelector('.empty-state');
const emptyStateButton = document.querySelector('.empty-add-button');
const editorOverlay = document.querySelector('.editor-overlay');
const closeButton = document.querySelector('.close-editor-button');
const titleInput = document.querySelector('.note-title-input');
const contentTextarea = document.querySelector('.note-content-input');
const saveButton = document.querySelector('.save-note-button');
const deleteButton = document.querySelector('.delete-note-button');
const searchInput = document.querySelector('.search-input');

const NOTES_STORAGE_KEY = 'notesAppNotes';

function loadFromStorage() {
  const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
  if (!savedNotes) {
    return [];
  }

  try {
    const loadedNotes = JSON.parse(savedNotes);
    if (Array.isArray(loadedNotes)) {
      return loadedNotes;
    }

    console.error('Saved notes are not an array.');
  } catch (error) {
    console.error('Could not read saved notes.', error);
  }
  return [];
}

function saveToStorage() {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadFromStorage();
let editingNoteId = null;

deleteButton.hidden = true;

const openEditor = () => {
  editingNoteId = null;
  titleInput.value = '';
  contentTextarea.value = '';
  deleteButton.hidden = true;
  editorOverlay.classList.add('active');
};

const closeEditor = () => editorOverlay.classList.remove('active');

const openNote = (id) => {
  const note = notes.find((item) => item.id === id);
  if (!note) {
    return;
  }

  editingNoteId = note.id;
  titleInput.value = note.title;
  contentTextarea.value = note.content;
  deleteButton.hidden = false;
  editorOverlay.classList.add('active');
};

function renderNotes(notesToRender = notes) {
  notesContainer.replaceChildren();

  if (notesToRender.length === 0) {
    if (notes.length === 0 && searchInput.value.trim() === '') {
      notesContainer.append(emptyState);
      return;
    }

    const emptySearchState = document.createElement('div');
    emptySearchState.className = 'empty-state';

    const message = document.createElement('h3');
    message.textContent = 'No notes found';

    const hint = document.createElement('p');
    hint.textContent = 'Try a different search term.';

    emptySearchState.append(message, hint);
    notesContainer.append(emptySearchState);
    return;
  }

  notesToRender.forEach((note) => {
    const card = document.createElement('div');
    card.className = 'note-card';

    const title = document.createElement('h3');
    title.textContent = note.title.trim() ? note.title : 'Untitled note';

    const content = document.createElement('p');
    content.textContent = note.content.length > 120
      ? `${note.content.slice(0, 120)}...`
      : note.content;

    const updatedAt = document.createElement('span');
    updatedAt.className = 'note-card-date';
    updatedAt.textContent = new Date(note.updatedAt).toLocaleDateString();

    card.append(title, content, updatedAt);
    card.addEventListener('click', () => {
      openNote(note.id);
    });
    notesContainer.append(card);
  });
}

const saveNote = () => {
  const title = titleInput.value;
  const content = contentTextarea.value;

  if (!title.trim() && !content.trim()) {
    window.alert('Add a title or content before saving.');
    return;
  }

  if (editingNoteId === null) {
    let id = Date.now();
    while (notes.some((note) => note.id === id)) {
      id += 1;
    }

    const updatedAt = Date.now();
    notes.push({ id, title, content, updatedAt });
  } else {
    const noteIndex = notes.findIndex((note) => note.id === editingNoteId);
    if (noteIndex === -1) {
      window.alert('This note could not be found.');
      return;
    }

    const note = notes[noteIndex];
    notes[noteIndex] = {
      ...note,
      title,
      content,
      updatedAt: Math.max(Date.now(), note.updatedAt + 1),
    };
  }

  saveToStorage();
  editingNoteId = null;
  searchNotes();
  titleInput.value = '';
  contentTextarea.value = '';
  closeEditor();
};

const deleteNote = () => {
  if (editingNoteId === null) {
    return;
  }

  notes = notes.filter((note) => note.id !== editingNoteId);
  saveToStorage();
  editingNoteId = null;
  titleInput.value = '';
  contentTextarea.value = '';
  deleteButton.hidden = true;
  closeEditor();
  searchNotes();
};

function searchNotes() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const matchingNotes = notes.filter((note) => (
    note.title.toLowerCase().includes(searchTerm)
    || note.content.toLowerCase().includes(searchTerm)
  ));

  renderNotes(matchingNotes);
}

newNoteButton.addEventListener('click', openEditor);
emptyStateButton.addEventListener('click', openEditor);
closeButton.addEventListener('click', closeEditor);
saveButton.addEventListener('click', saveNote);
deleteButton.addEventListener('click', deleteNote);
searchInput.addEventListener('input', searchNotes);

renderNotes();
