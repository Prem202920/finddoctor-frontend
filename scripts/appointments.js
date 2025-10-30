// appointments.js
async function bookAppointment(userId, doctorId, date, time) {
  const token = localStorage.getItem("token");

  const res = await fetch("https://finddoctor-backend.onrender.com/api/appointments", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ user: userId, doctor: doctorId, date, time })
  });

  const data = await res.json();
  alert(data.message || "Appointment booked!");
}
