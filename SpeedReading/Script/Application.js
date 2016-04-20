
/* -------------------------------------------------------- Speed Reading Application --- */

var COUNT_HORIZONTAL_TILES = 16;
var COUNT_VERTICAL_TILES = 6;
var SINGLE_CYCLE = 16.7;
var NUMBER_CHARACTERS = 78;
var ANIMATION_SPEED = 3;

var MS_TO_WAIT_BEFORE_EDGE_MSG = 60000;
var TIME_TO_DISPLAY_EDGE_MSG = 5000;

var NORMAL_MESSAGE_DISPLAY_TIME = 2200;

var surface, surfaceWidth, surfaceHeight, surfaceCanvas, surfaceContext;
var drawInterval;
var composite;
var repeatSound = false;
var billboard;
var perf;
var debug = false;

var startButtonVisible = false;
var startButtonHideCalled = false;
var startButtonHover = false;

var tryAgainButtonVisible = false;
var tryAgainButtonHover = false;

var redrawSurface = false;
var incrementRedraws = true;

var displayEdgeMessage = false;
var alreadyDisplayedEdgeMessage = false;

var tileSpinTime = 0;



function Initialize() {

    surfaceCanvas = document.getElementById('surfaceCanvas');
    if (surfaceCanvas.getContext) {
        surfaceContext = surfaceCanvas.getContext('2d');
        surface = surfaceContext;
    }

    surfaceWidth = surfaceCanvas.offsetWidth;
    surfaceHeight = surfaceCanvas.offsetHeight;
    surfaceCanvas.setAttribute("width", surfaceWidth);
    surfaceCanvas.setAttribute("height", surfaceHeight);

    RegisterEventHandlers();
    LoadResources();

    perf = new Performance();
    perf.Initialize();

    billboard = new Billboard();
    billboard.Initialize();

    drawInterval = setInterval(DrawLoop, SINGLE_CYCLE);
}



/* ---------------------------------------------------------------------- DrawSurface --- */

function DrawLoop() {

    if (redrawSurface == true) {

        if (incrementRedraws == true) {
            perf.BeginDrawLoop();
        }

        surface.fillStyle = '#101010'; //'#839EBA'; // was '#01294d'
        surface.fillRect(0, 0, surfaceWidth, surfaceHeight);
        surface.drawImage(imgBackground, 0, 0, surfaceWidth, 800);
		surface.fillStyle = '#0096ff';
		surface.fillRect(0, 0, surfaceWidth, 10);
        billboard.Draw();

        if (startButtonVisible == true && startButtonHideCalled == false) {
            if (startButtonHover == true) {
                surface.drawImage(imgStartButtonHover, billboard.startButtonLeft, billboard.startButtonTop, billboard.startButtonWidth, billboard.startButtonHeight);
            }
            else {
                surface.drawImage(imgStartButton, billboard.startButtonLeft, billboard.startButtonTop, billboard.startButtonWidth, billboard.startButtonHeight);
            }
        }

        if (tryAgainButtonVisible == true) {
            if (tryAgainButtonHover == true) {
                surface.drawImage(imgTryAgainButtonHover, billboard.startButtonLeft, billboard.startButtonTop, billboard.startButtonWidth, billboard.startButtonHeight);
            }
            else {
                surface.drawImage(imgTryAgainButton, billboard.startButtonLeft, billboard.startButtonTop, billboard.startButtonWidth, billboard.startButtonHeight);
            }
        }

        if (incrementRedraws == true) {
            perf.FinishDrawLoop();
        }
        perf.Draw();
    }
}

function DrawSurface() {
    if (redrawSurface == false) {
        redrawSurface = true;
        DrawLoop();
        redrawSurface = false;
    }
}

function StartDrawing() {
    redrawSurface = true;
    incrementRedraws = true;
}

function StopDrawing() {
    redrawSurface = false;
    incrementRedraws = false;
}

function StopEverything() {
    StopDrawing();
    HideStartButton();
    HideTryAgainButton();
}



/* --------------------------------------------------------------- Welcome Sequence --- */

var composite;

