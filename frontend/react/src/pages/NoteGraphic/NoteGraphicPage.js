// import './NoteGraphicPage.css';
import React from 'react';

import StageScene from './components/StageScene';


const NoteGraphicPage = () => {
    return (
        <StageScene style={{
            overflow: "hidden",
            boxSizing: "border-box",
            margin: "0"
        }}></StageScene>
    );

}

export default NoteGraphicPage;