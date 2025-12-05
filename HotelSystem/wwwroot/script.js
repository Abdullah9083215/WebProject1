// -------------------------
// API ENDPOINTS
// -------------------------
const API_BASE = '';
const ROOMS_API = `${API_BASE}/api/rooms`;
const GUESTS_API = `${API_BASE}/api/guests`;
const BOOKINGS_API = `${API_BASE}/api/bookings`;
const VALIDATION_API = `${API_BASE}/api/validation`;


// Prevent multiple script executions
if (window.hotelSystemInitialized) {
    console.log("Script already loaded, skipping...");
} else {
// Mark as initialized
window.hotelSystemInitialized = true;

// -------------------------
// API HELPERS
// -------------------------
async function fetchRooms() {
    try {
        const response = await fetch(ROOMS_API);
        if (!response.ok) throw new Error('Failed to fetch rooms');
        return await response.json();
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return [];
    }
}

async function createGuest(guestData) {
    try {
        const response = await fetch(GUESTS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guestData)
        });

        // 🛑 Check for response failure
        if (!response.ok) {
            // Attempt to read the error details from the response body
            let errorDetails = `HTTP Error ${response.status}: ${response.statusText}`;
            
            try {
                // Read the body as JSON if possible (server often sends validation errors as JSON)
                const body = await response.json(); 
                
                // If the body has a specific 'title' or 'errors' property, use that detail
                if (body && (body.title || body.errors)) {
                    errorDetails += ` - Details: ${JSON.stringify(body)}`;
                }
            } catch (e) {
                // If the response body isn't JSON, just use the status code.
                console.warn('Response body was not JSON, returning generic error.');
            }

            // Throw a detailed error including status code and server details
            const clientError = new Error(`Failed to create guest. ${errorDetails}`);
            
            // Optionally, attach the full response object to the error
            clientError.response = response; 
            
            throw clientError;
        }

        // Only parse the body as JSON if the request was successful
        return await response.json(); 
        
    } catch (error) {
        // Log the detailed error from the network failure or the generic catch block
        console.error('Error creating guest:', error.message || error);
        throw error;
    }
}

