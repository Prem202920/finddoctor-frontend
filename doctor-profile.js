// === DOM Elements ===
const params = new URLSearchParams(window.location.search);
const doctorId = params.get("id");

const doctorImage = document.getElementById("doctorImage");
const doctorName = document.getElementById("doctorName");
const doctorSpecialization = document.getElementById("doctorSpecialization");
const doctorCity = document.getElementById("doctorCity");
const doctorContact = document.getElementById("doctorContact");
const doctorBio = document.getElementById("doctorBio");

const modal = document.getElementById("appointmentForm");
const form = document.getElementById("bookingForm");

// Fetch doctor details from backend
async function fetchDoctor() {
  if (!doctorId) {
    document.querySelector("main").innerHTML = `<p style="text-align:center; margin-top:50px; font-size:18px;">Doctor ID missing.</p>`;
    return;
  }

  try {
    const res = await fetch(`https://finddoctor-backend.onrender.com/api/doctors/${doctorId}`);
    if (!res.ok) throw new Error("Doctor not found");
    const doctor = await res.json();

    // Populate fields with defaults if missing
    doctorImage.src = doctor.image || "images/default-doctor.png";
    doctorName.textContent = doctor.name || "N/A";
    doctorSpecialization.textContent = doctor.specialization || "N/A";
    doctorCity.textContent = doctor.city ? `📍 ${doctor.city}` : "📍 N/A";
    doctorContact.textContent = doctor.contact ? `📞 ${doctor.contact}` : "📞 N/A";
    doctorBio.textContent = doctor.bio || "No bio available.";
  } catch (err) {
    console.error(err);
    document.querySelector("main").innerHTML = `<p style="text-align:center; margin-top:50px; font-size:18px;">Doctor not found.</p>`;
  }
}

// Back to home
function goBack() {
  window.location.href = "home.html";
}

// === Appointment Modal Functions ===
function openForm() {
  modal.style.display = "block";
}
function closeForm() {
  modal.style.display = "none";
}

// Book appointment via backend
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("patientName").value.trim();
  const contact = document.getElementById("patientContact").value.trim();
  const date = document.getElementById("appointmentDate").value;
  const message = document.getElementById("patientMessage").value.trim();

  if (!name || !contact || !date) {
    alert("Please fill in all required fields!");
    return;
  }

  try {
    const res = await fetch("https://finddoctor-backend.onrender.com/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId,
        patientName: name,
        phone: contact,
        date,
        message
      })
    });

    if (!res.ok) throw new Error("Booking failed");
    alert(`✅ Appointment booked with the doctor on ${date}!`);
    form.reset();
    closeForm();
  } catch (err) {
    console.error(err);
    alert("Failed to book appointment. Try again.");
  }
});

// Initial fetch of doctor
fetchDoctor();
