// utils.js

export const formatTime = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp.seconds * 1000);
    const adjustedDate = adjustToGMT4(date);
    return adjustedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  export const adjustToGMT4 = (date) => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const offset = -4; // GMT-4
    return new Date(utcDate.getTime() + offset * 3600000);
  };
  
  export const formatTimestamp = (timestamp) => {
    if (!timestamp) return timestamp;
  
    // Regular expression to match the "YYYY-MM-DD" date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
    // If the timestamp is already in "YYYY-MM-DD" format, return it as is
    if (typeof timestamp === 'string' && dateRegex.test(timestamp)) {
      return timestamp;
    }
  
    // Otherwise, assume it's a Firestore timestamp and convert it
    try {
      const date = new Date(timestamp.seconds * 1000);
      const offset = -4; // GMT-4 offset
      const adjustedDate = new Date(date.getTime() + offset * 3600000);
      return adjustedDate.toISOString().split('T')[0];
    } catch (error) {
      console.error("Invalid timestamp:", error);
      return null; // Return null or handle the error as needed
    }
  };
  
  