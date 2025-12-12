// ============================================
// API BASE URL
// ============================================
const API_BASE = '/api';

// ============================================
// MULTI-LANGUAGE SUPPORT
// ============================================
const translations = {
    en: {
        title: "Grand Luxe Hotel",
        nav: { brand: "Hotel Management System" },
        hero: {
            title: "Experience Luxury",
            subtitle: "Enjoy the finest hospitality and elegance.",
            button: "Discover Rooms"
        },
        rooms: {
            title: "Available Rooms",
            search: "Search rooms...",
            filter: {
                all: "All Types",
                single: "Single",
                double: "Double",
                suite: "Suite",
                available: "Available",
                unavailable: "Unavailable"
            },
            noRooms: "No rooms available",
            price: "per night"
        },
        booking: {
            title: "Book Your Stay",
            name: "Full Name",
            email: "Email",
            phone: "Phone",
            room: "Room",
            checkin: "Check-in",
            checkout: "Check-out",
            sendEmail: "Send confirmation email",
            submit: "Confirm Booking",
            success: "Booking confirmed successfully!",
            error: "Error creating booking. Please try again.",
            overlap: "The selected dates are already booked for this room."
        },
        cancel: {
            title: "Cancel Your Booking",
            description: "Enter your booking ID or email/phone number to cancel your reservation.",
            reservation: "Booking ID or Email/Phone",
            placeholder: "Enter booking ID or email/phone",
            help: "You can find your Booking ID in your confirmation email or receipt.",
            submit: "Cancel Booking",
            success: "Your booking has been cancelled successfully!",
            error: "Error cancelling booking. Please check your booking ID or contact information.",
            notFound: "Booking not found. Please verify your booking ID or contact information."
        },
        admin: {
            title: "Admin Dashboard - Grand Luxe",
            nav: { brand: "🏨 Admin Dashboard" },
            tabs: {
                rooms: "Rooms",
                guests: "Guests",
                bookings: "Bookings",
                reports: "Reports"
            },
            search: "Search...",
            actions: "Actions",
            cancel: "Cancel",
            save: "Save",
            edit: "Edit",
            delete: "Delete",
            viewReceipt: "View Receipt",
            sendEmail: "Send Email",
            rooms: {
                title: "Manage Rooms",
                add: "Add New Room",
                table: {
                    id: "ID",
                    number: "Room Number",
                    type: "Type",
                    price: "Price",
                    available: "Available"
                },
                form: {
                    number: "Room Number",
                    type: "Type",
                    typeSingle: "Single",
                    typeDouble: "Double",
                    typeSuite: "Suite",
                    price: "Price per Night",
                    available: "Available"
                }
            },
            guests: {
                title: "Manage Guests",
                add: "Add New Guest",
                table: {
                    id: "ID",
                    name: "Name",
                    contact: "Contact"
                },
                form: {
                    name: "Name",
                    contact: "Contact (Email or Phone)"
                }
            },
            bookings: {
                title: "Manage Bookings",
                add: "Add New Booking",
                filter: {
                    all: "All Status",
                    confirmed: "Confirmed",
                    cancelled: "Cancelled",
                    completed: "Completed"
                },
                table: {
                    id: "ID",
                    guest: "Guest",
                    room: "Room",
                    checkin: "Check-in",
                    checkout: "Check-out",
                    status: "Status"
                },
                form: {
                    guest: "Guest",
                    room: "Room",
                    checkin: "Check-in",
                    checkout: "Check-out",
                    status: "Status"
                },
                status: {
                    confirmed: "Confirmed",
                    cancelled: "Cancelled",
                    completed: "Completed"
                }
            },
            reports: {
                title: "Room Booking History",
                selectRoom: "Select Room:",
                select: "Select a room...",
                load: "Load History",
                export: "Export PDF",
                noHistory: "No booking history found for this room."
            }
        },
        receipt: {
            title: "Booking Receipt - Grand Luxe",
            header: "Grand Luxe Hotel",
            subtitle: "Booking Receipt",
            print: "Print Receipt",
            home: "Back to Home",
            admin: "Back to Admin",
            details: {
                bookingId: "Booking ID",
                guest: "Guest",
                contact: "Contact",
                room: "Room",
                type: "Type",
                checkin: "Check-in",
                checkout: "Check-out",
                nights: "Nights",
                pricePerNight: "Price per Night",
                totalAmount: "Total Amount",
                status: "Status",
                date: "Receipt Date"
            }
        }
    },
    ar: {
        title: "فندق جراند لوكس",
        nav: { brand: "نظام إدارة الفندق" },
        hero: {
            title: "اختبر الفخامة",
            subtitle: "استمتع بأرقى الخدمات والأناقة.",
            button: "اكتشف الغرف"
        },
        rooms: {
            title: "الغرف المتاحة",
            search: "ابحث عن الغرف...",
            filter: {
                all: "جميع الأنواع",
                single: "مفردة",
                double: "مزدوجة",
                suite: "جناح",
                available: "متاحة",
                unavailable: "غير متاحة"
            },
            noRooms: "لا توجد غرف متاحة",
            price: "لليلة"
        },
        booking: {
            title: "احجز إقامتك",
            name: "الاسم الكامل",
            email: "البريد الإلكتروني",
            phone: "الهاتف",
            room: "الغرفة",
            checkin: "تاريخ الوصول",
            checkout: "تاريخ المغادرة",
            sendEmail: "إرسال بريد تأكيد",
            submit: "تأكيد الحجز",
            success: "تم تأكيد الحجز بنجاح!",
            error: "خطأ في إنشاء الحجز. يرجى المحاولة مرة أخرى.",
            overlap: "التواريخ المحددة محجوزة بالفعل لهذه الغرفة."
        },
        cancel: {
            title: "إلغاء حجزك",
            description: "أدخل رقم الحجز أو البريد الإلكتروني/رقم الهاتف لإلغاء الحجز.",
            reservation: "رقم الحجز أو البريد الإلكتروني/الهاتف",
            placeholder: "أدخل رقم الحجز أو البريد الإلكتروني/الهاتف",
            help: "يمكنك العثور على رقم الحجز في بريد التأكيد أو الإيصال.",
            submit: "إلغاء الحجز",
            success: "تم إلغاء الحجز بنجاح!",
            error: "خطأ في إلغاء الحجز. يرجى التحقق من رقم الحجز أو معلومات الاتصال.",
            notFound: "لم يتم العثور على الحجز. يرجى التحقق من رقم الحجز أو معلومات الاتصال."
        },
        admin: {
            title: "لوحة تحكم المدير - جراند لوكس",
            nav: { brand: "🏨 لوحة تحكم المدير" },
            tabs: {
                rooms: "الغرف",
                guests: "الضيوف",
                bookings: "الحجوزات",
                reports: "التقارير"
            },
            search: "بحث...",
            actions: "الإجراءات",
            cancel: "إلغاء",
            save: "حفظ",
            edit: "تعديل",
            delete: "حذف",
            viewReceipt: "عرض الإيصال",
            sendEmail: "إرسال بريد",
            rooms: {
                title: "إدارة الغرف",
                add: "إضافة غرفة جديدة",
                table: {
                    id: "المعرف",
                    number: "رقم الغرفة",
                    type: "النوع",
                    price: "السعر",
                    available: "متاحة"
                },
                form: {
                    number: "رقم الغرفة",
                    type: "النوع",
                    typeSingle: "مفردة",
                    typeDouble: "مزدوجة",
                    typeSuite: "جناح",
                    price: "السعر لليلة",
                    available: "متاحة"
                }
            },
            guests: {
                title: "إدارة الضيوف",
                add: "إضافة ضيف جديد",
                table: {
                    id: "المعرف",
                    name: "الاسم",
                    contact: "جهة الاتصال"
                },
                form: {
                    name: "الاسم",
                    contact: "جهة الاتصال (بريد إلكتروني أو هاتف)"
                }
            },
            bookings: {
                title: "إدارة الحجوزات",
                add: "إضافة حجز جديد",
                filter: {
                    all: "جميع الحالات",
                    confirmed: "مؤكد",
                    cancelled: "ملغي",
                    completed: "مكتمل"
                },
                table: {
                    id: "المعرف",
                    guest: "الضيف",
                    room: "الغرفة",
                    checkin: "تاريخ الوصول",
                    checkout: "تاريخ المغادرة",
                    status: "الحالة"
                },
                form: {
                    guest: "الضيف",
                    room: "الغرفة",
                    checkin: "تاريخ الوصول",
                    checkout: "تاريخ المغادرة",
                    status: "الحالة"
                },
                status: {
                    confirmed: "مؤكد",
                    cancelled: "ملغي",
                    completed: "مكتمل"
                }
            },
            reports: {
                title: "سجل حجوزات الغرفة",
                selectRoom: "اختر الغرفة:",
                select: "اختر غرفة...",
                load: "تحميل السجل",
                export: "تصدير PDF",
                noHistory: "لا يوجد سجل حجوزات لهذه الغرفة."
            }
        },
        receipt: {
            title: "إيصال الحجز - جراند لوكس",
            header: "فندق جراند لوكس",
            subtitle: "إيصال الحجز",
            print: "طباعة الإيصال",
            home: "العودة للصفحة الرئيسية",
            admin: "العودة للوحة التحكم",
            details: {
                bookingId: "رقم الحجز",
                guest: "الضيف",
                contact: "جهة الاتصال",
                room: "الغرفة",
                type: "النوع",
                checkin: "تاريخ الوصول",
                checkout: "تاريخ المغادرة",
                nights: "الليالي",
                pricePerNight: "السعر لليلة",
                totalAmount: "المبلغ الإجمالي",
                status: "الحالة",
                date: "تاريخ الإيصال"
            }
        }
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getTranslation(key);
        if (value) el.textContent = value;
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = getTranslation(key);
        if (value) el.placeholder = value;
    });
    
    // Reload data if on admin page
    if (document.getElementById('adminRoomsTable')) {
        loadAdminData();
    }
    if (document.getElementById('roomsContainer')) {
        loadRooms();
    }
}

