import { Actions } from './midiSlice';
import axiosInstance from '../../../utils/axios';


export const fetchMidiList = () => {
    return (dispatch) => {
        axiosInstance
            .get('/midi/list')
            .then(response => {
                console.log('MIDI list fetched:', response.data);
                dispatch(Actions.setmidilist({ midilist: response.data }));
            })
            .catch(error => {
                console.error('Error fetching MIDI list:', error);
            });
    }
};

export const setLoading = (loading) => {
    return (dispatch) => {
        dispatch(Actions.setLoading({ loading: loading }));
    }
}

export const setMidi = (midi) => {
    return (dispatch) => {
        dispatch(Actions.setmidi({ midi: midi }));
    }
}