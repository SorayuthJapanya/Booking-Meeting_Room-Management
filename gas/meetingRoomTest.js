/**
 * Test to call CRUD meeting room function
 */

function testCreateMeetingRoom() {
  const data = {
    roomName: "Room E - Training Hall",
    description: "Spacious room equipped with projector, sound system, and whiteboard — suitable for workshops.",
    capacity: 20,
    location: "Building 2, Ground Floor"
  };
  const res = createMeetingRoom(data);
  console.log("res:", JSON.stringify(res));
}

function testGetAllMeetingRooms() {
  const data = getAllMeetingRooms();
  console.log("Rooms: ", JSON.stringify(data));
}

function testGetMeetingRoom() {
  const data = getMeetingRoomByRoomId('f20736bd-f443-4a03-99a7-d5bfa3134274');
  console.log("Room: ", JSON.stringify(data));
}

function testUpdateMeetingRoom() {
  const data = {
    roomName: "Room A - Innovation Hub",
    description: "A bright meeting space with a large whiteboard and projector. Ideal for brainstorming sessions.",
    capacity: 10,
    location: "Building 1, 3rd Floor",
    status: MEETINGROOM_STATUS[1],
  };
  const res = updateMeetingRoom('f20736bd-f443-4a03-99a7-d5bfa3134274', data);
  console.log("Response: ", JSON.stringify(res));
}

function testDeleteMeetingRoom() {
  const res = deleteMeetingRoom("f20736bd-f443-4a03-99a7-d5bfa3134274");
  console.log("response: ", JSON.stringify(res));
}