function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
        value = value?.[k];
    }
    return value || key;
}

// Initialize language
$(document).ready(function() {
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = currentLanguage;
        langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
        setLanguage(currentLanguage);
    }
});

// ============================================
// ROOMS API
// ============================================
async function loadRooms() {
    try {
        const response = await fetch(`${API_BASE}/rooms`);
        const rooms = await response.json();
        displayRooms(rooms);
    } catch (error) {
        console.error('Error loading rooms:', error);
    }
}

function displayRooms(rooms) {
    const container = document.getElementById('roomsContainer');
    const roomSelect = document.getElementById('roomSelect');
    
    if (!container) return;
    
    container.innerHTML = '';
    if (roomSelect) roomSelect.innerHTML = '<option value="">' + getTranslation('booking.room') + '</option>';
    
    if (rooms.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>' + getTranslation('rooms.noRooms') + '</p></div>';
        return;
    }
    
    rooms.forEach(room => {
        const card = `
            <div class="col-md-4">
                <div class="room-card glass-card p-3 text-center">
                    <h4>${room.roomNumber || room.name}</h4>
                    <p class="text-muted">${room.type}</p>
                    <p class="text-primary fw-bold">$${room.price} ${getTranslation('rooms.price')}</p>
                    ${room.isAvailable ? '<span class="badge bg-success">' + getTranslation('rooms.filter.available') + '</span>' : 
                      '<span class="badge bg-danger">' + getTranslation('rooms.filter.unavailable') + '</span>'}
                </div>
            </div>
        `;
        container.innerHTML += card;
        
        if (roomSelect) {
            roomSelect.innerHTML += `<option value="${room.id}">${room.roomNumber || room.name} - ${room.type} ($${room.price})</option>`;
        }
    });
}

