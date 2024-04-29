import Client from "./Client";
import Music from "./Music";

class Room {
    // error_code
    // 0 : 정상
    // 1 : 방이 없음
    // 2 : 호스트가 나감

    // ongoing_code
    // 0 : 대기
    // 1 : musiclist -> room
    // 2 : room -> graphic
    constructor({ room_id, host_nickname, host_id, music_instance, guests, ongoing_code, error_code }) {
        this.room_id = room_id || '';
        this.host_nickname = host_nickname || '';
        this.host_id = host_id || '';
        this.music_instance = music_instance || new Music({});
        this.guests = guests || [];
        this.ongoing_code = ongoing_code || 0;

        this.error_code = error_code || 0;
    }

}

export default Room;
