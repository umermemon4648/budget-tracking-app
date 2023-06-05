function convertDate(dateValue){
     // formatting date
  // Create a new Date object from the input date string.
  const d = new Date(dateValue);
  // Get the month, day, and year from the Date object.
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = d.getMonth() + 1;
  const monthString = monthNames[month];
  const day = d.getDate();
  const year = d.getFullYear();
  // Format the date into the desired output format.
  const formattedDate = `${monthString} ${day}, ${year}`;

  return formattedDate
}