// ============================================
// BOOKING API (Using jQuery AJAX)
// ============================================
function createBooking(bookingData) {
    return new Promise((resolve, reject) => {
        // First, get or create guest using jQuery AJAX
        let guestId = bookingData.guestId;
        
        if (!guestId && bookingData.email) {
            // Try to find existing guest by email
            $.ajax({
                url: `${API_BASE}/guests`,
                method: 'GET',
                success: function(guests) {
                    const existingGuest = guests.find(g => g.contact === bookingData.email);
                    
                    if (existingGuest) {
                        guestId = existingGuest.id;
                        createBookingRequest(guestId, bookingData, resolve, reject);
                    } else {
                        // Create new guest
                        $.ajax({
                            url: `${API_BASE}/guests`,
                            method: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                name: bookingData.name,
                                contact: bookingData.email
                            }),
                            success: function(newGuest) {
                                guestId = newGuest.id;
                                createBookingRequest(guestId, bookingData, resolve, reject);
                            },
                            error: reject
                        });
                    }
                },
                error: reject
            });
        } else {
            createBookingRequest(guestId, bookingData, resolve, reject);
        }
    });
}

function createBookingRequest(guestId, bookingData, resolve, reject) {
    // Create booking using jQuery AJAX
    $.ajax({
        url: `${API_BASE}/bookings`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            guestId: guestId,
            roomId: parseInt(bookingData.roomId),
            checkIn: bookingData.checkin,
            checkOut: bookingData.checkout,
            status: 'Confirmed'
        }),
        success: function(booking) {
            // Send email if requested
            if (bookingData.sendEmail && booking.id) {
                $.ajax({
                    url: `${API_BASE}/email/sendbookingconfirmation`,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ bookingId: booking.id }),
                    error: function() {
                        console.error('Email sending failed');
                    }
                });
            }
            resolve(booking);
        },
        error: function(xhr) {
            if (xhr.status === 409) {
                reject(new Error(getTranslation('booking.overlap')));
            } else {
                reject(new Error(xhr.responseText || getTranslation('booking.error')));
            }
        }
    });
}

