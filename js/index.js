
const targetDate = new Date('2024-07-01T07:00:00Z'),     // Anniversary US Time
    // const targetDate = new Date('2024-07-01T11:00:00Z'),     // Anniversary
    // const targetDate = new Date('2024-02-14T11:00:00Z'),     // Valentine's
    // const targetDate = new Date('2023-12-31T17:00:00Z'),        // New years
    // const targetDate = new Date('2024-06-22T21:40:00Z'),
    // const targetDate = new Date().setSeconds(new Date().getSeconds()),

    interval = setInterval(updateTimer, 100);
var firstFrame = true
var body = document.body,
    html = document.documentElement;

const container = document.querySelector('#fireworks-canvas')
const fireworks = new Fireworks.default(container)
const sleep = ms => new Promise(r => setTimeout(r, ms));


/* -------------------------------------------------------------------------- */
/*                             TRANSITION SECTION                             */
/* -------------------------------------------------------------------------- */

function transition() {
    $("#countdown-page").fadeOut("fast", function () {
        $("#main-page").fadeIn(5, function () {
            $('#main-page-canvas').fadeIn(2000)
            startIntro()
            initMainPageVariables()
        })
    })
    playCeilings()
    createBalloons(100)
}


async function playCeilings() {
    // await sleep(2000)

    console.log("Playing ceilings")
    audio = new Audio('./assets/ceilings_sax.mp3')
    audio.volume = 0.2
    audio.loop = true;
    audio.play()
}

/* -------------------------------------------------------------------------- */
/*                                TIMER SECTION                               */
/* -------------------------------------------------------------------------- */
function updateTimer() {
    const currentDate = new Date();

    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
        // Countdown has ended
        $('#clock h1').text('Please Click on the Logo');
        clearInterval(interval);
        $('#fumblers-loading').on('click', () => {
            transition();
            tsParticles.load({
                id: "#confetti-container",
                options: {
                    preset: "confetti",
                },
            });
        })
        return;
    }

    if (firstFrame) {
        $("#clock h1").hide()
        $("#clock h1").fadeIn("slow")
        firstFrame = false
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the displayed countdown components using jQuery
    clockText = String(days) + "D " + String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
    $('#clock h1').text(clockText);
}

/* -------------------------------------------------------------------------- */
/*                            MAINPAGE STAR SECTION                           */
/* -------------------------------------------------------------------------- */
const canvas = document.getElementById('main-page-canvas')
const starback = new Starback(canvas, {
    type: 'dot',
    quantity: 100,
    // speed: 0.2,
    direction: 30,
    backgroundColor: ['#0e1118', '#232b3e'],
    randomOpacity: true,
    starSize: 1,

})

/* -------------------------------------------------------------------------- */
/*                                 SKETCH FADE                                */
/* -------------------------------------------------------------------------- */

function sketchFade() {

    if ($(window).scrollTop() + window.innerHeight > $(document).height() - 10) {
        // $('#main-page-canvas').fadeIn(2000, () => {
        bellSketch.fadeIn("slow")
        endSection.fadeIn("slow")


        fireworks.start()
    }
    else {
        bellSketch.fadeOut("fast")
        endSection.fadeOut("fast")
        fireworks.stop()

    }
}

/* -------------------------------------------------------------------------- */
/*                                INTRO ACTIONS                               */
/* -------------------------------------------------------------------------- */
function delay(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function typeWrite(element, text) {
    for (i = 0; i < text.length; i++) {
        element.html(element.html() + text[i])
        await delay(100)
    }
}

async function typeDelete(element, length) {
    for (i = length; i > 0; i--) {
        element.html(element.html().substring(0, i - 1))
        await delay(30)
    }
}

async function standardMessage(element, text) {
    await typeWrite(element, text)
    await delay(1500)
    await typeDelete(element, text.length)
    await delay(500)
}

async function introType() {
    element = $("#intro-section h2")
    await standardMessage(element, "Hi Bell 😁")
    await standardMessage(element, "Happy Anniversary!")
    await standardMessage(element, "Sorry for being an idiot")
    await standardMessage(element, "Hope you enjoy!!!")
}

async function startIntro() {
    // await introType()
    await $("#main-page-container").fadeIn(3000)
    // await $("#main-page-container").fadeIn(5)
    addScrollEvent()
}

/* -------------------------------------------------------------------------- */
/*                               PATH DRAWING                                 */
/* -------------------------------------------------------------------------- */



function drawScrollPath() {
    const scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    const draw = length * scrollpercent;

    pathImg.style.strokeDashoffset = length - draw;
}


/* -------------------------------------------------------------------------- */
/*                           FRAME OBJECT SCROLLING                           */
/* -------------------------------------------------------------------------- */

function scrollFrameObjects() {
    let scrollTop = $(window).scrollTop();
    windowHeight = 200

    sectCw = $("#section-cw")
    sectCwTop = sectCw.offset().top;
    if (scrollTop > sectCwTop || true) {
        topPercent = - (((scrollTop - sectCwTop) / windowHeight)) * 100
        $("#sec-cw-floor").css('top', topPercent / 45 + 12 + '%')
        $("#sec-cw-us").css('top', topPercent / 45 + 14 + '%')
        $("#sec-cw-us").css('left', topPercent / 16 + 14 + '%')

    }

    sectRideon = $("#section-rideon")
    sectRideonTop = sectRideon.offset().top;
    if (scrollTop > sectRideonTop || true) {
        topPercent = (((scrollTop - sectRideonTop) / windowHeight))
        $("#sec-rideon-background").css('filter', 'blur(' + (topPercent + 0.5) * 0.4 + 'rem)')

    }
}


/* -------------------------------------------------------------------------- */
/*                               INIT FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

var windowHeightCustom, height, bellSketch, endSection, pathImg, pathImgLength, scrollY


function initMainPageVariables() {


    /* -------------------------- Bell Sketch Variables ------------------------- */
    bellSketch = $("#bell-sketch")
    endSection = $("#end-section-caption")


    /* ----------------------------- Path variables ----------------------------- */
    // pathImg = document.getElementById("pathImg");
    // pathImgLength = pathImg.getTotalLength();
    // pathImg.style.strokeDasharray = pathImgLength;
    // pathImg.style.strokeDashoffset = pathImgLength;
}

function addScrollEvent() {
    window.addEventListener('scroll', () => {
        sketchFade()
        // drawScrollPath()
        scrollFrameObjects()
    })
}


$(document).ready(function () {
    updateTimer();
})

