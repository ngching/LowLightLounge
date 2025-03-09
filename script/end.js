function setupEnd() {
    // Retrieve values from localStorage
    const finalScore = localStorage.getItem("finalScore");
    const greenAppleMartini = localStorage.getItem("greenAppleMartini");
    const classicMargarita = localStorage.getItem("classicMargarita");
    const thaiBasilSangria = localStorage.getItem("thaiBasilSangria");

    const bgm = document.getElementById('bgm');

    // Set the innerHTML of the respective spans
    document.getElementById("finalscore").innerHTML = finalScore;
    document.getElementById("martini").innerHTML = greenAppleMartini;
    document.getElementById("margarita").innerHTML = classicMargarita;
    document.getElementById("thai").innerHTML = thaiBasilSangria;

    bgm.volume = 0.3;
    bgm.play();
}

// // Call this function when the page loads
window.onload = setupEnd();