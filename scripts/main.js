// main.js
const doctorsContainer = document.getElementById("doctors-list");

async function loadDoctors() {
  try {
    const res = await fetch("http://localhost:5000/api/doctors");
    const doctors = await res.json();
    doctorsContainer.innerHTML = doctors.map(d => `
      <div>
        <h3>${d.name}</h3>
        <p>Specialization: ${d.specialization}</p>
        <p>Experience: ${d.experience} years</p>
        <p>Fees: ₹${d.fees}</p>
      </div>
    `).join("");
  } catch (err) {
    console.error("Error fetching doctors:", err);
  }
}

loadDoctors();