function DisplayInitialBlankBillboard() {
    DrawSurface();
    DrawSurface();
    billboard.ApplyBillboardSequence(new BillboardSequence(billboard.messages.BlankMessage(), true, true, true, true, true, true, false, 0, 'billboard.patterns.StartAtSameTime()', 'setTimeout(DisplayQuestionSpeedReading, 600)', 0));
    DrawSurface();
}

function DisplayQuestionSpeedReading() {
    perf.StartWarmupSequence();
    billboard.ApplyBillboardSequence(new BillboardSequence(billboard.messages.SpeedReadingQuestion(), true, true, true, true, true, false, 0, false, 'billboard.patterns.Random(20)', 'setTimeout(DisplayQuestionSpeedReading_Completed, 0)', 0));
}

function DisplayQuestionSpeedReading_Completed() {
    perf.StopWarmupSequence();
    setTimeout(DisplayStartButton, 600)
}



/* -------------------------------------------------------------------- Start Button --- */

function DisplayStartButton() {
    startButtonVisible = true;
    HandleMouseOver();
    DrawSurface();
}

function HideStartButton() {
    startButtonVisible = false;
    startButtonHideCalled = true;
    document.body.style.cursor = "default";
}

function StartButtonClicked() {
    HideStartButton();
    DrawSurface();
    setTimeout(StartTest, 800);
}



/* --------------------------------------------------------------- Try Again Button --- */

function DisplayTryAgainButton() {
    tryAgainButtonVisible = true;
    HandleMouseOver();
    DrawSurface();
}

function HideTryAgainButton() {
    tryAgainButtonVisible = false;
    DrawSurface();
    document.body.style.cursor = "default";
}

function TryAgainButtonClicked() {
    window.location.reload();
}

/* -------------------------------------------------- "If you were using Edge..." message */

function doDisplayIfEdgeMessage() {

    if (!displayEdgeMessage) { return false; }
    if (alreadyDisplayedEdgeMessage) { return false; }
    if (perf.hasBeen(MS_TO_WAIT_BEFORE_EDGE_MSG)) {
        alreadyDisplayedEdgeMessage = true;
        return true;
    } else {
        return false;
    }
}


/* -------------------------------------------------- Display Next Feature Iterators --- */

var featureList, ifEdgeSequence, currentFeature = 0, totalCallbackDuration = 0, justDisplayedEdgeMessage = false;

function DisplayNextFeature() {
    billboard.ApplyBillboardSequence(featureList[currentFeature]);
}

function DisplayNextFeature_Callback() {

    if (doDisplayIfEdgeMessage()) {
        setTimeout(function displayIfEdgeMessage() { billboard.ApplyBillboardSequence(ifEdgeSequence); }, featureList[currentFeature].callbackDuration);
        justDisplayedEdgeMessage = true;
    } else {
        if (!justDisplayedEdgeMessage) {
            JetStream.onEnd(function (score) {
                tileSpinTime = Math.max(0,(Math.floor(10 / score) - 2));
                var timeDelayFromBenchmark = Math.max(0, Math.min(2000, (4000 / score) - 1000));
                setTimeout(DisplayNextFeature, timeDelayFromBenchmark);
                JetStream.removeEndListeners();
                JetStream.clearPlans();
            });
            JetStream.switchToQuick();
            addAsmPlans();
            JetStream.start();
        } else {
            setTimeout(DisplayNextFeature, TIME_TO_DISPLAY_EDGE_MSG);
            justDisplayedEdgeMessage = false;
        }
        totalCallbackDuration += featureList[currentFeature].callbackDuration;
        currentFeature++;
    }
}

function getBlankTimeoutTime() {
    // TODO: replace this with an asm.js benchmark, or some appropriate benchmark
    return 100;
}



/* ----------------------------------------------------------------------- Test --- */

function StartTest() {
    JetStream.start();
}

