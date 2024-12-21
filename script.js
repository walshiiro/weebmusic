
document.getElementById('explorenowbtn').addEventListener('click', function () {
  const aboutMeBox = document.getElementById('content1');
  aboutMeBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
function renderArtists(artists) {
  const container = document.getElementById('artist-container');
  container.innerHTML = ''; 

  let currentRow = null;

  artists.forEach((artist, index) => {
    if (index % 4 === 0) {
      currentRow = document.createElement('div');
      currentRow.classList.add('artist-row');
      container.appendChild(currentRow);
    }

    const artistDiv = document.createElement('div');
    artistDiv.classList.add('artist');
    artistDiv.innerHTML = `
      <img src="${artist.img}" alt="${artist.name}" class="artist-img">
      <h3>${artist.name}</h3>
      <p>Thể loại: ${artist.type}</p>
    `;

    artistDiv.addEventListener('click', () => {
      // Ví dụ: Chuyển đến một trang mới với URL chứa thông tin nghệ sĩ
      const targetUrl = `/artist-page.html?name=${encodeURIComponent(artist.name)}`;
      window.location.href = targetUrl;
    });

    currentRow.appendChild(artistDiv);
  });
}

function searchArtists(searchTerm) {
  const filteredArtists = listartist.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderArtists(filteredArtists);
}

document.querySelector('.content-searchbox').addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  searchArtists(searchTerm);
});

renderArtists(listartist);

function artistbg()
{
  const params = new URLSearchParams(window.location.search);
  const artistName = params.get('name'); // Get artist name from URL parameters
  
  // Find the artist in the list
  const artist = listartist.find((artist) => artist.name === artistName);
  
  // Check if artist is found
  if (!artist) {
    const artistInfoContainer = document.getElementById('artistinfo');
    artistInfoContainer.innerHTML = `<p>Artist not found!</p>`;
    return;
  }
  
  // Prepare artist information container
  const artistInfoContainer = document.getElementById('artistbg');
  artistInfoContainer.classList.add('bg');
  artistInfoContainer.style.backgroundImage = `url("${artist.img}")`;
  artistInfoContainer.style.backgroundRepeat = "no-repeat";
  artistInfoContainer.style.backgroundSize = "cover"; // Scale the image to cover the container
  artistInfoContainer.style.backgroundPosition = "center";
  ; // Center the image

}
 
function artistInfo() {
  const params = new URLSearchParams(window.location.search);
  const artistName = params.get('name'); // Get artist name from URL parameters

  // Find the artist in the list
  const artist = listartist.find((artist) => artist.name === artistName);

  // Check if artist is found
  if (!artist) {
    const artistInfoContainer = document.getElementById('artistinfo');
    artistInfoContainer.innerHTML = `<p>Artist not found!</p>`;
    return;
  }

  // Prepare artist information container
  const artistInfoContainer = document.getElementById('artistinfo');
  artistInfoContainer.classList.add('information'); 

  // Create a canvas to calculate the average color
  // const canvas = document.createElement('canvas');
  // const ctx = canvas.getContext('2d');

  // const img = new Image();
  // img.src = artist.img; // Correctly assign the artist's image
  // img.onload = () => {
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   ctx.drawImage(img, 0, 0, img.width, img.height);

  //   // Get pixel data
  //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  //   let r = 0, g = 0, b = 0;

  //   // Loop through all pixels
  //   for (let i = 0; i < imageData.length; i += 4) {
  //     r += imageData[i];     // Red
  //     g += imageData[i + 1]; // Green
  //     b += imageData[i + 2]; // Blue
  //   }

  //   // Calculate average color
  //   const pixelCount = imageData.length / 4;
  //   r = Math.floor(r / pixelCount);
  //   g = Math.floor(g / pixelCount);
  //   b = Math.floor(b / pixelCount);

  //   // Set the background color of the artist info container
  //   artistInfoContainer.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  // };

  
// artistInfoContainer.style.backgroundImage = `url("${artist.img}")`;
// artistInfoContainer.style.backgroundRepeat = "no-repeat";
// artistInfoContainer.style.backgroundSize = "cover"; // Scale the image to cover the container
// artistInfoContainer.style.backgroundPosition = "center"; // Center the image
// artistInfoContainer.style.filter = "blur(8px)";


  
  // Display artist information
  artistInfoContainer.innerHTML = `
    <img src="${artist.img}" alt="${artist.name}" class="artist-img">
    <h1 class="artist-name">${artist.name}</h1>
    <p class="artist-type">Thể loại: ${artist.type}</p>
  `;
}

function togglePlayPause() {
  // Lấy hai biểu tượng play và pause
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');

  // Kiểm tra trạng thái và chuyển đổi hiển thị
  if (playIcon.style.display === 'none') {
      playIcon.style.display = 'inline'; // Hiển thị play
      pauseIcon.style.display = 'none'; // Ẩn pause
  } else {
      playIcon.style.display = 'none'; // Ẩn play
      pauseIcon.style.display = 'inline'; // Hiển thị pause
  }
}

function displayArtistSongs() {
  const params = new URLSearchParams(window.location.search);
  const artistName = params.get('name');
  const songlists = document.getElementById("songlists");

  // Tạo cấu trúc bảng
  songlists.innerHTML = `
      <table class="song-table">
          <thead>
              <tr class="form">
                  <th class="count">#</th>
                  <th class="title-title">Title</th>
                  <th class="duration">Duration</th>
              </tr>
          </thead>
          <tbody id="songTableBody"></tbody>
      </table>
  `;

  const tableBody = document.getElementById("songTableBody");

  // Lấy dữ liệu từ file JSON
  fetch('song.js')
      .then(response => response.json())
      .then(lists => {
          let count = 0;

          // Lặp qua từng bài hát và thêm vào bảng
          lists.forEach(song => {
              // Nếu có lọc theo nghệ sĩ
              if (!artistName || song.artist === artistName) {
                count++;

                  const songRow = `
                      <tr class="song-element">
                          <td class="song-count">${count}</td>
                          <td class="song-title">${song.name}</td>
                          <td class="song-duration">${song.time}</td>
                      </tr>
                  `;
                  tableBody.innerHTML += songRow;
              }
          });
      })
      .catch(error => {
          console.error("Failed to load songs:", error);
          songlists.innerHTML = `<p class="error">Failed to load songs.</p>`;
      });
}






