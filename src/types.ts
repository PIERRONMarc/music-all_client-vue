export interface Room {
    id: string,
    name: string,
    currentSong: Song | null,
    guests: Guest[],
    host: Guest,
    songs: Song[]
}

export interface Song {

}

export enum GuestRoles {
    Guest = 'GUEST',
    Admin = 'ADMIN',
}

export interface Guest {
    id: string,
    name: string,
    role: GuestRoles,
    token: string,
}

export type RoomPreview = Pick<Room, 'id' | 'name'>;

export interface JoinRoomResponse {
    room: Room,
    guest: Guest,
}