JetStream.onEnd(function (score) {

	console.log("raw score: " + score);
	tileSpinTime = Math.max(0,(Math.floor(10 / score) - 2));
	console.log("tileSpinTime: " + tileSpinTime);
    // Bigger scores are better, so we want to flip it
    // Constrain it to 0 - 2.5s
    var timeDelayFromBenchmark = Math.max(0, Math.min(2000, (4000 / score) - 1000));

    JetStream.removeEndListeners();
    JetStream.clearPlans();
	
    currentFeature = 0;
    totalCallbackDuration = 0;

    featureList = new Array();

    ifEdgeSequence = new BillboardSequence(billboard.messages.ifEdgeMessage(), true, true, true, true, true, true, 0, true, 'billboard.patterns.Random(1)', 'DisplayNextFeature_Callback()', 0);

    perf.StartTest();

    featureList.push(new BillboardSequence(billboard.messages.Ready(), true, true, true, true, true, true, 0, true, 'billboard.patterns.StartAtSameTime()', 'DisplayNextFeature_Callback()', 800));
    featureList.push(new BillboardSequence(billboard.messages.Set(), true, true, true, true, true, true, 0, true, 'billboard.patterns.StartAtSameTime()', 'DisplayNextFeature_Callback()', 800));
    featureList.push(new BillboardSequence(billboard.messages.Go(), true, true, true, true, true, true, 0, true, 'billboard.patterns.StartAtSameTime()', 'DisplayNextFeature_Callback()', 800));

    var NUM_OF_MESSAGES = 11;
    for (var i = 0; i < NUM_OF_MESSAGES; i++) {
        featureList.push(new BillboardSequence(billboard.messages.getMessage(i), true, true, true, true, true, true, 0, true, 'billboard.patterns.Random(1)', 'DisplayNextFeature_Callback()', NORMAL_MESSAGE_DISPLAY_TIME + timeDelayFromBenchmark));
        var callbackToUse;
        if (i == NUM_OF_MESSAGES - 1) {
            callbackToUse = 'TestComplete_Callback()';
        } else {
            callbackToUse = 'DisplayNextFeature_Callback()';
        }
        var transitionAnimation;
        if (i < 3) {
            transitionAnimation = 'billboard.patterns.FirstToLastCascade(15)';
        } else if (i < 6) {
            transitionAnimation = 'billboard.patterns.BottomToTopCascade()';
        } else if (i < 9) {
            transitionAnimation = 'billboard.patterns.RightToLeftCascade()';
        } else if (i < 10) {
            transitionAnimation = 'billboard.patterns.TopToBottomCascade(3)';
        } else {
            transitionAnimation = 'billboard.patterns.LeftToRightCascade()';
        }
        featureList.push(new BillboardSequence(billboard.messages.BlankMessage(), false, true, false, true, true, false, 0, true, transitionAnimation, callbackToUse, timeDelayFromBenchmark));
    }

    DisplayNextFeature();
});

JetStream.switchToQuick();
addAsmPlans();

function TestComplete_Callback() {
    perf.StopTest();
    var message = "                 Browser Score                   " + Math.floor((perf.testDuration / 1000)) + " Seconds";
    billboard.ApplyBillboardSequence(new BillboardSequence(message, true, true, true, true, true, true, 0, true, 'billboard.patterns.StartAtSameTime()', 'setTimeout(DisplayTryAgainButton, 800)', 0));
}

/* ------------------------------------------------------------------------- Billboard Features --- */

function DisplayBillboardFeatures() {

    currentFeature = 0;
    featureList = new Array();

    featureList.push(new BillboardSequence(billboard.messages.BlankMessage(), false, true, true, true, true, true, 0, true, 'billboard.patterns.TopToBottomCascade(3)', 'DisplayNextFeature_Callback()', 100));
    featureList.push(new BillboardSequence(billboard.messages.BillboardUppercase(), false, true, true, true, true, true, 0, true, 'billboard.patterns.Random(20)', 'DisplayNextFeature_Callback()', 0));
    featureList.push(new BillboardSequence(billboard.messages.BillboardLowercase(), false, true, true, true, true, true, 0, true, 'billboard.patterns.Random(20)', 'DisplayNextFeature_Callback()', 0));
    featureList.push(new BillboardSequence(billboard.messages.BillboardNumbers(), false, true, true, true, true, true, 0, true, 'billboard.patterns.Random(20)', 'DisplayNextFeature_Callback()', 0));
    featureList.push(new BillboardSequence(billboard.messages.BillboardSymbols(), false, true, true, true, true, true, 0, true, 'billboard.patterns.Random(20)', 'DisplayNextFeature_Callback()', 0));



    DisplayNextFeature();

}
