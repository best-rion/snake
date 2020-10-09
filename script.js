var head = document.getElementById("body0");
var food = document.getElementById("food");
var xnum = 100, ynum = 100, px = 0, py = 0, kee, bodySize = 1, lef = 600, to = 500;

function tOP(){
    document.getElementById("top").innerHTML = "ALI";
    document.getElementById("left").innerHTML = "left";
    document.getElementById("bottom").innerHTML = "bottom";
    document.getElementById("right").innerHTML = "right";
}
function rigHT(){
    document.getElementById("right").innerHTML = "ALI";
    document.getElementById("left").innerHTML = "left";
    document.getElementById("bottom").innerHTML = "bottom";
    document.getElementById("top").innerHTML = "top";
}
function bottOM(){
    document.getElementById("bottom").innerHTML = "ALI";
    document.getElementById("left").innerHTML = "left";
    document.getElementById("right").innerHTML = "right";
    document.getElementById("top").innerHTML = "top";
}
function leFT(){
    document.getElementById("left").innerHTML = "ALI";
    document.getElementById("bottom").innerHTML = "bottom";
    document.getElementById("right").innerHTML = "right";
    document.getElementById("top").innerHTML = "top";
}

var id = setInterval(frame, 150);
function frame() {
    if ((px == 1200) && (py == 700)) {
        clearInterval(id);
    } else {

        var pxPast = [], pyPast = [];
        for (var i1 = 0; i1 < bodySize; i1++) {
            var ppx = document.getElementById("body" + i1).style.left;
            var ppy = document.getElementById("body" + i1).style.top;
            pxPast[i1] = ppx;
            pyPast[i1] = ppy;
        }
        if (document.getElementById("top").innerHTML == "ALI") {
            py -= 10;
            if (py == -10) {
                py += to;
            }
            head.style.top = py + "px";
        } else if (document.getElementById("right").innerHTML == "ALI") {
            px += 10;
            if (px == lef) {
                px -= lef;
            }
            head.style.left = px + "px";
        }
        else if (document.getElementById("bottom").innerHTML == "ALI") {
            py += 10;
            if (py == to) {
                py -= to;
            }
            head.style.top = py + "px";
        }
        else if (document.getElementById("left").innerHTML == "ALI") {
            px -= 10;
            if (px == -10) {
                px += lef;
            }
            head.style.left = px + "px";
        }

        numNotFound = true;
        if ((px == xnum) && (py == ynum)) {
            while(numNotFound){
                xnum = Math.floor(Math.random() * (lef/10)) * 10;
                ynum = Math.floor(Math.random() * (to/10)) * 10;
                for(var i3 = 0;i3<bodySize;i3++){
                    var checkX = document.getElementById("body"+i3).style.left;
                    var checky = document.getElementById("body"+i3).style.top;
                    if(((xnum+"px")==checkX)||(ynum+"px"==checky)){
                        numNotFound = true;
                    }else{
                        numNotFound = false;
                    }
                }
            }
            console.log(xnum);
            food.style.left = xnum + "px";
            food.style.top = ynum + "px";

            var sbody = document.createElement("div");
            sbody.setAttribute("id", ("body" + bodySize));
            sbody.setAttribute("class", "body");
            document.getElementById("box").appendChild(sbody);
            bodySize++;
        }
        if(bodySize>1){
            for (var i2 = 1; i2 < bodySize ; i2++) {
                var nbody = document.getElementById("body"+i2);
                nbody.style.top = pyPast[i2 - 1];
                nbody.style.left = pxPast[i2 - 1];
            }
        }
    }
    var score = document.getElementById("score");
    score.innerHTML = ""+bodySize-1;
}
