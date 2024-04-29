const NoteDisplay = ({ note }) => {
    const string_note = {
        0: '도',
        1: '도#',
        2: '레',
        3: '레#',
        4: '미',
        5: '파',
        6: '파#',
        7: '솔',
        8: '솔#',
        9: '라',
        10: '라#',
        11: '시',
    }

    return <div style={{ whiteSpace: "nowrap" }}>
        {note.map((n, i) => {
            let string = '';
            string = string_note[Math.floor(i % 12)];

            return <><span style={{
                backgroundColor: n ? 'red' : 'white',
            }}>{string}</span>&nbsp;&nbsp;
                {i % 24 === 23 && <br />}
            </>
        })}
    </div >
}

export default NoteDisplay;