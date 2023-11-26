import HttpClient from "./HttpClient";
import type {CreateRoomResponse, JoinRoomResponse, RoomPreview} from "@/types";

class RoomService
{
    static async getAll(page = 1): Promise<RoomPreview[]>
    {
        const response = await HttpClient.get('/room', {page: page});

        return response.data;
    }

    static async join(roomId: string): Promise<JoinRoomResponse>
    {
        const response = await HttpClient.get(`/join/${roomId}`);

        return response.data;
    }

    static async create(): Promise<CreateRoomResponse>
    {
        const response = await HttpClient.post('/room');

        return response.data;
    }

    static async addSong(url: string, roomId: string, token: string): Promise<void>
    {
        await HttpClient.post(
            `/room/${roomId}/song`,
            {url},
            undefined,
            {'Authorization': `Bearer ${token}`}
        );
    }

    static async nextSong(roomId: string, token: string): Promise<void>
    {
        await HttpClient.get(
            `/room/${roomId}/next-song`,
            undefined,
            {'Authorization': `Bearer ${token}`}
        );
    }
}

export default RoomService