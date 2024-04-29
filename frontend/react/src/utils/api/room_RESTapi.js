import axiosInstance from "../axios"

export const getIsLike = async (filename, user_id) => {
    const response = await axiosInstance.get(`/midi/like/${filename}/${user_id}`)

    if (response.status === 200) {
        return response.data.is_like;
    }
    return false;
}

export const postLike = async (filename, user_id) => {
    const response = await axiosInstance.post(`/midi/like/${filename}/${user_id}`)
    if (response.status === 200) {
        return response.data.is_like;
    }
    return false;
}