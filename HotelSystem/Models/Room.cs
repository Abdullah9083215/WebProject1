namespace HotelSystem.Models
{
    public class Room
    {
        public int Id { get; set; }
        public required string RoomNumber { get; set; }
        public required string Type { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
    }
}
