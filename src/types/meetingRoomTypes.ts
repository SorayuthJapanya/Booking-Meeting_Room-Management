export interface IMeetingRoomType {
  room_id: string;
  image_url: string;
  roomName: string;
  description: string;
  capacity: number | string;
  location: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IAddMeetingRoomType {
  image_url: string;
  roomName: string;
  description: string;
  capacity: number | string;
  location: string;
}

export interface IEditMeetingRoomType {
  image_url?: string;
  roomName?: string;
  description?: string;
  capacity?: number | string;
  location?: string;
  status?: string;
}
