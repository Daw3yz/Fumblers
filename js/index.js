// const targetDate = new Date('2024-02-14T11:00:00Z');
const targetDate = new Date().setSeconds(new Date().getSeconds() + 1),
    interval = setInterval(updateTimer, 100);
var firstFrame = true
var body = document.body,
    html = document.documentElement;

/* -------------------------------------------------------------------------- */
/*                             TRANSITION SECTION                             */
/* -------------------------------------------------------------------------- */

function transition(){
    $("#countdown-page").fadeOut("slow", function(){
        $("#main-page").fadeIn(2000, function(){
            startIntro()
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
/*                               SCROLL ACTIONS                               */
/* -------------------------------------------------------------------------- */




window.addEventListener('scroll', () => {
    var windowHeightCustom = window.innerHeight / 1.2
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    let scrollY = window.scrollY;
    
    

    bellSketch = document.getElementById("bell-sketch")
    endSection = document.getElementById("end-section")
    
    endSectionBeginning = (scrollY - height + windowHeightCustom * 2)
    console.log(endSectionBeginning)
    if(endSectionBeginning > 0){

        bellSketch.style.opacity = ( endSectionBeginning / windowHeightCustom)
        endSection.style.opacity = ( endSectionBeginning / windowHeightCustom)
    }   
    else{
        bellSketch.style.opacity  = 0
        endSection.style.opacity  = 0
    }
})

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
    // element = $("#intro-section h1")
    // await standardMessage(element, "Hi Bell 😁")
    // await standardMessage(element, "Happy Valentine's day!")
    // await standardMessage(element, "Been working on this for some time now")
    // await standardMessage(element, "Hope you enjoy!!!")
}

async function startIntro(){
    await introType()
    $("#main-page-container").fadeIn(3000)
}



$(document).ready(function(){
    updateTimer();
})