// ============================================
// ADMIN - ROOMS CRUD (Using jQuery AJAX)
// ============================================
function loadAdminRooms(search = '') {
    $.ajax({
        url: `${API_BASE}/rooms`,
        method: 'GET',
        data: { search: search },
        success: function(rooms) {
            displayAdminRooms(rooms);
        },
        error: function(xhr, status, error) {
            console.error('Error loading rooms:', error);
        }
    });
}

function displayAdminRooms(rooms) {
    const tbody = document.getElementById('adminRoomsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    rooms.forEach(room => {
        const row = `
            <tr>
                <td>${room.id}</td>
                <td>${room.roomNumber}</td>
                <td>${room.type}</td>
                <td>$${room.price}</td>
                <td>${room.isAvailable ? '<span class="badge bg-success">' + getTranslation('rooms.filter.available') + '</span>' : 
                    '<span class="badge bg-danger">' + getTranslation('rooms.filter.unavailable') + '</span>'}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editRoom(${room.id})">
                        <i class="fas fa-edit"></i> ${getTranslation('admin.edit')}
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRoom(${room.id})">
                        <i class="fas fa-trash"></i> ${getTranslation('admin.delete')}
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openRoomModal(roomId = null) {
    $('#roomId').val(roomId || '');
    $('#roomNumber').val('');
    $('#roomType').val('Single');
    $('#roomPrice').val('');
    $('#roomAvailable').prop('checked', true);
    
    if (roomId) {
        $('#roomModalTitle').text(getTranslation('admin.edit') + ' ' + getTranslation('admin.rooms.title'));
        // Using jQuery AJAX to load room data
        $.ajax({
            url: `${API_BASE}/rooms/${roomId}`,
            method: 'GET',
            success: function(room) {
                $('#roomNumber').val(room.roomNumber);
                $('#roomType').val(room.type);
                $('#roomPrice').val(room.price);
                $('#roomAvailable').prop('checked', room.isAvailable);
            }
        });
    } else {
        $('#roomModalTitle').text(getTranslation('admin.rooms.add'));
    }
}

function saveRoom() {
    const room = {
        id: parseInt($('#roomId').val()) || 0,
        roomNumber: $('#roomNumber').val(),
        type: $('#roomType').val(),
        price: parseFloat($('#roomPrice').val()),
        isAvailable: $('#roomAvailable').is(':checked')
    };
    
    const url = room.id ? `${API_BASE}/rooms/${room.id}` : `${API_BASE}/rooms`;
    const method = room.id ? 'PUT' : 'POST';
    
    // Using jQuery AJAX
    $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        data: JSON.stringify(room),
        success: function() {
            bootstrap.Modal.getInstance(document.getElementById('roomModal')).hide();
            loadAdminRooms();
        },
        error: function() {
            alert('Error saving room');
        }
    });
}

function deleteRoom(id) {
    if (!confirm('Are you sure you want to delete this room?')) return;
    
    // Using jQuery AJAX
    $.ajax({
        url: `${API_BASE}/rooms/${id}`,
        method: 'DELETE',
        success: function() {
            loadAdminRooms();
        },
        error: function() {
            alert('Error deleting room');
        }
    });
}

function editRoom(id) {
    openRoomModal(id);
    bootstrap.Modal.getOrCreateInstance(document.getElementById('roomModal')).show();
}

// ============================================
// ADMIN - GUESTS CRUD (Using jQuery AJAX)
// ============================================
function loadAdminGuests(search = '') {
    $.ajax({
        url: `${API_BASE}/guests`,
        method: 'GET',
        data: { search: search },
        success: function(guests) {
            displayAdminGuests(guests);
        },
        error: function(xhr, status, error) {
            console.error('Error loading guests:', error);
        }
    });
}

function displayAdminGuests(guests) {
    const tbody = document.getElementById('adminGuestsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    guests.forEach(guest => {
        const row = `
            <tr>
                <td>${guest.id}</td>
                <td>${guest.name}</td>
                <td>${guest.contact}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editGuest(${guest.id})">
                        <i class="fas fa-edit"></i> ${getTranslation('admin.edit')}
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteGuest(${guest.id})">
                        <i class="fas fa-trash"></i> ${getTranslation('admin.delete')}
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openGuestModal(guestId = null) {
    document.getElementById('guestId').value = guestId || '';
    document.getElementById('guestName').value = '';
    document.getElementById('guestContact').value = '';
    
    if (guestId) {
        document.getElementById('guestModalTitle').textContent = getTranslation('admin.edit') + ' ' + getTranslation('admin.guests.title');
        fetch(`${API_BASE}/guests/${guestId}`)
            .then(r => r.json())
            .then(guest => {
                document.getElementById('guestName').value = guest.name;
                document.getElementById('guestContact').value = guest.contact;
            });
    } else {
        document.getElementById('guestModalTitle').textContent = getTranslation('admin.guests.add');
    }
}

async function saveGuest() {
    const guest = {
        id: parseInt(document.getElementById('guestId').value) || 0,
        name: document.getElementById('guestName').value,
        contact: document.getElementById('guestContact').value
    };
    
    try {
        const url = guest.id ? `${API_BASE}/guests/${guest.id}` : `${API_BASE}/guests`;
        const method = guest.id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guest)
        });
        
        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('guestModal')).hide();
            loadAdminGuests();
            // Reload guest select in booking modal
            loadBookingGuests();
        } else {
            alert('Error saving guest');
        }
    } catch (error) {
        alert('Error saving guest: ' + error.message);
    }
}

