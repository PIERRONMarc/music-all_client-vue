export interface Room {
    id: string,
    name: string
}

export type RoomPreview = Pick<Room, 'id' | 'name'>;