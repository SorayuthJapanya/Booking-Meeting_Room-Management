/**
 * Test to call CRUD booking function
 */

function testCreateBooking() {
  const createBookingData = {
    roomId: "76200127-b34b-4b72-bb71-9834e24d5339", 
    booker: "test@company.com",
    title: "test",
    description:
      "test",
    startTime: "2025-10-31T09:30:00",
    endTime: "2025-10-31T12:00:00",
  };
  const response = createBooking(createBookingData);
  console.log(response);
}

function testGetAllBooking() {
  const bookingData = getAllBookings();
  console.log(bookingData);
}

function testGetBooking() {
  const bookingData = getBooking("740a15c4-7169-4793-ab44-14480780f983");
  console.log(bookingData);
}

function testUpdateBooking() {
  const response = updateBooking("740a15c4-7169-4793-ab44-14480780f983", BOOKING_STATUS[1]);
  console.log(response);
}

function testDeleteBooking() {
  const response = deleteBooking("740a15c4-7169-4793-ab44-14480780f983");
  console.log(response);
}
