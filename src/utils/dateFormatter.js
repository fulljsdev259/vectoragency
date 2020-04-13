function dateFormatter(incomingDate, action) {
    let date = {}, newDate = new Date(incomingDate ? incomingDate : new Date()), day = new Date();
    if(action === 'next') newDate.setDate(newDate.getDate() + 1);
    if(action === 'pre') newDate.setDate(newDate.getDate() - 1);
    date.meetingDate = `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })} ${newDate.getFullYear()}`;
    date.apiDate = newDate.toLocaleDateString();
    date.today = ( newDate.setHours(0,0,0,0) > day.setHours(0,0,0,0) || newDate.setHours(0,0,0,0) == day.setHours(0,0,0,0)) ?  true : false;
    return date;
  }

  export default dateFormatter;