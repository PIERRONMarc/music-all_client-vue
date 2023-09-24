function createEventSource(topic: string): EventSource
{
    const url: URL = new URL(import.meta.env.VITE_SSE_BASE_URL);
    url.searchParams.append('topic', topic);

    return new EventSource(url);
}

export function createRoomEventSource(roomId: string): EventSource
{
    return createEventSource(`/room/${roomId}`);
}