async function deleteGuest(id) {
    if (!confirm('Are you sure you want to delete this guest?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/guests/${id}`, { method: 'DELETE' });
        if (response.ok) {
            loadAdminGuests();
        } else {
            alert('Error deleting guest');
        }
    } catch (error) {
        alert('Error deleting guest: ' + error.message);
    }
}

function editGuest(id) {
    openGuestModal(id);
    bootstrap.Modal.getOrCreateInstance(document.getElementById('guestModal')).show();
}

// ============================================
// ADMIN - BOOKINGS CRUD (Using jQuery AJAX)
// ============================================
function loadAdminBookings(search = '', status = '') {
    $.ajax({
        url: `${API_BASE}/bookings`,
        method: 'GET',
        data: {
            search: search,
            status: status
        },
        success: function(bookings) {
            displayAdminBookings(bookings);
        },
        error: function(xhr, status, error) {
            console.error('Error loading bookings:', error);
        }
    });
}

function displayAdminBookings(bookings) {
    const tbody = document.getElementById('adminBookingsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    bookings.forEach(booking => {
        const row = `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.guest?.name || 'N/A'}</td>
                <td>${booking.room?.roomNumber || 'N/A'} (${booking.room?.type || 'N/A'})</td>
                <td>${new Date(booking.checkIn).toLocaleDateString()}</td>
                <td>${new Date(booking.checkOut).toLocaleDateString()}</td>
                <td><span class="badge bg-${booking.status === 'Confirmed' ? 'success' : booking.status === 'Cancelled' ? 'danger' : 'secondary'}">${booking.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewReceipt(${booking.id})">
                        <i class="fas fa-receipt"></i> ${getTranslation('admin.viewReceipt')}
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="editBooking(${booking.id})">
                        <i class="fas fa-edit"></i> ${getTranslation('admin.edit')}
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBooking(${booking.id})">
                        <i class="fas fa-trash"></i> ${getTranslation('admin.delete')}
                    </button>
                    <button class="btn btn-sm btn-success" onclick="sendBookingEmail(${booking.id})">
                        <i class="fas fa-envelope"></i> ${getTranslation('admin.sendEmail')}
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadBookingGuests() {
    try {
        const response = await fetch(`${API_BASE}/guests`);
        const guests = await response.json();
        const select = document.getElementById('bookingGuestId');
        if (select) {
            select.innerHTML = '<option value="">' + getTranslation('admin.bookings.form.guest') + '</option>';
            guests.forEach(guest => {
                select.innerHTML += `<option value="${guest.id}">${guest.name} (${guest.contact})</option>`;
            });
        }
    } catch (error) {
        console.error('Error loading guests:', error);
    }
}

async function loadBookingRooms() {
    try {
        const response = await fetch(`${API_BASE}/rooms`);
        const rooms = await response.json();
        const select = document.getElementById('bookingRoomId');
        if (select) {
            select.innerHTML = '<option value="">' + getTranslation('admin.bookings.form.room') + '</option>';
            rooms.forEach(room => {
                select.innerHTML += `<option value="${room.id}">${room.roomNumber} - ${room.type} ($${room.price})</option>`;
            });
        }
    } catch (error) {
        console.error('Error loading rooms:', error);
    }
}

function openBookingModal(bookingId = null) {
    document.getElementById('bookingId').value = bookingId || '';
    document.getElementById('bookingGuestId').value = '';
    document.getElementById('bookingRoomId').value = '';
    document.getElementById('bookingCheckIn').value = '';
    document.getElementById('bookingCheckOut').value = '';
    document.getElementById('bookingStatus').value = 'Confirmed';
    
    loadBookingGuests();
    loadBookingRooms();
    
    if (bookingId) {
        document.getElementById('bookingModalTitle').textContent = getTranslation('admin.edit') + ' ' + getTranslation('admin.bookings.title');
        fetch(`${API_BASE}/bookings/${bookingId}`)
            .then(r => r.json())
            .then(booking => {
                document.getElementById('bookingGuestId').value = booking.guestId;
                document.getElementById('bookingRoomId').value = booking.roomId;
                document.getElementById('bookingCheckIn').value = booking.checkIn.split('T')[0];
                document.getElementById('bookingCheckOut').value = booking.checkOut.split('T')[0];
                document.getElementById('bookingStatus').value = booking.status;
            });
    } else {
        document.getElementById('bookingModalTitle').textContent = getTranslation('admin.bookings.add');
    }
}

async function saveBooking() {
    const booking = {
        id: parseInt(document.getElementById('bookingId').value) || 0,
        guestId: parseInt(document.getElementById('bookingGuestId').value),
        roomId: parseInt(document.getElementById('bookingRoomId').value),
        checkIn: document.getElementById('bookingCheckIn').value,
        checkOut: document.getElementById('bookingCheckOut').value,
        status: document.getElementById('bookingStatus').value
    };
    
    try {
        const url = booking.id ? `${API_BASE}/bookings/${booking.id}` : `${API_BASE}/bookings`;
        const method = booking.id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });
        
        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
            loadAdminBookings();
        } else {
            const error = await response.text();
            alert('Error saving booking: ' + error);
        }
    } catch (error) {
        alert('Error saving booking: ' + error.message);
    }
}

async function deleteBooking(id) {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/bookings/${id}`, { method: 'DELETE' });
        if (response.ok) {
            loadAdminBookings();
        } else {
            alert('Error deleting booking');
        }
    } catch (error) {
        alert('Error deleting booking: ' + error.message);
    }
}

