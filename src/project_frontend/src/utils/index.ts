export const daysLeft = (deadline: any) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays.toFixed(0);
  };
  
  export const calculateBarPercentage = (goal: any, raisedAmount: any) => {
    const collectedAmount = Number(raisedAmount);
    const percentage = Math.round((collectedAmount * 100) / goal);
  
    console.log(percentage);
    return percentage;
  };
  
  export const checkIfImage = (url: any, callback: any) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };