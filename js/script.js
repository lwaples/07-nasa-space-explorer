//API Key
const API_KEY = "G7rH7Gc7dgNWdqfG8S1XEeinyGQjh8Iakyy0FpiK"
// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const button = document.getElementById("getImagesBtn");
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalExplanation = document.getElementById("modalExplanation");
const closeModal = document.getElementById("closeModal");


//eventListener 
button.addEventListener("click", getSpaceImages);

async function getSpaceImages() {

    const startDate = startInput.value;
    const endDate = endInput.value;
    gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">🔄</div>
      <p>Loading space photos...</p>
    </div>`;
    const url =
`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
const response = await fetch(url);

const data = await response.json();

gallery.innerHTML = "";
data.forEach(function(item) {
    
    const card = document.createElement("div");
    card.className = "gallery-item";

    if (item.media_type === "image") {
        card.innerHTML = `
            <img src="${item.url}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.date}</p>`;
    } else {
        card.innerHTML = `
            <p>🎥 Video</p>
            <a href="${item.url}" target="_blank">Watch Video</a>
            <h3>${item.title}</h3>
            <p>${item.date}</p>`;
    }
    card.addEventListener("click", function () {
    if (item.media_type !== "image") {
        window.open(item.url, "_blank");
        return;
    }
    modalImage.src = item.url;
    modalTitle.textContent = item.title;
    modalDate.textContent = item.date;
    modalExplanation.textContent = item.explanation;
    modal.classList.remove("hidden");
});
    gallery.appendChild(card);
});
}

closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
});

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.classList.add("hidden");
    }
});
// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);
