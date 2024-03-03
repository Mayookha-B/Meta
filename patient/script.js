document.getElementById("patientForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var dob = document.getElementById("dob").value;
    var medicalHistory = document.getElementById("medical-history").value;
    var appointmentDate = document.getElementById("appointment-date").value;
    var billingInfo = document.getElementById("billing-info").value;
    var medicineRecords = document.getElementById("medicine-records").value;

    // Create a new patient object
    var patient = {
        name: name,
        dob: dob,
        medicalHistory: medicalHistory,
        appointmentDate: appointmentDate,
        billingInfo: billingInfo,
        medicineRecords: medicineRecords
    };

    // Add the patient to the list
    addPatientToList(patient);

    // Clear the form fields
    document.getElementById("patientForm").reset();
});

function addPatientToList(patient) {
    var patientList = document.getElementById("patientList");
    var listItem = document.createElement("li");
    listItem.innerHTML = `
        <strong>Name:</strong> ${patient.name}<br>
        <strong>Date of Birth:</strong> ${patient.dob}<br>
        <strong>Medical History:</strong> ${patient.medicalHistory}<br>
        <strong>Appointment Date:</strong> ${patient.appointmentDate}<br>
        <strong>Billing Information:</strong> ${patient.billingInfo}<br>
        <strong>Medicine Records:</strong> ${patient.medicineRecords}
    `;
    patientList.appendChild(listItem);
}

 fetch('http://localhost:3000/patients')
  .then(response => response.json())
  .then(data => {
    // Handle the fetched data
    console.log(data.patients);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
  // Frontend JavaScript code to manage patient data

// Function to fetch patient data from the backend and render it on the output page
function fetchPatients() {
    fetch('http://localhost:3000/patients')
        .then(response => response.json())
        .then(data => {
            renderPatients(data.patients);
        })
        .catch(error => {
            console.error('Error fetching patients:', error);
        });
}

// Function to render patient list
function renderPatients(patients) {
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = ''; // Clear previous list

    patients.forEach(patient => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${patient.name}, DOB: ${patient.dob}`;
        patientList.appendChild(listItem);
    });
}

// Function to handle form submission and add new patient
function addPatient(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('patientForm'));
    const patient = {
        name: formData.get('name'),
        dob: formData.get('dob')
    };

    fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    })
    .then(response => response.json())
    .then(data => {
        // After adding the patient, fetch and render the updated patient list
        fetchPatients();
        // Clear the form fields
        document.getElementById('patientForm').reset();
    })
    .catch(error => {
        console.error('Error adding patient:', error);
    });
}

// Call fetchPatients function when the page loads
window.onload = fetchPatients;

// Add event listener for form submission
document.getElementById('patientForm').addEventListener('submit', addPatient);