function editBooking(id) {
    openBookingModal(id);
    bootstrap.Modal.getOrCreateInstance(document.getElementById('bookingModal')).show();
}

function viewReceipt(id) {
    // Check if we're on admin page
    const isAdminPage = window.location.pathname.includes('admin.html') || document.getElementById('adminRoomsTable');
    const source = isAdminPage ? 'admin' : 'index';
    window.open(`receipt.html?id=${id}&source=${source}`, '_blank');
}

async function sendBookingEmail(id) {
    try {
        const response = await fetch(`${API_BASE}/email/sendbookingconfirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId: id })
        });
        
        if (response.ok) {
            alert('Email sent successfully!');
        } else {
            const error = await response.text();
            alert('Error sending email: ' + error);
        }
    } catch (error) {
        alert('Error sending email: ' + error.message);
    }
}

// ============================================
// RECEIPT (Using jQuery AJAX)
// ============================================
function loadReceipt(bookingId) {
    $.ajax({
        url: `${API_BASE}/bookings/receipt/${bookingId}`,
        method: 'GET',
        success: function(receipt) {
            displayReceipt(receipt);
        },
        error: function(xhr, status, error) {
            $('#receiptContent').html('<div class="alert alert-danger">Error loading receipt</div>');
            console.error('Error loading receipt:', error);
        }
    });
}

function displayReceipt(receipt) {
    const content = document.getElementById('receiptContent');
    if (!content) return;
    
    // Safe translation function with fallback
    const t = (key) => {
        if (typeof getTranslation === 'function') {
            return getTranslation(key) || key;
        }
        // Fallback translations
        const fallbacks = {
            'receipt.details.bookingId': 'Booking ID',
            'receipt.details.guest': 'Guest',
            'receipt.details.contact': 'Contact',
            'receipt.details.room': 'Room',
            'receipt.details.type': 'Type',
            'receipt.details.checkin': 'Check-in',
            'receipt.details.checkout': 'Check-out',
            'receipt.details.nights': 'Nights',
            'receipt.details.pricePerNight': 'Price per Night',
            'receipt.details.totalAmount': 'Total Amount',
            'receipt.details.status': 'Status',
            'receipt.details.date': 'Receipt Date'
        };
        return fallbacks[key] || key;
    };
    
    content.innerHTML = `
        <div class="receipt-details">
            <table class="table table-bordered">
                <tr><td><strong>${t('receipt.details.bookingId')}:</strong></td><td>${receipt.bookingId}</td></tr>
                <tr><td><strong>${t('receipt.details.guest')}:</strong></td><td>${receipt.guest?.name || 'N/A'}</td></tr>
                <tr><td><strong>${t('receipt.details.contact')}:</strong></td><td>${receipt.guest?.contact || 'N/A'}</td></tr>
                <tr><td><strong>${t('receipt.details.room')}:</strong></td><td>${receipt.room?.roomNumber || 'N/A'}</td></tr>
                <tr><td><strong>${t('receipt.details.type')}:</strong></td><td>${receipt.room?.type || 'N/A'}</td></tr>
                <tr><td><strong>${t('receipt.details.checkin')}:</strong></td><td>${new Date(receipt.checkIn).toLocaleDateString()}</td></tr>
                <tr><td><strong>${t('receipt.details.checkout')}:</strong></td><td>${new Date(receipt.checkOut).toLocaleDateString()}</td></tr>
                <tr><td><strong>${t('receipt.details.nights')}:</strong></td><td>${receipt.nights}</td></tr>
                <tr><td><strong>${t('receipt.details.pricePerNight')}:</strong></td><td>$${(receipt.pricePerNight || 0).toFixed(2)}</td></tr>
                <tr class="table-primary"><td><strong>${t('receipt.details.totalAmount')}:</strong></td><td><strong>$${(receipt.totalAmount || 0).toFixed(2)}</strong></td></tr>
                <tr><td><strong>${t('receipt.details.status')}:</strong></td><td>${receipt.status || 'N/A'}</td></tr>
                <tr><td><strong>${t('receipt.details.date')}:</strong></td><td>${new Date(receipt.receiptDate || Date.now()).toLocaleString()}</td></tr>
            </table>
        </div>
    `;
}

// ============================================
// REPORTS
// ============================================
async function loadRoomHistory() {
    const roomId = document.getElementById('reportRoomSelect').value;
    if (!roomId) {
        alert('Please select a room');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/reports/roomhistory/${roomId}`);
        const data = await response.json();
        displayRoomHistory(data);
    } catch (error) {
        document.getElementById('roomHistoryContainer').innerHTML = 
            '<div class="alert alert-danger">Error loading history</div>';
    }
}

