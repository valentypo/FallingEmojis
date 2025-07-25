const emojis = ["😋", "😏", "🧐", "😁", "🥰", "🥺", "💩", "😼", "🙉"];
let score = 0;
let life = 3;
let position = 0;
let emojiPositionX = 0;
let emojiPositionY = 0;
let startedGame = false;
let intervalID = null;

// open tutorial
$(".open-htp").on("click", function(){
    $(".how-to-play").slideDown();
});

// close tutorial
$("#close-htp").on("click", function(){
    $(".how-to-play").slideUp();
});

// to move basket left or right
$(document).on("keypress", function(event){
    if(!startedGame){
        startGame();
    }
    else{
        if(event.key === 'a' || event.key ==='A'){
            if(position > 0){
                position -= 20;
                $("#basket-img").css("left", position + "px")
            }
        }
        else if(event.key === 'd' || event.key === 'D'){
            if(position < 910){
                position += 20;
                $("#basket-img").css("left", position + "px")
            }
        }
    }
});


// after game start
function startGame(){
    life = 3;
    score = 0;

    $("#game-title").text("😮 Falling Emojis 😮");
    $("#game-title").css("color","rgb(255, 170, 0)");
    startedGame = true;
    // while(life > 0){
    displayStatus();
    spawnEmoji();
    // }
}

function displayStatus(){
    $("#game-score").text("Life: " + life + ", Score: " + score);
}

// spawns emoji and make it fall
function spawnEmoji(){

    displayStatus();
    let randomEmoji = Math.floor(Math.random() * 9);
    let randomPosition = Math.floor(Math.random() * 965);

    emojiPositionX = randomPosition;
    emojiPositionY = 0;

    $("#falling-emoji").text(emojis[randomEmoji]);
    $("#falling-emoji").css("left", randomPosition + "px");
    $("#falling-emoji").css("top", emojiPositionY + "px");
    $("#falling-emoji").css("display", "inline");

    moveEmoji();
}

// move emojis
function moveEmoji(){
    if (intervalID !== null) {
        clearInterval(intervalID);
    }

    let intervalSpeed = Math.max(40, 180 - score * 4);
    intervalID = setInterval(() => {

        emojiPositionY += 20;
        $("#falling-emoji").css("top", emojiPositionY + "px");

        checkPosition(intervalID);
    }, intervalSpeed);

}

function checkPosition(){

    if(emojiPositionY >= 580 && emojiPositionY < 620){
        if(emojiPositionX >= position && emojiPositionX <= position + 70){
            // to clear falling
            clearInterval(intervalID);
            $("#falling-emoji").css("display", "none");
            score++;
            spawnEmoji();
        }
    }
    else if(emojiPositionY >= 620){
        // to clear falling
        clearInterval(intervalID);
        life--;
        if(life <= 0){
            displayStatus();
            $("#game-title").text("😵You Lose, Click Anywhere to Retry!😵");
            $("#game-title").css("color","red");
            $("#falling-emoji").css("display", "none");
            $(document).on("click", () => {
                startGame();
            });
        }
        else{
            $("#falling-emoji").css("display", "none");
            displayStatus();
            spawnEmoji();
        }
    }
}