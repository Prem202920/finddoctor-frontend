// === DOM Elements ===
const doctorList = document.querySelector(".doctor-list");
const searchInput = document.getElementById("searchInput");

let doctorsData = [];

// Fetch doctors from backend
async function fetchDoctors() {
  try {
    const res = await fetch("https://finddoctor-backend.onrender.com/api/doctors");
    doctorsData = await res.json();

    if (!Array.isArray(doctorsData)) {
      throw new Error("Invalid response format");
    }

    displayDoctors(doctorsData);
  } catch (err) {
    console.error("Failed to fetch doctors:", err);
    doctorList.innerHTML = "<p>⚠️ Failed to load doctors.</p>";
  }
}

// Display doctors on page
function displayDoctors(data) {
  doctorList.innerHTML = "";

  if (data.length === 0) {
    doctorList.innerHTML = "<p>No doctors found.</p>";
    return;
  }

  data.forEach(doc => {
    const image = doc.image || "images/default-doctor.png";
    const name = doc.name || "Unknown Doctor";
    const specialization = doc.specialization || "Not specified";
    const city = doc.city || "Unknown City";
    const contact = doc.contact || "N/A";

    const card = document.createElement("div");
    card.classList.add("doctor-card");
    card.innerHTML = `
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <p><strong>${specialization}</strong></p>
      <p>📍 ${city}</p>
      <p>📞 ${contact}</p>
      <button onclick="viewDoctor('${doc._id}')">View Profile</button>
    `;
    doctorList.appendChild(card);
  });
}

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = doctorsData.filter(doc => 
    (doc.name && doc.name.toLowerCase().includes(query)) ||
    (doc.specialization && doc.specialization.toLowerCase().includes(query)) ||
    (doc.city && doc.city.toLowerCase().includes(query))
  );
  displayDoctors(filtered);
});

// Redirect to doctor profile page
function viewDoctor(id) {
  window.location.href = `doctor-profile.html?id=${id}`;
}

// Initial fetch
fetchDoctors();

// Update navbar with profile info
const navbarUserName = document.getElementById("navbarUserName");
const navbarProfileImage = document.getElementById("navbarProfileImage");

const storedName = localStorage.getItem("userName");
const storedImage = localStorage.getItem("userImage");

if(storedName) navbarUserName.textContent = storedName;
if(storedImage) navbarProfileImage.src = storedImage;