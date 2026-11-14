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

let notes = [];
let editingNoteId = null;

const openEditor = () => {
  editingNoteId = null;
  titleInput.value = '';
  contentTextarea.value = '';
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
  editorOverlay.classList.add('active');
};

function renderNotes() {
  notesContainer.replaceChildren();

  if (notes.length === 0) {
    notesContainer.append(emptyState);
    return;
  }

  notes.forEach((note) => {
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
    card.addEventListener('click', () => openNote(note.id));
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
    const updatedAt = Date.now();
    notes.push({ id: updatedAt, title, content, updatedAt });
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

  editingNoteId = null;
  renderNotes();
  titleInput.value = '';
  contentTextarea.value = '';
  closeEditor();
};

newNoteButton.addEventListener('click', openEditor);
emptyStateButton.addEventListener('click', openEditor);
closeButton.addEventListener('click', closeEditor);
saveButton.addEventListener('click', saveNote);

renderNotes();