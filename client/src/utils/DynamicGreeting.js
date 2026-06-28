import React from 'react';

export const DynamicGreeting = () => {
  const currentHour = new Date().getHours();
  let timeOfDay;

  if (currentHour < 12) {
    timeOfDay = "Morning";
  } else if (currentHour < 18) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Evening";
  }
  
  return `Good ${timeOfDay}`
};

