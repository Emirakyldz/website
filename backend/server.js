const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactsFilePath = path.join(__dirname, 'contacts.json');
const appointmentsFilePath = path.join(__dirname, 'appointments.json');


function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") return resolve([]);
                return reject(err);
            }
            try {
                const json = JSON.parse(data || "[]");
                resolve(json);
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
}

function writeJsonFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}


app.post('/api/contacts', async (req, res) => {
    try {
        const contacts = await readJsonFile(contactsFilePath);
        const { name, email, message } = req.body;
        const randomId = Math.floor(10000 + Math.random() * 90000).toString();
        const newContact = { name, email, message, id: randomId };
        console.log("Entered Message:", newContact);
        contacts.push(newContact);
        await writeJsonFile(contactsFilePath, contacts);
        res.status(201).json({ message: "Contact saved successfully" });
    } catch (err) {
        res.status(500).send('An error occurred while saving the message.');
    }
});
app.post("/api/appointments", async (req, res) => {
    try {
        const appointments = await readJsonFile(appointmentsFilePath);

        const newAppointment = { ...req.body, id: req.body.id || Date.now().toString() };

        const conflict = appointments.some(
            (appointment) =>
                appointment.doctor === newAppointment.doctor &&
                appointment.date === newAppointment.date &&
                appointment.time === newAppointment.time
        );

        if (conflict) {
            console.log("Double-booking:", newAppointment);
            return res.status(409).json({ message: "This appointment is full" });
        }

        appointments.push(newAppointment);

        await writeJsonFile(appointmentsFilePath, appointments);
        console.log("Appointment saved:", newAppointment);

        res.status(201).json({ message: "Appointment saved successfully" });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred while saving the appointment.");
    }
});

app.get("/api/appointments", async (req, res) => {
    try {
        const appointments = await readJsonFile(appointmentsFilePath);
        res.json(appointments);
    } catch (err) {
        res.status(500).send("500: An error occured.");
    }
});
app.delete("/api/appointments/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let appointments = await readJsonFile(appointmentsFilePath);
        const initialLength = appointments.length;
        appointments = appointments.filter(a => String(a.id) !== String(id));
        if (appointments.length === initialLength) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        await writeJsonFile(appointmentsFilePath, appointments);
        res.json({ message: "Appointment deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting appointment" });
    }
});

app.put("/api/appointments/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let appointments = await readJsonFile(appointmentsFilePath);
        const index = appointments.findIndex(a => String(a.id) === String(id));
        if (index === -1) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        appointments[index] = { ...appointments[index], ...req.body, id };
        await writeJsonFile(appointmentsFilePath, appointments);
        res.json({ message: "Appointment updated" });
    } catch (err) {
        res.status(500).json({ message: "Error updating appointment" });
    }
});

app.get("/api/contacts", async (req, res) => {
    try {
        const contacts = await readJsonFile(contactsFilePath);
        res.json(contacts);
    } catch (err) {
        res.status(500).send("500: An error occured.");
    }
});

app.delete("/api/contacts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let contacts = await readJsonFile(contactsFilePath);
        const initialLength = contacts.length;
        contacts = contacts.filter(c => String(c.id) !== String(id));
        if (contacts.length === initialLength) {
            return res.status(404).json({ message: "Contact not found" });
        }
        await writeJsonFile(contactsFilePath, contacts);
        res.json({ message: "Contact deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting contact" });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}.`);
        
});