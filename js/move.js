const move = {
    up: false,
    right: false,
    left: false,
    bottom: false,
}

function startMove(){
    window.addEventListener('keydown', (e) => {
        if(e.key === 'w' || e.key === 'ArrowUp'){
            move.up = true;
            move.right = false;
            move.left = false;
            move.bottom = false;
        }else if(e.key === 's' || e.key === 'ArrowDown'){
            move.up = false;
            move.right = false;
            move.left = false;
            move.bottom = true;
        }else if(e.key === 'a' || e.key === 'ArrowLeft'){
            move.up = false;
            move.right = false;
            move.left = true;
            move.bottom = false;
        }else if(e.key === 'd' || e.key === 'ArrowRight'){
            move.up = false;
            move.right = true;
            move.left = false;
            move.bottom = false;
        }
    })
    
}

export {startMove};
export default move;