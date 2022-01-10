const SONG_TIME_CURRENT = document.getElementById("current")
const SONG_TIME_DURATION = document.getElementById("duration")
const SONG_PLAY_PAUSE = document.getElementById("play-pause")

// Calculate time
function TimeCalculator(value) {
    let second = Math.floor(value % 60)
    let minute = Math.floor((value / 60) % 60)

    if (second < 10) {
        second = "0" + second
    }

    return `${minute} : ${second}`
}

// Star wavesurfer object
let wavesurfer = WaveSurfer.create({
    container: "#wave",
    waveColor: "#cdedff",
    progressColor: "#1aafff",
    height: 20,
    scrollParent: false,
    hideScrollbar: true,
    barWidth: 2,
})

wavesurfer.load("https://res.cloudinary.com/kiulcode/video/upload/v1637596120/SpotMixes/AudioData/Tokyo_Machine_-_SLASH_NCS_Release_j1yerb.mp3")

// PLAY AND PAUSE
SONG_PLAY_PAUSE.addEventListener('click', () => {
    wavesurfer.playPause()
})

wavesurfer.on('play', (e) => {
    SONG_PLAY_PAUSE.classList.remove("ri-play-fill")
    SONG_PLAY_PAUSE.classList.add("ri-pause-fill")
})

wavesurfer.on('pause', (e) => {
    SONG_PLAY_PAUSE.classList.add("ri-play-fill")
    SONG_PLAY_PAUSE.classList.remove("ri-pause-fill")
})

// Load audio duration
wavesurfer.on("ready", (e) => {
    SONG_TIME_DURATION.textContent = TimeCalculator(wavesurfer.getDuration())
})

// GET UPDATED CURRENT TIME ON PLAY
wavesurfer.on("audioprocess", (e) => {
    SONG_TIME_CURRENT.textContent = TimeCalculator(wavesurfer.getCurrentTime())
})

wavesurfer.on("seek", (e) => {
    SONG_TIME_CURRENT.textContent = TimeCalculator(wavesurfer.getCurrentTime())
})