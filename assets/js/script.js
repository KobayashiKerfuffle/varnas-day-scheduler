$(function () {
  // Step 1: Display the current date
  const currentDate = dayjs().format('MMMM D, YYYY');
  $("#currentDay").text(currentDate);

  // Step 2: Add time-block classes
  $(".time-block").each(function() {
    const blockHour = parseInt($(this).attr("id").split("-")[1]);
    const currentHour = dayjs().hour();

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

  // Step 3: Store and Retrieve events from localStorage
  $(".saveBtn").on("click", function() {
    const timeBlock = $(this).parent().attr("id");
    const eventDescription = $(this).siblings(".description").val();
    localStorage.setItem(timeBlock, eventDescription);
    $("#notification").text("Appointment Added to localStorage").show().delay(3000).fadeOut();
  });

  $(".time-block").each(function() {
    const timeBlock = $(this).attr("id");
    const savedEvent = localStorage.getItem(timeBlock);
    
    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
    }
  });
});
