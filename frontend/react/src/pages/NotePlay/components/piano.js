import Phaser from "phaser";
import { useEffect, useRef } from "react";
import { Keyboard } from "../../NoteGraphic/components/keyboard";

const Piano = () => {
    const game = useRef(null);
    let notes;


    // 씬을 만들기 전에 실행
    function preload() {
    }

    // 씬을 생성하기 위해 실행
    function create() {
        let { width, height } = this.sys.game.canvas

        notes = new Keyboard(this, width, height);
        notes.setInput(document);
    }

    // 씬을 갱신하기 위해 실행
    function update() {
    }

    useEffect(() => {
        const phaserConfig = {
            type: Phaser.AUTO,
            // 배경을 투명하게 설정(디폴트 검정색)
            transparent: false,
            // 씬을 관리하는 메소드.
            scene: {
                preload,
                create,
                update,
            },
            scale: {
                // 게임 div의 id
                parent: "gamediv",
                // 높이를 꽉 채우고, 비율에 맞게 가로를 조정한다.
                // css로 치면 height 100% width auto 의 기능을 한다.
                // WIDTH_CONTROLS_HEIGHT 도 가능하다.
                mode: Phaser.Scale.RESIZE,
                // 게임이 아래의 해상도로 렌더링된다.
                // 모든 좌표, 크기 설정은 이 크기를 기본으로 계산된다.
                // width: 600,
                // height: 300,
            },
        };
        // game 레퍼런스에 phaserConfig 로 씬을 생성
        // 씬은 game 레퍼런스에 HTMLcanvas를 그리는 식으로 생성된다.
        game.current = new Phaser.Game(phaserConfig);
        // 주의!! 단 한 번만 실행될 수 있도록 신경써야 한다. 
        // 두 번 실행되면 가차없이 두 개의 게임 화면이 생긴다.
        // 여기서는 useEffect 의 dependency array에 []를 넣어서 한 번만 실행되도록 했다.
    }, []);

    return (
        // 화면이 출력될 element
        <div ref={game} />
    )
}

export default Piano;