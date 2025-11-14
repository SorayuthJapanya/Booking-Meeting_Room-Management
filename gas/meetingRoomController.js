// Set Variable
const MEETINGROOMS_SHEET_NAME = "MeetingRooms";
const MEETINGROOM_STATUS = ["AVAILABLE", "BOOKED", "IN_USE", "UNAVAILABLE"];

/**
 * Design CRUD endpoint for meeting room
 * C: Create meeting room
 * R: Read meeting room
 *  - Read all meeting room
 *  - Read one meeting room
 * U: Update meeting room
 * D: Delete meeting room
 */

// POST: Create meeting room
function createMeetingRoom(meetingRoomData) {
  // [{room_id, room_name, capacity, location, status, created_at, updated_at}]
  try {
    const meetingRoomTable = getMeetingRoomsTable();
    const now = new Date().toLocaleString();

    const newMeetingRoom = [
      Utilities.getUuid(),
      meetingRoomData.image_url,
      meetingRoomData.roomName,
      meetingRoomData.description,
      meetingRoomData.capacity,
      meetingRoomData.location,
      MEETINGROOM_STATUS[0],
      now,
      now,
    ];
    meetingRoomTable.appendRow(newMeetingRoom);
    return { success: true, message: "Meeting room created successfully!!" };
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Meeting room created fail!!" };
  }
}

// GET: Get all meeting rooms
function getAllMeetingRooms() {
  try {
    const meetingRoomTable = getMeetingRoomsTable();
    const values = meetingRoomTable.getDataRange().getValues();

    // Delete headres row
    const meetingRoomRows = values.slice(1);
    const meetingRoomData = formatDataToJson(
      MEETINGROOMS_SHEET_NAME,
      meetingRoomRows
    );
    return { success: true, data: meetingRoomData };
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Failed to get all meeting room" };
  }
}

// GET: get meeting room by room id
function getMeetingRoomByRoomId(roomId) {
  try {
    if (!roomId)
      return { success: false, message: "Meeting room not found!!" };
    
    const meetingRoomTable = getMeetingRoomsTable();
    const rowNumber = getRowByColumnValue(
      MEETINGROOMS_SHEET_NAME,
      roomId,
      "room_id"
    );

    if (rowNumber === null)
      return { success: false, message: "Meeting room not found!!" };

    const meetingRoomRow = meetingRoomTable
      .getRange(rowNumber, 1, 1, meetingRoomTable.getLastColumn())
      .getValues();
    const meetingRoom = formatDataToJson(
      MEETINGROOMS_SHEET_NAME,
      meetingRoomRow
    );
    return { success: true, data: meetingRoom };
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Failed to get meeting room" };
  }
}

// PUT: Update meeting room
function updateMeetingRoom(roomId, meetingRoomData) {
  try {
    // Check meeting room data
    if (meetingRoomData === null || meetingRoomData === undefined)
      return { success: false, message: "All field are required!!" };

    // Check status
    if (
      meetingRoomData.status &&
      !MEETINGROOM_STATUS.includes(meetingRoomData.status)
    )
      return {
        success: false,
        message: `Invalid meeting room status: ${meetingRoomData.status}`,
      };

    // get current data form sheet
    const rowNumber = getRowByColumnValue(
      MEETINGROOMS_SHEET_NAME,
      roomId,
      "room_id"
    );
    if (rowNumber === null)
      return { success: false, message: "Meeting room not found!!" };

    const meetingRoomTable = getMeetingRoomsTable();
    const rowRange = meetingRoomTable.getRange(
      rowNumber,
      1,
      1,
      meetingRoomTable.getLastColumn()
    );
    const rowValues = rowRange.getValues()[0];

    let isModified = false;

    // Index 1: image_url
    if (
      meetingRoomData.image_url &&
      meetingRoomData.image_url !== "" &&
      rowValues[1] !== meetingRoomData.image_url
    ) {
      rowValues[1] = meetingRoomData.image_url
      isModified = true;
    }

    // Index 2: roomName
    if (
        meetingRoomData.roomName &&
        meetingRoomData.roomName !== "" &&
        rowValues[2] !== meetingRoomData.roomName
      ) {
        rowValues[2] = meetingRoomData.roomName;
        isModified = true;
      }

    // Index 3: description
    if (
      meetingRoomData.description &&
      meetingRoomData.description !== "" &&
      rowValues[3] !== meetingRoomData.description
    ) {
      rowValues[3] = meetingRoomData.description;
      isModified = true;
    }
    // Index 4: capacity
    if (
      meetingRoomData.capacity &&
      meetingRoomData.capacity !== "" &&
      rowValues[4] !== meetingRoomData.capacity
    ) {
      rowValues[4] = meetingRoomData.capacity;
      isModified = true;
    }
    // Index 5: location
    if (
      meetingRoomData.location &&
      meetingRoomData.location !== "" &&
      rowValues[5] !== meetingRoomData.location
    ) {
      rowValues[5] = meetingRoomData.location;
      isModified = true;
    }
    // Index 6: status
    if (
      meetingRoomData.status &&
      meetingRoomData.status !== "" &&
      rowValues[6] !== meetingRoomData.status
    ) {
      rowValues[6] = meetingRoomData.status;
      isModified = true;
    }

    if (isModified) {
      rowValues[8] = new Date().toLocaleString();
      rowRange.setValues([rowValues]);
      return { success: true, message: "Meeting room updated successfully!!" };
    } else {
      return { success: true, message: "No meeting room changes!!" };
    }
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Meeting room updated fail!!" };
  }
}

// DELETE: Deleted meeting room by Id
function deleteMeetingRoom(roomId) {
  try {
    const rowNumber = getRowByColumnValue(
      MEETINGROOMS_SHEET_NAME,
      roomId,
      "room_id"
    );
    if (!rowNumber)
      return { success: false, message: "Meeting room not found!!" };

    const meetingRoomTable = getMeetingRoomsTable();
    meetingRoomTable.deleteRow(rowNumber);
    return { success: true, message: "Meeting room delete successfully!!" };
  } catch (error) {
    Logger.log(error);
    return { success: false, message: "Meeting room deleted fail!!" };
  }
}
