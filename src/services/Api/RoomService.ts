import HttpClient from "./HttpClient";
import type {RoomPreview} from "@/types";

class RoomService
{
    static async getAll(page = 1): Promise<RoomPreview[]>
    {
        const response = await HttpClient.get('/room', {page: page});

        return response.data;
    }
}

export default RoomService