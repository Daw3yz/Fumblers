// const targetDate = new Date('2024-02-14T11:00:00Z'),
const targetDate = new Date().setSeconds(new Date().getSeconds() + 1),
    interval = setInterval(updateTimer, 100);
var firstFrame = true
var body = document.body,
    html = document.documentElement;

/* -------------------------------------------------------------------------- */
/*                             TRANSITION SECTION                             */
/* -------------------------------------------------------------------------- */

function transition(){
    $("#countdown-page").fadeOut("fast", function(){
        $("#main-page").fadeIn(5, function(){
            startIntro()
            initMainPageVariables()
        })
        
    })
}

/* -------------------------------------------------------------------------- */
/*                                TIMER SECTION                               */
/* -------------------------------------------------------------------------- */
function updateTimer() {
    const currentDate = new Date();

    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
        // Countdown has ended
        $('#clock h1').text('');
        clearInterval(interval);
        transition();
        return;
    }

    if (firstFrame){
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
    starSize:1,

})

/* -------------------------------------------------------------------------- */
/*                                 SKETCH FADE                                */
/* -------------------------------------------------------------------------- */

function sketchFade(){

    if($(window).scrollTop() + window.innerHeight > $(document).height() - 10) {
        $('#main-page-canvas').fadeIn(2000, () => {
            bellSketch.fadeIn("slow")
            endSection.fadeIn("slow")
        })
    }
    else{
        bellSketch.fadeOut("fast")
        endSection.fadeOut("fast")

    }
}

/* -------------------------------------------------------------------------- */
/*                                INTRO ACTIONS                               */
/* -------------------------------------------------------------------------- */
function delay (ms) {
    return new Promise((resolve,reject) => setTimeout(resolve,ms));
}

async function typeWrite(element, text){
    for(i=0;i<text.length;i++){
        element.html(element.html() + text[i])
        await delay(100)
    }
}

async function typeDelete(element, length){
    for(i = length; i>0;i--){
        console.log(i)
        element.html(element.html().substring(0, i - 1))
        await delay(30)
    }
}

async function standardMessage(element, text){
    await typeWrite(element, text)
    await delay(1500)
    await typeDelete(element, text.length)
    await delay(500)
}

async function introType(){
    element = $("#intro-section h2")
    await standardMessage(element, "Hi Bell 😁")
    await standardMessage(element, "Happy Valentine's day!")
    await standardMessage(element, "Thought this would be cool")
    await standardMessage(element, "Hope you enjoy!!!")
}

async function startIntro(){
    // await introType()
    await $("#main-page-container").fadeIn(3000)
    // await $("#main-page-container").fadeIn(5)
    addScrollEvent()
}

/* -------------------------------------------------------------------------- */
/*                               PATH DRAWING                                 */
/* -------------------------------------------------------------------------- */



function drawScrollPath(){
    const scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    const draw = length * scrollpercent;

    pathImg.style.strokeDashoffset = length - draw;
}


/* -------------------------------------------------------------------------- */
/*                           FRAME OBJECT SCROLLING                           */
/* -------------------------------------------------------------------------- */

function scrollFrameObjects(){
    let scrollTop = $(window).scrollTop();
    windowHeight = 200

    sect1Obj1 = $("#section-cw")
    sect1Obj1Top = sect1Obj1.offset().top;
    if (scrollTop > sect1Obj1Top || true){
        topPercent = - (((scrollTop - sect1Obj1Top)/windowHeight)) * 100
        $("#sec-cw-floor").css('top', topPercent/32 + 12 + '%')
        $("#sec-cw-us").css('top', topPercent/32 + 14 + '%')
        $("#sec-cw-us").css('left', topPercent/16 + 14 + '%')

    }
}


/* -------------------------------------------------------------------------- */
/*                               INIT FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

var windowHeightCustom, height, bellSketch, endSection, pathImg, pathImgLength, scrollY


function initMainPageVariables(){

    
    /* -------------------------- Bell Sketch Variables ------------------------- */
    bellSketch = $("#bell-sketch")
    endSection = $("#end-section-caption")
    

    /* ----------------------------- Path variables ----------------------------- */
    // pathImg = document.getElementById("pathImg");
    // pathImgLength = pathImg.getTotalLength();
    // pathImg.style.strokeDasharray = pathImgLength;
    // pathImg.style.strokeDashoffset = pathImgLength;
}

function addScrollEvent(){
    window.addEventListener('scroll', () => {
        sketchFade()
        // drawScrollPath()
        scrollFrameObjects()
    })
}


$(document).ready(function(){
    updateTimer();
})

