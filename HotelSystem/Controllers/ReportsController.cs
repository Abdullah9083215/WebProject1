using HotelSystem.Data;
using HotelSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace HotelSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportsController(ApplicationDbContext context)
        {
            _context = context;
            QuestPDF.Settings.License = LicenseType.Community;
        }

        // GET: api/reports/roomhistory/{roomId}
        [HttpGet("roomhistory/{roomId}")]
        public async Task<IActionResult> GetRoomHistory(int roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null) return NotFound("Room not found");

            var bookings = await _context.Bookings
                .Include(b => b.Guest)
                .Include(b => b.Room)
                .Where(b => b.RoomId == roomId && b.Status != "Cancelled")
                .OrderByDescending(b => b.CheckIn)
                .ToListAsync();

            var history = bookings.Select(b => new
            {
                BookingId = b.Id,
                GuestName = b.Guest?.Name ?? "N/A",
                GuestContact = b.Guest?.Contact ?? "N/A",
                CheckIn = b.CheckIn.ToString("yyyy-MM-dd"),
                CheckOut = b.CheckOut.ToString("yyyy-MM-dd"),
                Status = b.Status,
                Nights = (b.CheckOut - b.CheckIn).Days > 0 ? (b.CheckOut - b.CheckIn).Days : 1,
                TotalAmount = (b.Room?.Price ?? 0) * ((b.CheckOut - b.CheckIn).Days > 0 ? (b.CheckOut - b.CheckIn).Days : 1)
            }).ToList();

            return Ok(new
            {
                RoomNumber = room.RoomNumber,
                RoomType = room.Type,
                Bookings = history
            });
        }

        // GET: api/reports/roomhistory/{roomId}/pdf
        [HttpGet("roomhistory/{roomId}/pdf")]
        public async Task<IActionResult> GetRoomHistoryPdf(int roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null) return NotFound("Room not found");

            var bookings = await _context.Bookings
                .Include(b => b.Guest)
                .Include(b => b.Room)
                .Where(b => b.RoomId == roomId && b.Status != "Cancelled")
                .OrderByDescending(b => b.CheckIn)
                .ToListAsync();

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(10));

                    page.Header()
                        .Text($"Room Booking History - {room.RoomNumber}")
                        .SemiBold().FontSize(16).AlignCenter();

                    page.Content()
                        .PaddingVertical(1, Unit.Centimetre)
                        .Column(column =>
                        {
                            column.Item().Text($"Room Type: {room.Type}").FontSize(12).SemiBold();
                            column.Item().PaddingTop(0.5f, Unit.Centimetre);

                            if (bookings.Any())
                            {
                                column.Item().Table(table =>
                                {
                                    table.ColumnsDefinition(columns =>
                                    {
                                        columns.RelativeColumn();
                                        columns.RelativeColumn();
                                        columns.RelativeColumn();
                                        columns.RelativeColumn();
                                        columns.RelativeColumn();
                                    });

                                    table.Header(header =>
                                    {
                                        header.Cell().Element(CellStyle).Text("Guest Name").SemiBold();
                                        header.Cell().Element(CellStyle).Text("Contact").SemiBold();
                                        header.Cell().Element(CellStyle).Text("Check-In").SemiBold();
                                        header.Cell().Element(CellStyle).Text("Check-Out").SemiBold();
                                        header.Cell().Element(CellStyle).Text("Status").SemiBold();
                                    });

                                    foreach (var booking in bookings)
                                    {
                                        var nights = (booking.CheckOut - booking.CheckIn).Days > 0 
                                            ? (booking.CheckOut - booking.CheckIn).Days 
                                            : 1;

                                        table.Cell().Element(CellStyle).Text(booking.Guest?.Name ?? "N/A");
                                        table.Cell().Element(CellStyle).Text(booking.Guest?.Contact ?? "N/A");
                                        table.Cell().Element(CellStyle).Text(booking.CheckIn.ToString("yyyy-MM-dd"));
                                        table.Cell().Element(CellStyle).Text(booking.CheckOut.ToString("yyyy-MM-dd"));
                                        table.Cell().Element(CellStyle).Text(booking.Status);
                                    }
                                });
                            }
                            else
                            {
                                column.Item().Text("No bookings found for this room.").Italic();
                            }
                        });

                    page.Footer()
                        .AlignCenter()
                        .Text(x =>
                        {
                            x.Span("Generated on: ");
                            x.Span(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")).SemiBold();
                        });
                });
            });

            var pdfBytes = document.GeneratePdf();
            return File(pdfBytes, "application/pdf", $"Room_{room.RoomNumber}_History_{DateTime.Now:yyyyMMdd}.pdf");
        }

        static IContainer CellStyle(IContainer container)
        {
            return container
                .Border(1)
                .BorderColor(Colors.Grey.Lighten2)
                .Padding(8)
                .Background(Colors.White);
        }
    }
}
