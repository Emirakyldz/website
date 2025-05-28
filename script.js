document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul.nav-links');
    const appointmentForm = document.getElementById("appointmentForm");

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Send Message button functionality
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();

            if (!name || !email || !message) {
                alert("Please fill in all fields!");
                return;
            }

            fetch('http://localhost:3000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => {
                if (response.ok) {
                    alert("Your message has been sent! We will get back to you shortly.");
                    contactForm.reset();
                } else {
                    alert("An error occurred while sending your message.");
                }
            })
            .catch(error => {
                alert("Failed to connect to the server.");
                console.error(error);
            });
        });
    }

    // Appointment form submit handler
    if (appointmentForm) {
                // Tarih inputunu seç
        const dateInput = document.getElementById("date");

        // Haftasonu engelleme
        if (dateInput) {
            dateInput.addEventListener("change", function() {
                const selectedDate = new Date(this.value);
                const day = selectedDate.getDay(); // 0: Pazar, 6: Cumartesi
                if (day === 0 || day === 6) {
                    alert("Our workdays are Monday to Friday. Please select a weekday.");
                    this.value = "";
                }
            });
        }
if (!appointmentForm.dataset.listenerAdded) {
    appointmentForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const appointmentNumber = Math.floor(10000 + Math.random() * 90000);

        const data = {
            patientName: appointmentForm.elements['patientName'].value.trim(),
            pesel: appointmentForm.elements['pesel'].value.trim(),
            specialty: appointmentForm.elements['specialty'].value.trim(),
            doctor: appointmentForm.elements['doctor'].value.trim(),
            date: appointmentForm.elements['date'].value.trim(),
            time: appointmentForm.elements['time'].value.trim(),
            id: appointmentNumber
        };

        // Formu ve alanları sıfırla (eğer varsa)
        appointmentForm.reset();
        if (typeof doctorSelect !== "undefined") doctorSelect.disabled = true;
        if (typeof timeSelect !== "undefined") timeSelect.disabled = true;

        console.log('Gönderilen randevu verisi:', data);

        try {
            const response = await fetch("http://localhost:3000/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                appointmentNumberSpan.textContent = appointmentNumber;
                confirmationMessage.classList.remove("hidden");
                const json = await response.json();
                alert(json.message);
            } else if (response.status === 409) {
                alert("This appointment is full. Please choose another time.");
            } else {
                alert("There was an error processing your request. Please try again.");
            }
        } catch (error) {
            alert("Failed to connect to the server.");
            console.error(error);
        }
    });

    appointmentForm.dataset.listenerAdded = true;
}
    }
});


