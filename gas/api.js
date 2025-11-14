/**
 * Main entry for Get requests
 */

function doGet(e) {
  const type = e.parameter.type;
  const action = e.parameter.action;

  try {
    // --- MEETING ROOM ROUTES ---
    if (type === "meeting") {
      if (action === "getAllMeetingRoom") {
        const allMeetingRoomData = getAllMeetingRooms();
        return sendJSON_({ status: 200, allMeetingRoomData });
      }

      if (action === "getMeetingRoom") {
        const room_id = e.parameter.id;
        if (!room_id)
          return sendJSON_({ status: 400, message: "Missing room_id" });

        const meetingRoomData = getMeetingRoomByRoomId(room_id);
        return sendJSON_({ status: 200, meetingRoomData });
      }

      return sendJSON_({ status: 400, message: "Invalid meeting action" });
    }

    // --- BOOKING ROUTES ---
    if (type === "booking") {
      if (action === "getAllBookings") {
        const allBookingsData = getAllBookings();
        return sendJSON_({ status: 200, allBookingsData });
      }

      if (action === "getBooking") {
        const booking_id = e.parameter.id;
        if (!booking_id)
          return sendJSON_({ status: 400, message: "Missing booking_id" });
        const bookingData = getBooking(booking_id);
        return sendJSON_({ status: 200, bookingData });
      }

      return sendJSON_({ status: 400, message: "Invalid booking action" });
    }

    return sendJSON_({ status: 400, message: "No action provided" });
  } catch (error) {
    return sendJSON_({ status: 500, message: "Server error" });
  }
}

/**
 * Main entry for POST/PUT/DELETE requests
 */
function doPost(e) {
  try {
    const body = e.postData ? JSON.parse(e.postData.contents) : {};
    const method = body._method || "POST"; // Default POST method
    const type = body.type;

    if (type === "meeting") {
      if (method === "POST") {
        const data = body.createData;
        const response = createMeetingRoom(data);
        return sendJSON_({ status: 201, response });
      }

      if (method === "PUT") {
        const room_id = body.id;
        const data = body.updateData;
        const response = updateMeetingRoom(room_id, data);
        return sendJSON_({ status: 200, response });
      }

      if (method === "DELETE") {
        const room_id = body.id;
        const response = deleteMeetingRoom(room_id);
        return sendJSON_({ status: 200, response });
      }
    }

    if (type === "booking") {
      if (method === "POST") {
        const data = body.bookingData;
        const response = createBooking(data);
        return sendJSON_({ status: 201, response });
      }

      if (method === "PUT") {
        const booking_id = body.id;
        const status = body.status;
        const response = updateBooking(booking_id, status);
        return sendJSON_({ status: 200, response });
      }

      if (method === "DELETE") {
        const booking_id = body.id;
        const response = deleteBooking(booking_id);
        return sendJSON_({ status: 200, response });
      }
    }

    return sendJSON_({ status: 400, message: "Invalid type or method" });
  } catch (error) {
    return sendJSON_({ status: 500, message: "Server error" });
  }
}

// Helper: SendJson
function sendJSON_(jsonResponse) {
  return ContentService.createTextOutput(
    JSON.stringify(jsonResponse)
  ).setMimeType(ContentService.MimeType.JSON);
}
