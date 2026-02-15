// Notification helper for real browser/device notifications
// Uses the Web Notifications API (works on desktop and Android)

const LC_NOTIFICATION_KEY = 'lc_notifications_enabled';

/**
 * Request notification permission from the user
 */
export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return false;
    }

    if (Notification.permission === 'granted') {
        localStorage.setItem(LC_NOTIFICATION_KEY, 'true');
        return true;
    }

    if (Notification.permission === 'denied') {
        return false;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        localStorage.setItem(LC_NOTIFICATION_KEY, 'true');
        return true;
    }
    return false;
};

/**
 * Send a real device notification
 * @param {string} title - Notification title
 * @param {object} options - { body, icon, tag, data }
 */
export const sendNotification = (title, options = {}) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        return null;
    }

    const notification = new Notification(title, {
        icon: '/lc-logo-icon.png',
        badge: '/lc-logo-icon.png',
        vibrate: [200, 100, 200],
        ...options,
    });

    notification.onclick = () => {
        window.focus();
        notification.close();
    };

    return notification;
};

/**
 * Notify on Pro Plan upgrade
 */
export const notifyProUpgrade = () => {
    sendNotification('🎉 Pro Plan Activated!', {
        body: 'You now have unlimited AI mentoring and interview practice.',
        tag: 'pro-upgrade',
    });
};

/**
 * Notify roadmap progress milestone
 */
export const notifyRoadmapProgress = (topicName, percentage) => {
    sendNotification('📊 Roadmap Progress', {
        body: `${topicName} — ${percentage}% complete. Keep going!`,
        tag: 'roadmap-progress',
    });
};

/**
 * Notify interview session complete
 */
export const notifyInterviewComplete = (score) => {
    sendNotification('🎤 Interview Complete', {
        body: `Overall score: ${score}%. Review your feedback now.`,
        tag: 'interview-complete',
    });
};

/**
 * Check if notifications are enabled
 */
export const areNotificationsEnabled = () => {
    return 'Notification' in window && Notification.permission === 'granted';
};
