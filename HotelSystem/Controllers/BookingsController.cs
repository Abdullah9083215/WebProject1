using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelSystem.Data;
using HotelSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            return await _context.Bookings
                .Include(b => b.Room)
                .Include(b => b.Guest)
                .ToListAsync();
        }

        // GET: api/bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Bookings
                .Include(b => b.Room)
                .Include(b => b.Guest)
                .FirstOrDefaultAsync(b => b.Id == id);

                if (booking == null) return NotFound();
                return booking;
        }

        // POST: api/bookings
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            Console.WriteLine($"[SERVER] PostBooking called for GuestId: {booking.GuestId}, RoomId: {booking.RoomId}");

            if (!ModelState.IsValid)
            {
                Console.WriteLine("[SERVER] Model state invalid");
                return BadRequest(ModelState);
            }

            // Overbooking Prevention Logic
            var overlappingBooking = await _context.Bookings
                .Where(b => b.RoomId == booking.RoomId
                    && b.Status != "Cancelled"
                    && b.CheckOut > booking.CheckIn
                    && b.CheckIn < booking.CheckOut)
                .FirstOrDefaultAsync();

            if (overlappingBooking != null)
            {
                return Conflict("The date is already booked for this room.");
            }

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            Console.WriteLine($"[SERVER] Booking created with ID: {booking.Id}");
            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
        }

        // PUT: api/bookings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.Id) return BadRequest();

            // Overbooking Prevention Logic for Edit
            var overlappingBooking = await _context.Bookings
                .Where(b => b.RoomId == booking.RoomId
                    && b.Id != booking.Id
                    && b.Status != "Cancelled"
                    && b.CheckOut > booking.CheckIn
                    && b.CheckIn < booking.CheckOut)
                .FirstOrDefaultAsync();

            if (overlappingBooking != null)
            {
                return Conflict("The date is already booked for this room.");
            }

            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null) return NotFound();

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/bookings/cancel
        [HttpDelete("cancel")]
        public async Task<IActionResult> CancelBooking([FromBody] CancelRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Reservation))
                return BadRequest("Reservation identifier is required.");

            Booking booking = null;

            // Try by Reservation ID (number)
            if (int.TryParse(request.Reservation, out int bookingId))
            {
                booking = await _context.Bookings
                    .FirstOrDefaultAsync(b => b.Id == bookingId);
            }

            // Try by phone number
            if (booking == null)
            {
                booking = await _context.Bookings
                    .Include(b => b.Guest)
                    .Where(b => b.Guest.Contact == request.Reservation)
                    .OrderByDescending(b => b.Id)
                    .FirstOrDefaultAsync();
            }

            if (booking == null)
                return NotFound("Booking not found.");

            // Update status
            booking.Status = "Cancelled";
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();

            return Ok("Booking canceled.");
        }


        // DTO class for the request
        public class CancelRequest
        {
            public string Reservation { get; set; }
        }

    }
}