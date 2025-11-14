// Set variable
const BOOKINGS_SHEET_NAME = "MeetingBookings";
const BOOKING_STATUS = ["PENDING", "COMFIRMED", "CANCELLED"];

/**
 * Design CRUD endpoint for meeting room
 * C: Create booking
 * R: Read booking
 *  - Read all booking
 *  - Read one booking
 * U: Update booking
 * D: Delete booking
 */

// POST: Crate booking
function createBooking(bookingData) {
  try {
    // Check required data
    if (
      !bookingData.roomId ||
      !bookingData.booker ||
      !bookingData.title ||
      !bookingData.description ||
      !bookingData.startTime ||
      !bookingData.endTime
    )
      return { success: false, message: "All field are required." };

    // Check meeting room available
    const rowNumber = getRowByColumnValue(
      MEETINGROOMS_SHEET_NAME,
      bookingData.roomId,
      "room_id"
    );
    if (rowNumber === null)
      return { success: false, message: "Meeting room not found." };

    const meetingRoomTable = getMeetingRoomsTable();
    const meetingRoom = meetingRoomTable
      .getRange(rowNumber, 1, 1, meetingRoomTable.getLastColumn())
      .getValues()[0];
    if (meetingRoom[5] !== MEETINGROOM_STATUS[0])
      return { success: false, message: "Meeting room is not available." };

    // Append Data to Booking sheet
    const bookingTable = getBookingsTable();
    const now = new Date().toLocaleString();

    // [room_id, booker, title, description, start_time, end_time, status, created_at, updated_at]
    const newBooking = [
      Utilities.getUuid(),
      bookingData.roomId,
      bookingData.booker,
      bookingData.title,
      bookingData.description,
      bookingData.startTime,
      bookingData.endTime,
      BOOKING_STATUS[0],
      now,
      now,
    ];
    bookingTable.appendRow(newBooking);
    return { success: true, message: "Booking created successfully." };
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Failed to create booking." };
  }
}

// GET: Get all booking
function getAllBookings() {
  try {
    const bookingTable = getBookingsTable();
    const bookingTableValues = bookingTable.getDataRange().getValues();

    // Delete first row (headers)
    const bookingDataRow = bookingTableValues.slice(1);
    const bookingData = formatDataToJson(BOOKINGS_SHEET_NAME, bookingDataRow);
    return { success: true, data: bookingData };
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Failed to get all booking." };
  }
}

// GET: Get one booking
function getBooking(bookingId) {
  try {
    if (!bookingId) return { success: false, message: "Failed to get booing." };

    const bookingTable = getBookingsTable();
    const rowNumber = getRowByColumnValue(
      BOOKINGS_SHEET_NAME,
      bookingId,
      "booking_id"
    );
    if (rowNumber === null)
      return { success: false, message: "Booking not found." };

    const bookingDataRow = bookingTable
      .getRange(rowNumber, 1, 1, bookingTable.getLastColumn())
      .getValues();
    const bookingData = formatDataToJson(BOOKINGS_SHEET_NAME, bookingDataRow);
    return { success: true, data: bookingData[0] };
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Failed to get booking," };
  }
}

// PUT: Update booking only status
function updateBooking(bookingId, status) {
  try {
    if (!bookingId || !status)
      return { success: false, message: "Failed to update booking." };

    // check status
    if (status && !BOOKING_STATUS.includes(status))
      return {
        success: false,
        message: `Invalid meeting room status: ${status}.`,
      };

    // get current data
    const rowNumber = getRowByColumnValue(
      BOOKINGS_SHEET_NAME,
      bookingId,
      "booking_id"
    );
    if (rowNumber === null)
      return { success: false, message: "Booking not found." };

    const bookingTable = getBookingsTable();
    const bookingRange = bookingTable.getRange(
      rowNumber,
      1,
      1,
      bookingTable.getLastColumn()
    );
    const bookingValues = bookingRange.getValues()[0];

    let isModified = false;

    // Index: 7 (status)
    if (status && status !== "" && bookingValues[7] !== status) {
      bookingValues[7] = status;
      isModified = true;
    }

    if (isModified) {
      bookingValues[9] = new Date().toLocaleString();
      bookingRange.setValues([bookingValues]);
      return { success: true, message: "Booking updated successfully." };
    } else {
      return { success: true, message: "No changes were made to the booking." };
    }
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Failed to update booking." };
  }
}

// DELETE: Delete booking
function deleteBooking(bookingId) {
  try {
    if (!bookingId)
      return { success: false, message: "Failed to delete booking." };

    const rowNumber = getRowByColumnValue(
      BOOKINGS_SHEET_NAME,
      bookingId,
      "booking_id"
    );
    const bookingTable = getBookingsTable();
    bookingTable.deleteRow(rowNumber);

    return {success: true, message: "Booking deleted successfully."}
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Failed to delete booking." };
  }
}
