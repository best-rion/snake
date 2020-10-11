var head = document.getElementById("body0");
var food = document.getElementById("food");
var pSwipe, swip, xnum = 100, ynum = 100, px = 0, py = 0, kee, bodySize = 1, lef = 700, to = 800;
var bInner = document.getElementById("b");
function pause() {
    if (bInner.innerHTML == "Pause") {
        bInner.innerHTML = "Resume";
        bInner.style.backgroundColor = "#000";
        bInner.style.color = "#fff";
    }
    else {
        bInner.innerHTML = "Pause";
        bInner.style.backgroundColor = "#fff";
        bInner.style.color = "#000";
    }
}
var id = setInterval(frame, 150);
function frame() {
    var bool2 = false;
    for (var i4 = 1; i4 < bodySize; i4++) {
        var nbdy = document.getElementById("body" + i4);
        if ((nbdy.style.left == head.style.left) && (nbdy.style.top == head.style.top)) { bool2 = true; nbdy.style.backgroundColor = "#ffff00"; }
    }
    if (bool2) {
        var go = document.getElementById("go");
        go.innerHTML = "GAME OVER";
        go.style.display = "block";
        clearInterval(id);
    } else {
        if (bInner.innerHTML == "Pause") {
            var pxPast = [], pyPast = [];
            for (var i1 = 0; i1 < bodySize; i1++) {
                var ppx = document.getElementById("body" + i1).style.left;
                var ppy = document.getElementById("body" + i1).style.top;
                pxPast[i1] = ppx;
                pyPast[i1] = ppy;
            }

            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchmove', handleTouchMove, false);

            var xDown = null;
            var yDown = null;

            function getTouches(evt) {
                return evt.touches ||             // browser API
                    evt.originalEvent.touches; // jQuery
            }

            function handleTouchStart(evt) {
                const firstTouch = getTouches(evt)[0];
                xDown = firstTouch.clientX;
                yDown = firstTouch.clientY;
            };

            function handleTouchMove(evt) {
                if (!xDown || !yDown) {
                    return;
                }

                var xUp = evt.touches[0].clientX;
                var yUp = evt.touches[0].clientY;

                var xDiff = xDown - xUp;
                var yDiff = yDown - yUp;

                pSwipe = swip;
                if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                    if ((xDiff > 0) && (pSwipe != "right")) {
                        /* left swipe */
                        swip = "left";
                    } else if ((xDiff < 0) && (pSwipe != "left")) {
                        /* right swipe */
                        swip = "right";
                    }
                } else {
                    if ((yDiff > 0) && (pSwipe != "bottom")) {
                        /* up swipe */
                        swip = "top";
                    } else if ((yDiff < 0) && (pSwipe != "top")) {
                        /* down swipe */
                        swip = "bottom";
                    }
                }
                /* reset values */
                xDown = null;
                yDown = null;
            };




            if (swip == "top") {
                py -= 20;
                if (py == -20) {
                    py += to;
                }
                head.style.top = py + "px";
            } else if (swip == "right") {
                px += 20;
                if (px == lef) {
                    px -= lef;
                }
                head.style.left = px + "px";
            }
            else if (swip == "bottom") {
                py += 20;
                if (py == to) {
                    py -= to;
                }
                head.style.top = py + "px";
            }
            else if (swip == "left") {
                px -= 20;
                if (px == -20) {
                    px += lef;
                }
                head.style.left = px + "px";
            }

            if ((px == xnum) && (py == ynum)) {
                numNotFound = true;
                while (numNotFound) {
                    numNotFound = false;
                    xnum = Math.floor(Math.random() * (lef / 20)) * 20;
                    ynum = Math.floor(Math.random() * (to / 20)) * 20;
                    for (var i3 = 0; i3 < bodySize; i3++) {
                        var checkX = document.getElementById("body" + i3).style.left;
                        var checkY = document.getElementById("body" + i3).style.top;
                        if (((xnum + "px") == checkX) && ((ynum + "px") == checkY)) {
                            numNotFound = true;
                        }
                    }
                }
                food.style.left = xnum + "px";
                food.style.top = ynum + "px";

                var sbody = document.createElement("div");
                sbody.setAttribute("id", ("body" + bodySize));
                sbody.setAttribute("class", "body");
                document.getElementById("box").appendChild(sbody);
                bodySize++;
            }
            if (bodySize > 1) {
                for (var i2 = 1; i2 < bodySize; i2++) {
                    var nbody = document.getElementById("body" + i2);
                    nbody.style.top = pyPast[i2 - 1];
                    nbody.style.left = pxPast[i2 - 1];
                }
            }
        }
    }
    var score = document.getElementById("score");
    score.innerHTML = "" + bodySize - 1;
}
