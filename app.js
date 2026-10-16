let player

function onYouTubeIframeAPIReady() {
    console.log("เชื่อมต่อแล้ว");
    initPlayer();
    player = new YT.Player('youtubePlayer',{
        events: {
            'onReady': onPlayerReady ,
            'onStateChange': onPlayerStateChange
        }
    });
}

function initPlayer() {
    if (player) return;
    player = new YT.Player('youtubePlayer',{
        events: {
            'onReady': onPlayerReady ,
            'onStateChange': onPlayerStateChange
        }
    });
}

window.onload = function(){
    if (typeof YT !== 'undefined' && YT.Player && !player) {
        initPlayer();
    }
};

function onPlayerReady(event) {
    console.log("พร้อมแล้ว");
    updateSongTitle();
}

function onPlayerStateChange(event) {
    console.log("สถานะตอนนี้",event);

    const vinylElement = document.getElementById('inbox1');
    const titleElement = document.getElementById('songTitle');

    if (player && typeof player.getVideoData === 'function') {
        const videoData = player.getVideoData();
        if (videoData && videoData.title && event.data == 1) {
            vinylElement.classList.add('rotating');
            updateSongTitle();
        } else {
            vinylElement.classList.remove('rotating');
        }
    }
}

function updateSongTitle() {
    const titleElement = document.getElementById('songTitle');
    if (player && typeof player.getVideoData === 'function') {
        const videoData = player.getVideoData();
        if (videoData && videoData.title){
            titleElement.textContent = videoData.title;
            console.log("เพลงกำลังโหลด", videoData.title);
        } else {
            console.log("เจอเพลงแล้ว แต่ไม่เจอชื่อ");
        }
    } else {
        console.log("การทำงานยังไม่เริ่ม วิดิโอโหลดไม่เสร็จ")
    }
}










