// NotificationService.js
import * as Notifications from 'expo-notifications';

// Set up a notification channel (required for Android)
Notifications.setNotificationChannelAsync('default', {
  name: 'default',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: '#FF231F7C',
});

const NotificationService = {
  showNotification: async (message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification",
        body: message,
        sound: 'default',
      },
      trigger: null,
    });
  },
};

export default NotificationService;
