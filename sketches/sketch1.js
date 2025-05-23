new p5(function(p) {
    p.setup = function() {
        p.createCanvas(400, 400);
    };
    
    p.draw = function() {
        p.background(220);
        p.ellipse(p.width/2, p.height/2, 200, 200);
    };
}, 'sketch-container');