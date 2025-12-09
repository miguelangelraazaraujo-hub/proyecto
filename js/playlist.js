// Get or create playlist from localStorage
function getPlaylist() {
  const data = localStorage.getItem('my-anime-playlist');
  return data ? JSON.parse(data) : [];
}

// Save playlist to localStorage
function savePlaylist(playlist) {
  localStorage.setItem('my-anime-playlist', JSON.stringify(playlist));
}

// Add or update a track
function saveTrack(track) {
  const playlist = getPlaylist();
  const existingIndex = playlist.findIndex(t => t.id == track.id);

  if (existingIndex >= 0) {
    // Update
    playlist[existingIndex] = track;
  } else {
    // Create
    track.id = Date.now(); // simple unique ID
    playlist.push(track);
  }

  savePlaylist(playlist);
}

// Delete a track
function deleteTrack(id) {
  const playlist = getPlaylist().filter(t => t.id != id);
  savePlaylist(playlist);
}

// Display playlist in my-playlist.html
function displayPlaylist() {
  const container = document.getElementById('playlist');
  if (!container) return;

  const playlist = getPlaylist();
  if (playlist.length === 0) {
    container.innerHTML = '<p>No hay canciones en tu playlist.</p>';
    return;
  }

  container.innerHTML = playlist.map(track => `
    <div class="track">
      <div class="track-info">
        <h3>${track.title}</h3>
        <p>${track.artist} • ${track.duration}</p>
      </div>
      <div class="actions">
        <a href="edit-track.html?id=${track.id}">Editar</a>
        <a href="#" class="delete" data-id="${track.id}">Eliminar</a>
      </div>
    </div>
  `).join('');

  // Add delete listeners
  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      if (confirm('¿Eliminar esta canción?')) {
        deleteTrack(id);
        displayPlaylist(); // refresh
      }
    });
  });
}

// Load track into form for editing
function loadTrackForEdit(id) {
  const playlist = getPlaylist();
  const track = playlist.find(t => t.id == id);
  if (track) {
    document.getElementById('form-title').textContent = 'Editar Canción';
    document.getElementById('track-id').value = track.id;
    document.getElementById('title').value = track.title;
    document.getElementById('artist').value = track.artist;
    document.getElementById('duration').value = track.duration;
    document.getElementById('imageUrl').value = track.imageUrl || '';
  }
}

// Handle form submit
document.getElementById('track-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('track-id').value || null;
  const track = {
    id: id ? parseInt(id) : null,
    title: document.getElementById('title').value,
    artist: document.getElementById('artist').value,
    duration: document.getElementById('duration').value,
    imageUrl: document.getElementById('imageUrl').value || ''
  };

  saveTrack(track);
  window.location.href = 'my-playlist.html';
});