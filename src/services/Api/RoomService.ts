import HttpClient from "./HttpClient";
import type {JoinRoomResponse, RoomPreview} from "@/types";

class RoomService
{
    static async getAll(page = 1): Promise<RoomPreview[]>
    {
        const response = await HttpClient.get('/room', {page: page});

        return response.data;
    }

    static async join(roomId: string): Promise<JoinRoomResponse>
    {
        const response = await HttpClient.get('/join/'+roomId);

        return response.data;
    }
}

export default RoomService