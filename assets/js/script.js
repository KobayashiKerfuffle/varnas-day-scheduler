// Run the enclosed code when the page is fully loaded
$(function () {

  // Function to determine the ordinal of a number (e.g., 1st, 2nd, 3rd, 4th)
  function getOrdinal(n) {
    // Numbers between 4 and 20 get a 'th' suffix
    if (n > 3 && n < 21) return 'th';
    // Depending on the last digit of the number, determine the correct suffix
    switch (n % 10) {
      case 1:  return 'st';
      case 2:  return 'nd';
      case 3:  return 'rd';
      default: return 'th';
    }
  }

  // Get the current day of the month and format it in a friendly format (e.g., "Monday, January 1st")
  const day = dayjs().date();
  const currentDate = dayjs().format('dddd, MMMM D') + getOrdinal(day);
  // Display the formatted date on the element with id "currentDay"
  $("#currentDay").text(currentDate);

  // For each time block on the page
  $(".time-block").each(function() {
    // Get the hour of the current time block (e.g., "9" from "hour-9")
    const blockHour = parseInt($(this).attr("id").split("-")[1]);
    // Get the current hour
    const currentHour = dayjs().hour();

    // Add appropriate classes based on whether the time block is in the past, present, or future
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).addClass("future");
    }
  });

  // When the save button is clicked
  $(".saveBtn").on("click", function() {
    // Get the id of the parent time block and the entered event description
    const timeBlock = $(this).parent().attr("id");
    const eventDescription = $(this).siblings(".description").val();
    // Save the event description to local storage
    localStorage.setItem(timeBlock, eventDescription);
    // Display a notification and hide it after 3 seconds
    $("#notification").show().delay(3000).fadeOut();

  });

  // For each time block on the page
  $(".time-block").each(function() {
    // Get the id of the time block
    const timeBlock = $(this).attr("id");
    // Retrieve any saved event for this time block from local storage
    const savedEvent = localStorage.getItem(timeBlock);

    // If there's a saved event, display it in the corresponding text area
    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
    }
  });
});
