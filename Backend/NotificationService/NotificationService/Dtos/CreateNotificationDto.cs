
namespace NotificationService.Dtos;
public class CreateNotificationDto
{
    public long UserId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;

    public long? ReferenceId { get; set; }

    public string? ReferenceType { get; set; }
}