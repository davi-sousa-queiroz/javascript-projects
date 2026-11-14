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

const openEditor = () => editorOverlay.classList.add('active');
const closeEditor = () => editorOverlay.classList.remove('active');

const saveNote = () => {
  const title = titleInput.value;
  const content = contentTextarea.value;

  if (!title.trim() && !content.trim()) {
    window.alert('Add a title or content before saving.');
    return;
  }

  const updatedAt = Date.now();
  notes.push({ id: updatedAt, title, content, updatedAt });
  titleInput.value = '';
  contentTextarea.value = '';
  closeEditor();
};

newNoteButton.addEventListener('click', openEditor);
emptyStateButton.addEventListener('click', openEditor);
closeButton.addEventListener('click', closeEditor);
saveButton.addEventListener('click', saveNote);