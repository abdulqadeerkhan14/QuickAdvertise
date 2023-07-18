document.addEventListener("DOMContentLoaded", function() {
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var circles = [];



function Circle(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;

    this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    };

    this.update = function() {
        this.x += this.speed.x;
        this.y += this.speed.y;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.speed.x *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speed.y *= -1;
        }

        this.draw();
    };
}

function createCircles() {
    var numCircles = 50; // Adjust the number of circles

    for (var i = 0; i < numCircles; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 20 + 10;
        var color = "rgba(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ", 0.1)";
        // var color = "rgba("+128+","+128+","+128+",0.2)";
        var speed = {
            x: (Math.random() - 0.5) * 2, // Random speed in x-direction
            y: (Math.random() - 0.5) * 2 // Random speed in y-direction
        };

        circles.push(new Circle(x, y, radius, color, speed));
    }
}

function animateCircles() {
    requestAnimationFrame(animateCircles);
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createCircles();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

document.querySelector(".background-animation").appendChild(canvas);
animateCircles();
});


