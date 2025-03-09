
function music() {
    const bgm = document.getElementById('bgm');
    bgm.volume = 0.3;
    bgm.play();
}

window.onload = music();