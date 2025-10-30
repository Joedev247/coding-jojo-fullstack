export const getProgressColor = (progress: number): string => {
  if (progress >= 90) {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  } else if (progress >= 70) {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  } else if (progress >= 50) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  } else if (progress >= 25) {
    return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
  } else {
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  }
};

export const getProgressLabel = (progress: number): string => {
  if (progress >= 90) {
    return "Excellent";
  } else if (progress >= 70) {
    return "Good";
  } else if (progress >= 50) {
    return "Average";
  } else if (progress >= 25) {
    return "Needs Improvement";
  } else {
    return "Just Started";
  }
};
