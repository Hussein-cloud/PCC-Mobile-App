// src/components/HomeContainer/utils/filterAndSortTasks.js
const filterAndSortTasks = (tasks) => {
    const today = new Date().setHours(0, 0, 0, 0);
  
    const futureTasks = tasks.filter(task => {
      const taskDate = new Date(task.date.seconds * 1000).setHours(0, 0, 0, 0);
      return taskDate >= today;
    });
  
    return futureTasks.sort((a, b) => {
      const dateA = new Date(a.date.seconds * 1000).setHours(0, 0, 0, 0);
      const dateB = new Date(b.date.seconds * 1000).setHours(0, 0, 0, 0);
  
      if (dateA === today && dateB !== today) return -1;
      if (dateA !== today && dateB === today) return 1;
  
      return dateA - dateB;
    });
  };
  
  export default filterAndSortTasks;
  