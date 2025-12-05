// -------------------------
// LOCAL STORAGE HELPERS
// -------------------------
const getRooms = () => JSON.parse(localStorage.getItem("rooms")) || [];
const saveRooms = (data) => localStorage.setItem("rooms", JSON.stringify(data));

const getBookings = () => JSON.parse(localStorage.getItem("bookings")) || [];
const saveBookings = (data) => localStorage.setItem("bookings", JSON.stringify(data));

// -------------------------
// INITIAL DEFAULT ROOMS
// -------------------------
if (getRooms().length === 0) {
    saveRooms([
        { name: "Single Room", price: 90 },
        { name: "Double Room", price: 150 },
        { name: "Executive Suite", price: 300 }
    ]);
}

// -------------------------
// LANDING PAGE LOGIC
// -------------------------
if (document.getElementById("roomsContainer")) {

    const rooms = getRooms();
    const container = document.getElementById("roomsContainer");
    const roomSelect = document.getElementById("roomSelect");

    // Display rooms
    rooms.forEach(room => {
        container.innerHTML += `
            <div class="col-md-4">
                <div class="room-card glass-card p-3 text-center">
                    <h4>${room.name}</h4>
                    <p class="text-primary fw-bold">$${room.price} / night</p>
                </div>
            </div>
        `;

        roomSelect.innerHTML += `<option>${room.name}</option>`;
    });

    // Booking
    document.getElementById("bookingForm").addEventListener("submit", e => {
        e.preventDefault();

        const booking = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            checkin: document.getElementById("checkin").value,
            checkout: document.getElementById("checkout").value,
            room: document.getElementById("roomSelect").value
        };

        const current = getBookings();
        current.push(booking);
        saveBookings(current);

        alert("Booking Confirmed! 🎉");
    });
}

// -------------------------
// ADMIN PAGE LOGIC
// -------------------------
if (document.getElementById("adminRoomsTable")) {

    const adminRoomsTable = document.getElementById("adminRoomsTable");
    const adminBookingsTable = document.getElementById("adminBookingsTable");

    // Load rooms
    const rooms = getRooms();
    rooms.forEach(r => {
        adminRoomsTable.innerHTML += `
            <tr>
                <td>${r.name}</td>
                <td>$${r.price}</td>
            </tr>
        `;
    });

    // Load bookings
    const bookings = getBookings();
    bookings.forEach(b => {
        adminBookingsTable.innerHTML += `
            <tr>
                <td>${b.name}</td>
                <td>${b.room}</td>
                <td>${b.checkin}</td>
                <td>${b.checkout}</td>
            </tr>
        `;
    });

    // Add new room
    document.getElementById("addRoomForm").addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("roomName").value;
        const price = document.getElementById("roomPrice").value;

        const rooms = getRooms();
        rooms.push({ name, price });
        saveRooms(rooms);

        location.reload();
    });
}

// -------------------------
// DARK MODE
// -------------------------
document.getElementById("darkToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
