namespace NotificationService.Dtos
{
    public class NotificationResponseDto
    {
        public long Id { get; set; }

        public long UserId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

        public bool IsRead { get; set; }

        public long? ReferenceId { get; set; }

        public string? ReferenceType { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