function displayRoomHistory(data) {
    const container = document.getElementById('roomHistoryContainer');
    if (!container) return;
    
    let html = `<h4>${getTranslation('admin.reports.title')} - ${data.roomNumber} (${data.roomType})</h4>`;
    
    if (data.bookings && data.bookings.length > 0) {
        html += `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>${getTranslation('admin.bookings.table.id')}</th>
                        <th>${getTranslation('admin.bookings.table.guest')}</th>
                        <th>${getTranslation('admin.bookings.table.checkin')}</th>
                        <th>${getTranslation('admin.bookings.table.checkout')}</th>
                        <th>${getTranslation('receipt.details.nights')}</th>
                        <th>${getTranslation('receipt.details.totalAmount')}</th>
                        <th>${getTranslation('admin.bookings.table.status')}</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        data.bookings.forEach(booking => {
            html += `
                <tr>
                    <td>${booking.bookingId}</td>
                    <td>${booking.guestName} (${booking.guestContact})</td>
                    <td>${booking.checkIn}</td>
                    <td>${booking.checkOut}</td>
                    <td>${booking.nights}</td>
                    <td>$${booking.totalAmount.toFixed(2)}</td>
                    <td>${booking.status}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
    } else {
        html += `<p>${getTranslation('admin.reports.noHistory')}</p>`;
    }
    
    container.innerHTML = html;
}

async function exportRoomHistoryPdf() {
    const roomId = document.getElementById('reportRoomSelect').value;
    if (!roomId) {
        alert('Please select a room');
        return;
    }
    
    window.open(`${API_BASE}/reports/roomhistory/${roomId}/pdf`, '_blank');
}

// ============================================
// SEARCH AND FILTER
// ============================================
function setupSearchAndFilter() {
    // Room search on index page - Real-time AJAX search using jQuery
    $('#roomSearch').on('input', function() {
        filterRooms();
    });
    
    // Room type filter - Real-time AJAX filter
    $('#roomTypeFilter').on('change', function() {
        filterRooms();
    });
    
    // Availability filter - Real-time AJAX filter
    $('#availabilityFilter').on('change', function() {
        filterRooms();
    });
    
    // Admin search - Real-time AJAX search using jQuery
    $('#roomSearchAdmin').on('input', function() {
        filterAdminRooms();
    });
    
    $('#guestSearchAdmin').on('input', function() {
        filterAdminGuests();
    });
    
    $('#bookingSearchAdmin').on('input', function() {
        filterAdminBookings();
    });
    
    $('#bookingStatusFilter').on('change', function() {
        filterAdminBookings();
    });
}

let allRooms = [];
let allGuests = [];
let allBookings = [];

