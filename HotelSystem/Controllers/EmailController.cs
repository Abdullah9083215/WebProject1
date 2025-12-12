using HotelSystem.Data;
using HotelSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MailKit.Net.Smtp;

namespace HotelSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public EmailController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/email/sendbookingconfirmation
        [HttpPost("sendbookingconfirmation")]
        public async Task<IActionResult> SendBookingConfirmation([FromBody] EmailRequest request)
        {
            if (request == null || request.BookingId <= 0)
                return BadRequest("Booking ID is required");

            var booking = await _context.Bookings
                .Include(b => b.Room)
                .Include(b => b.Guest)
                .FirstOrDefaultAsync(b => b.Id == request.BookingId);

            if (booking == null)
                return NotFound("Booking not found");

            if (string.IsNullOrEmpty(booking.Guest?.Contact) || !booking.Guest.Contact.Contains("@"))
                return BadRequest("Guest email is not available");

            try
            {
                var nights = (booking.CheckOut - booking.CheckIn).Days > 0 
                    ? (booking.CheckOut - booking.CheckIn).Days 
                    : 1;
                var totalAmount = (booking.Room?.Price ?? 0) * nights;

                var emailBody = $@"
                    <html>
                    <body style='font-family: Arial, sans-serif;'>
                        <h2>Booking Confirmation - Grand Luxe Hotel</h2>
                        <p>Dear {booking.Guest.Name},</p>
                        <p>Your booking has been confirmed!</p>
                        <table border='1' cellpadding='10' style='border-collapse: collapse;'>
                            <tr><td><strong>Booking ID:</strong></td><td>{booking.Id}</td></tr>
                            <tr><td><strong>Room:</strong></td><td>{booking.Room?.RoomNumber} ({booking.Room?.Type})</td></tr>
                            <tr><td><strong>Check-in:</strong></td><td>{booking.CheckIn:yyyy-MM-dd}</td></tr>
                            <tr><td><strong>Check-out:</strong></td><td>{booking.CheckOut:yyyy-MM-dd}</td></tr>
                            <tr><td><strong>Nights:</strong></td><td>{nights}</td></tr>
                            <tr><td><strong>Price per night:</strong></td><td>${booking.Room?.Price:F2}</td></tr>
                            <tr><td><strong>Total Amount:</strong></td><td><strong>${totalAmount:F2}</strong></td></tr>
                            <tr><td><strong>Status:</strong></td><td>{booking.Status}</td></tr>
                        </table>
                        <p>Thank you for choosing Grand Luxe Hotel!</p>
                        <p>Best regards,<br>Grand Luxe Hotel Team</p>
                    </body>
                    </html>";

                await SendEmailAsync(
                    booking.Guest.Contact,
                    "Booking Confirmation - Grand Luxe Hotel",
                    emailBody
                );

                return Ok(new { message = "Confirmation email sent successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Failed to send email: {ex.Message}" });
            }
        }

        private async Task SendEmailAsync(string toEmail, string subject, string htmlBody)
        {
            // Get email settings from configuration or use defaults
            var smtpServer = _configuration["EmailSettings:SmtpServer"] ?? "smtp.gmail.com";
            var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
            var smtpUsername = _configuration["EmailSettings:Username"] ?? "";
            var smtpPassword = _configuration["EmailSettings:Password"] ?? "";
            var fromEmail = _configuration["EmailSettings:FromEmail"] ?? "noreply@hotel.com";
            var fromName = _configuration["EmailSettings:FromName"] ?? "Grand Luxe Hotel";

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(fromName, fromEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = htmlBody
            };
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(smtpServer, smtpPort, false);
                
                // If credentials are provided, use them
                if (!string.IsNullOrEmpty(smtpUsername) && !string.IsNullOrEmpty(smtpPassword))
                {
                    await client.AuthenticateAsync(smtpUsername, smtpPassword);
                }
                
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }

        public class EmailRequest
        {
            public int BookingId { get; set; }
        }
    }
}
