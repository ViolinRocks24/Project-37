class Quiz{
    constructor(){

    }

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }

    async start() {
        if(gameState === 0) {
            contestant = new Contestant();
            var contestantCountRef = await database.ref('contestantCount').once("value");
            if(contestantCountRef.exists()) {
                contestantCount = contestantCountRef.val();
                contestant.getCount();
            }
            question = new Question();
            question.display();
            text("NOTE: Please wait as other contestants join. Thank you!", 130, 230);
        }
    }

    play() {
        question.hide();
        background("Yellow");
        fill(0);
        textSize(30);
        Text("Result of the quiz:", 340, 50);
        Text("--------------------------", 320, 65);
        Contestant.getContestantInfo();
        if(allContestants !== undefined) {
            var display_Answers = 230;

            for(var plr in allContestants) {
                var correctAns = "2";
                if(correctAns === allContestants[plr].answer){
                    fill("green");
                }
                else{
                    fill("red");
                }
                display_Answers+=30;
                textSize(20);
                Text(allContestants[plr].name + ": " + allContestants9plr.answer, 250, display_Answers);
            }
        }
    }
}