// Real-time search and filter using jQuery AJAX
function filterRooms() {
    const search = $('#roomSearch').val() || '';
    const typeFilter = $('#roomTypeFilter').val() || '';
    const availabilityFilter = $('#availabilityFilter').val() || '';
    
    // Real-time AJAX call to server for filtering
    loadRooms(search, typeFilter, availabilityFilter);
}

function filterAdminRooms() {
    const search = $('#roomSearchAdmin').val() || '';
    // Real-time AJAX call for admin room search
    loadAdminRooms(search);
}

function filterAdminGuests() {
    const search = $('#guestSearchAdmin').val() || '';
    // Real-time AJAX call for admin guest search
    loadAdminGuests(search);
}

function filterAdminBookings() {
    const search = $('#bookingSearchAdmin').val() || '';
    const statusFilter = $('#bookingStatusFilter').val() || '';
    // Real-time AJAX call for admin booking search and filter
    loadAdminBookings(search, statusFilter);
}

// ============================================
// CANCEL BOOKING (GUEST)
// ============================================
async function cancelGuestBooking(reservation) {
    try {
        const response = await fetch(`${API_BASE}/bookings/cancel`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reservation: reservation })
        });
        
        if (response.ok) {
            return { success: true, message: await response.text() };
        } else if (response.status === 404) {
            return { success: false, message: getTranslation('cancel.notFound') };
        } else {
            const error = await response.text();
            return { success: false, message: error || getTranslation('cancel.error') };
        }
    } catch (error) {
        return { success: false, message: getTranslation('cancel.error') };
    }
}

// ============================================
// INITIALIZATION
// ============================================
function loadAdminData() {
    if (document.getElementById('adminRoomsTable')) {
        loadAdminRooms();
        loadAdminGuests();
        loadAdminBookings();
        
        // Load rooms for report dropdown
        fetch(`${API_BASE}/rooms`)
            .then(r => r.json())
            .then(rooms => {
                const select = document.getElementById('reportRoomSelect');
                if (select) {
                    select.innerHTML = '<option value="">' + getTranslation('admin.reports.select') + '</option>';
                    rooms.forEach(room => {
                        select.innerHTML += `<option value="${room.id}">${room.roomNumber} - ${room.type}</option>`;
                    });
                }
            });
    }
}

// Initialize on page load
$(document).ready(function() {
    // Load rooms on index page
    if (document.getElementById('roomsContainer')) {
        loadRooms();
        setupSearchAndFilter();
        
        // Booking form submission - Using jQuery
        $('#bookingForm').on('submit', function(e) {
            e.preventDefault();
            
            const bookingData = {
                name: $('#name').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                roomId: $('#roomSelect').val(),
                checkin: $('#checkin').val(),
                checkout: $('#checkout').val(),
                sendEmail: $('#sendEmail').is(':checked')
            };
            
            createBooking(bookingData)
                .then(function(booking) {
                    $('#bookingMessage').html(`<div class="alert alert-success">${getTranslation('booking.success')}</div>`);
                    $('#bookingMessage').append(`<p><a href="receipt.html?id=${booking.id}&source=index" target="_blank">${getTranslation('admin.viewReceipt')}</a></p>`);
                    $('#bookingForm')[0].reset();
                })
                .catch(function(error) {
                    $('#bookingMessage').html(`<div class="alert alert-danger">${error.message}</div>`);
                });
        });
        
        // Cancel booking form submission - Using jQuery
        $('#cancelBookingForm').on('submit', function(e) {
            e.preventDefault();
            const reservation = $('#cancelReservation').val().trim();
            
            if (!reservation) {
                $('#cancelMessage').html(`<div class="alert alert-warning">${getTranslation('cancel.reservation')} ${getTranslation('cancel.help')}</div>`);
                return;
            }
            
            $('#cancelMessage').html('<div class="alert alert-info">Processing cancellation...</div>');
            
            cancelGuestBooking(reservation).then(function(result) {
                if (result.success) {
                    $('#cancelMessage').html(`<div class="alert alert-success">${getTranslation('cancel.success')}</div>`);
                    $('#cancelBookingForm')[0].reset();
                } else {
                    $('#cancelMessage').html(`<div class="alert alert-danger">${result.message}</div>`);
                }
            });
        });
    }
    
    // Load admin data
    loadAdminData();
    setupSearchAndFilter();
    
    // Dark mode toggle
    document.getElementById('darkToggle')?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // Set minimum date for check-in to today
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    if (checkinInput) {
        checkinInput.min = new Date().toISOString().split('T')[0];
        checkinInput.addEventListener('change', () => {
            if (checkoutInput) {
                checkoutInput.min = checkinInput.value;
            }
        });
    }
});
