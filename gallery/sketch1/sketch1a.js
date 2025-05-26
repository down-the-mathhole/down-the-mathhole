new p5(function(p) {
    let xspacing = 16;    // Distance between each horizontal location
    let w;                // Width of entire wave
    let theta = 0.0;      // Start angle at 0
    let amplitude = 75.0; // Height of wave
    let period = 500.0;   // How many pixels before the wave repeats
    let dx;               // Value for incrementing x
    let yvalues;          // Using an array to store height values for the wave

    p.setup = function() {
        p.createCanvas(710, 400);
        w = p.width + 16;
        dx = (p.TWO_PI / period) * xspacing;
        yvalues = new Array(p.floor(w / xspacing));
    };

    p.draw = function() {
        p.background(0);
        p.calcWave();
        p.renderWave();
    };

    p.calcWave = function() {
        // Increment theta (try different values for 'angular velocity' here)
        theta += 0.02;

        // For every x value, calculate a y value with sine function
        let x = theta;
        for (let i = 0; i < yvalues.length; i++) {
            yvalues[i] = p.sin(x) * amplitude;
            x += dx;
        }
    };

    p.renderWave = function() {
        p.noStroke();
        p.fill(255);
        // A simple way to draw the wave with an ellipse at each location
        for (let x = 0; x < yvalues.length; x++) {
            p.ellipse(x * xspacing, p.height / 2 + yvalues[x], 16, 16);
        }
    };
}, 'sketch1a');