namespace NotificationService.Entities
{
    public class Notification
    {
        public long Id { get; set; }

        public long UserId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

        public bool IsRead { get; set; } = false;

        public long? ReferenceId { get; set; }

        public string? ReferenceType { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
