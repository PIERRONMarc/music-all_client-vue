export interface Room {
    id: string,
    name: string,
    currentSong: Song | null,
    guests: GuestPreview[],
    host: Guest,
    songs: Song[]
}

export interface Song {
    url: string,
    isPause: boolean,
    title: string,
    author: string,
    lengthInSeconds: number
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

export type GuestPreview = Pick<Guest, 'name' | 'role'>;

export type RoomPreview = Pick<Room, 'id' | 'name'>;

export interface JoinRoomResponse {
    room: Room,
    guest: Guest,
}

export interface CreateRoomResponse extends Room {
    host: Guest,
}

export enum MessageActions {
    GuestJoin = 'guestJoin',
    GuestLeave = 'guestLeave',
    AddSong = 'addSong',
    UpdateCurrentSong = 'updateCurrentSong',
    NextSong = 'nextSong',
}

type MessageEventData<T extends MessageActions, K extends object> = {
    action: T,
    payload: K
}

export type GuestJoinMessage = MessageEventData<MessageActions.GuestJoin, {
    name: string,
    role: GuestRoles.Guest
}>

export type GuestLeaveMessage = MessageEventData<MessageActions.GuestLeave, {
    name: string,
}>

export type AddSongMessage = MessageEventData<MessageActions.AddSong, {
    id: string;
    url: string;
    title: string;
    author: string;
    lengthInSeconds: string;
}>

export type UpdateCurrentSongMessage = MessageEventData<MessageActions.UpdateCurrentSong, {
    url: string,
    isPaused: boolean,
}>