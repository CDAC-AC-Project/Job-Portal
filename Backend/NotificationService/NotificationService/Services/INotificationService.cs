using NotificationService.Dtos;
using NotificationService.Entities;

namespace NotificationService.Services;

public interface INotificationService
{
    Task<NotificationResponseDto> CreateNotificationAsync(CreateNotificationDto dto);

    Task<IEnumerable<NotificationResponseDto>> GetUserNotificationsAsync(long userId);

    Task<int> GetUnreadCountAsync(long userId);

    Task<Notification?> MarkAsReadAsync(long id, long userId);
}