async function createBooking(bookingData) {
    try {
        const response = await fetch(BOOKINGS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        // 🛑 Check for response failure
        if (!response.ok) {
            // Attempt to read the error details from the response body
            let errorDetails = `HTTP Error ${response.status}: ${response.statusText}`;
            let errorMessage = "";
            
            try {
                // Read the body as text first (Conflict responses might be plain text)
                const bodyText = await response.text();
                
                // Try to parse as JSON
                try {
                    const body = JSON.parse(bodyText);
                    if (body && typeof body === 'string') {
                        errorMessage = body;
                    } else if (body && (body.title || body.errors)) {
                        errorMessage = JSON.stringify(body);
                    }
                } catch {
                    // If not JSON, use the text directly
                    errorMessage = bodyText;
                }
            } catch (e) {
                console.warn('Could not read response body in createBooking error.');
            }

            // Throw a detailed error with the server's message
            const clientError = new Error(errorMessage || `Failed to create booking. ${errorDetails}`);
            clientError.response = response;
            clientError.status = response.status;
            throw clientError;
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}
async function fetchBookings() {
    try {
        const response = await fetch(BOOKINGS_API);
        if (!response.ok) throw new Error('Failed to fetch bookings');
        return await response.json();
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
}

// -------------------------
// LANDING PAGE LOGIC
// -------------------------
if (document.getElementById("roomsContainer")) {
    const container = document.getElementById("roomsContainer");
    const roomSelect = document.getElementById("roomSelect");

    // Load and display rooms from API
    async function loadRooms() {
        const rooms = await fetchRooms();
        
        container.innerHTML = '';
        roomSelect.innerHTML = '<option value="">Select a room</option>';

        rooms.forEach(room => {
            // Map backend Room model (Type, Price) to frontend display (name, price)
            const roomName = room.type || room.roomNumber;
            const roomPrice = room.price;

            // Display room card
            container.innerHTML += `
                <div class="col-md-4">
                    <div class="room-card glass-card p-3 text-center">
                        <h4>${roomName}</h4>
                        <p class="text-primary fw-bold">$${roomPrice} / night</p>
                        ${room.isAvailable ? '<span class="badge bg-success">Available</span>' : '<span class="badge bg-danger">Unavailable</span>'}
                    </div>
                </div>
            `;

            // Add to dropdown (only if available)
            if (room.isAvailable) {
                roomSelect.innerHTML += `<option value="${room.id}">${roomName} - $${roomPrice}/night</option>`;
            }
        });
    }

    // Booking form submission
    if (!bookingForm.hasAttribute('data-listener-attached')) {
        bookingForm.setAttribute('data-listener-attached', 'true');
        console.log("✅ Attaching booking form listener");

        bookingForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("🎯 Booking form submitted - Event fired");

            // Collect form data for duplicate check
            const guestName = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const checkin = document.getElementById("checkin").value;
            const checkout = document.getElementById("checkout").value;
            const roomId = document.getElementById("roomSelect").value;

            const currentSubmissionData = `${guestName}|${phone}|${checkin}|${checkout}|${roomId}`;

            // Check for duplicate submission with same data
            if (window.lastSubmissionData === currentSubmissionData && window.activeBookingSubmission) {
                console.log("🚫 Duplicate submission with same data, ignoring");
                return;
            }

            // Global prevention flag
            if (window.activeBookingSubmission) {
                console.log("🚫 Global booking submission already active, ignoring");
                return;
            }

            // Prevent multiple submissions
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            if (submitBtn.disabled) {
                console.log("🚫 Form already being submitted, ignoring duplicate submission");
                return;
            }

            console.log("✅ Starting booking creation process...");
            window.activeBookingSubmission = true;
            window.lastSubmissionData = currentSubmissionData;
            submitBtn.disabled = true;
            submitBtn.textContent = "Creating Booking...";

            // Variables already declared above, just get the values again
            // guestName, phone, checkin, checkout already declared above

            if (!roomId) {
                alert("Please select a room");
                submitBtn.disabled = false;
                submitBtn.textContent = "Confirm Booking";
                return;
            }

            try {
                console.log("🔍 Step 1: Checking for booking conflicts...");

                // STEP 1: Check for existing bookings that conflict (BEFORE creating guest)
                const checkInDate = new Date(checkin);
                const checkOutDate = new Date(checkout);
                
                const allBookings = await fetch(`${BOOKINGS_API}`).then(r => r.json());
                const conflictingBooking = allBookings.find(b => {
                    if (b.roomId !== roomId || b.status === "Cancelled") return false;
                    const bCheckIn = new Date(b.checkIn);
                    const bCheckOut = new Date(b.checkOut);
                    // Check if dates overlap
                    return (checkOutDate > bCheckIn && checkInDate < bCheckOut);
                });

                if (conflictingBooking) {
                    console.log("❌ Booking conflict detected!");
                    alert("❌ The date is already booked for this room. Please choose different dates or another room.");
                    return; // Exit early - don't create guest
                }

                console.log("✅ Room is available, proceeding with guest creation...");

                // STEP 2: Create or find guest (only if no conflict)
                let guest;
                let guestWasCreated = false; // Track if we created a new guest
                try {
                    const response = await fetch(`${GUESTS_API}`);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);

                    const existingGuests = await response.json();
                    guest = existingGuests.find(g => g.contact === phone);

                    if (guest) {
                        console.log("✅ Found existing guest:", guest);
                    } else {
                        console.log("🆕 Creating new guest...");
                        guest = await createGuest({
                            name: guestName,
                            contact: phone
                        });
                        guestWasCreated = true; // Mark that we created this guest
                        console.log("✅ New guest created:", guest);
                    }
                } catch (error) {
                    console.log("❌ Error with guest creation:", error);
                    throw error;
                }

                // STEP 3: Create the booking
                console.log("📝 Creating booking...");
                try {
                    const booking = await createBooking({
                        GuestId: guest.id,
                        RoomId: roomId,
                        CheckIn: checkin,
                        CheckOut: checkout,
                        Status: "Confirmed"
                    });
                    console.log("✅ Booking created successfully:", booking);

                    alert("Booking Confirmed! 🎉");
                    e.target.reset();
                } catch (bookingError) {
                    console.error("❌ Booking creation failed:", bookingError);
                    
                    // If we created a new guest and booking failed, delete the guest
                    if (guestWasCreated) {
                        console.log("🗑️ Deleting guest since booking failed...");
                        try {
                            await fetch(`${GUESTS_API}/${guest.id}`, { method: 'DELETE' });
                            console.log("✅ Guest deleted successfully");
                        } catch (deleteError) {
                            console.error("❌ Failed to delete guest:", deleteError);
                        }
                    }
                    
                    // Re-throw the error to be handled by the outer catch block
                    throw bookingError;
                }

            } catch (error) {
                console.error("❌ Booking error:", error);

                // Show user-friendly error message
                if (error.status === 409 || (error.message && (error.message.includes("already booked") || error.message.includes("date is already booked")))) {
                    alert("❌ The date is already booked for this room. Please choose different dates or another room.");
                } else {
                    alert("Error creating booking. Please try again.");
                }
            } finally {
                window.activeBookingSubmission = false;
                window.lastSubmissionData = null;
                submitBtn.disabled = false;
                submitBtn.textContent = "Confirm Booking";
            }
        });
    }

    // Initial load
    loadRooms();
}

// -------------------------
// ADMIN PAGE LOGIC
// -------------------------

// Initialize admin functionality
function initializeAdmin() {
    // Global delete function for onclick handlers
    window.deleteRoom = async function(id) {
        if (!confirm('Are you sure you want to delete this room?')) return;

        try {
            const response = await fetch(`${ROOMS_API}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete room');

            alert("Room deleted successfully!");
            location.reload();
        } catch (error) {
            alert("Error deleting room. Please try again.");
            console.error(error);
        }
    };

    // Check for admin elements
    const adminRoomsTable = document.getElementById("adminRoomsTable");
    if (!adminRoomsTable) return; // Not on admin page

    const adminBookingsTable = document.getElementById("adminBookingsTable");

    // Load rooms for admin table
    async function loadAdminRooms() {
        const rooms = await fetchRooms();
        adminRoomsTable.innerHTML = '';

        if (rooms.length === 0) {
            adminRoomsTable.innerHTML = '<tr><td colspan="5" class="text-center">No rooms found. Add your first room above!</td></tr>';
            return;
        }

        rooms.forEach(room => {
            adminRoomsTable.innerHTML += `
                <tr>
                    <td>${room.roomNumber || 'N/A'}</td>
                    <td>${room.type || 'N/A'}</td>
                    <td>$${room.price || 0}</td>
                    <td>${room.isAvailable ? '<span class="badge bg-success">Yes</span>' : '<span class="badge bg-danger">No</span>'}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteRoom(${room.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }

    // Load bookings for admin table
    async function loadAdminBookings() {
        const bookings = await fetchBookings();
        adminBookingsTable.innerHTML = '';

        if (bookings.length === 0) {
            adminBookingsTable.innerHTML = '<tr><td colspan="5" class="text-center">No bookings yet.</td></tr>';
            return;
        }

        bookings.forEach(booking => {
            const guestName = booking.guest?.name || 'N/A';
            const roomName = booking.room?.type || booking.room?.roomNumber || 'N/A';

            adminBookingsTable.innerHTML += `
                <tr>
                    <td>${guestName}</td>
                    <td>${roomName}</td>
                    <td>${booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'}</td>
                    <td>${booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}</td>
                    <td><span class="badge bg-primary">${booking.status || 'Confirmed'}</span></td>
                </tr>
            `;
        });
    }

    // Add new room form
    const addRoomForm = document.getElementById("addRoomForm");
    console.log("Setting up room form handler...");
    if (addRoomForm) {
        console.log("Room form found, attaching submit handler");
        addRoomForm.addEventListener("submit", async (e) => {
            console.log("🎯 FORM SUBMITTED! Processing room creation...");
            e.preventDefault();

            const roomNumber = document.getElementById("roomNumber").value.trim();
            const roomType = document.getElementById("roomType").value.trim();
            const price = parseFloat(document.getElementById("roomPrice").value);
            const isAvailable = document.getElementById("roomAvailable").checked;

            console.log("📝 Extracted form data:", {
                roomNumber,
                roomType,
                price,
                isAvailable,
                priceValid: !isNaN(price) && price > 0
            });

            // Variables already declared above for logging

            if (!roomNumber || !roomType || isNaN(price) || price <= 0) {
                console.log("❌ Validation failed:", { roomNumber: !!roomNumber, roomType: !!roomType, price: price });
                alert("Please fill in all fields correctly!");
                return;
            }

            console.log("✅ Validation passed, making API call...");
            console.log("🌐 API URL:", ROOMS_API);
            console.log("📤 Request payload:", {
                roomNumber: roomNumber,
                type: roomType,
                price: price,
                isAvailable: isAvailable
            });

            try {
                const response = await fetch(ROOMS_API, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        roomNumber: roomNumber,
                        type: roomType,
                        price: price,
                        isAvailable: isAvailable
                    })
                });

                console.log("📥 API Response status:", response.status);
                console.log("📥 API Response ok:", response.ok);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("❌ API Error response:", errorText);
                    throw new Error(`API Error ${response.status}: ${errorText}`);
                }

                const result = await response.json();
                console.log("✅ API Success response:", result);

                alert("Room added successfully!");
                e.target.reset();
                document.getElementById("roomAvailable").checked = true;
                console.log("🔄 Refreshing room list...");
                loadAdminRooms();
            } catch (error) {
                console.error("❌ Room creation error:", error);
                alert("Error adding room. Please try again. Check console for details.");
            }
        });
    }

    // Test button for room creation
    const testBtn = document.getElementById("testCreateRoom");
    if (testBtn) {
        testBtn.addEventListener("click", async () => {
            console.log("🧪 Test button clicked");
            try {
                const response = await fetch(ROOMS_API, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        roomNumber: `TEST${Date.now()}`,
                        type: "Test Room",
                        price: 99.99,
                        isAvailable: true
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("✅ Test room created:", result);
                    alert("Test room created! ID: " + result.id);
                    loadAdminRooms(); // Refresh the table
                } else {
                    console.error("❌ Test failed:", response.status);
                    alert("Test failed: " + response.status);
                }
            } catch (error) {
                console.error("❌ Test error:", error);
                alert("Test error: " + error.message);
            }
        });
    }

    // Initial load
    loadAdminRooms();
    loadAdminBookings();
}
// -------------------------
// CANCEL BOOKING
// -------------------------

// Cancel booking by Reservation ID or Phone
async function cancelBooking(value) {
    try {
        const response = await fetch(`${BOOKINGS_API}/cancel`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reservation: value })
        });

        if (!response.ok) {
            let errorText = `HTTP ${response.status} - ${response.statusText}`;
            try {
                const body = await response.json();
                if (body && (body.title || body.errors)) {
                    errorText += ` | Details: ${JSON.stringify(body)}`;
                }
            } catch {}
            throw new Error("Failed to cancel reservation. " + errorText);
        }

        return await response.text();
    } catch (error) {
        console.error("Cancel error:", error);
        throw error;
    }
}

// Handle Cancel Reservation form
if (document.getElementById("cancelForm")) {
    document.getElementById("cancelForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const input = document.getElementById("cancelInput").value.trim();
        if (!input) {
            alert("Please enter your Reservation ID or Phone Number.");
            return;
        }

        try {
            await cancelBooking(input);
            alert("Reservation canceled successfully.");
            e.target.reset();
        } catch (error) {
            alert("Error canceling reservation. Check your input.");
        }
    });
}
// Removed duplicate booking form handler - the correct one is above at line 154


// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing admin...");
    initializeAdmin();

});

// -------------------------
// DARK MODE
// -------------------------
document.getElementById("darkToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
} // Close the else block