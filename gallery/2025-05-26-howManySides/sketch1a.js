new p5(function(p) {
    let center = 200;
    let radius = 150;
    let yPerimeterDisplay = 350;
    let s = 5; // Number of sides for the polygon
    let buttonColor;
    let buttons = [];

    p.setup = function() {
        let canvas = p.createCanvas(400, 450);
        buttonColor = p.color(187, 134, 252);

        // Create buttons
        buttons.push(new Button('-10', 25, 410, () => changeSides(-10)));
        buttons.push(new Button('-1', 125, 410, () => changeSides(-1)));
        buttons.push(new Button('+1', 225, 410, () => changeSides(1)));
        buttons.push(new Button('+10', 325, 410, () => changeSides(10)));
    };

    class Button {
        constructor(label, x, y, onClick) {
            this.label = label;
            this.x = x;
            this.y = y;
            this.width = 50;
            this.height = 30;
            this.onClick = onClick;
        }

        display() {
            p.push();
            p.fill(buttonColor);
            p.rect(this.x, this.y, this.width, this.height, 5);
            p.fill(255);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(this.label, this.x + this.width/2, this.y + this.height/2);
            p.pop();
        }

        isMouseOver() {
            return p.mouseX > this.x && p.mouseX < this.x + this.width &&
                   p.mouseY > this.y && p.mouseY < this.y + this.height;
        }
    }

    function changeSides(change) {
        s = Math.max(3, s + change);
    }

    p.draw = function() {
        p.background(0);
        p.stroke(255);
        p.noFill();
        p.circle(center, center, 2*radius);
        p.renderPolygon(s);
        p.renderPerimeterDisplay(s);
        p.renderSidesDisplay(s);

        // Display buttons
        buttons.forEach(button => button.display());
    };

    p.mousePressed = function() {
        buttons.forEach(button => {
            if (button.isMouseOver()) {
                button.onClick();
            }
        });
    };

    // Function to render a regular polygon inscribed in a circle
    p.renderPolygon = function(n) {
        let angle = p.TWO_PI / n;
        p.stroke(buttonColor);
        p.fill(buttonColor._getRed(), buttonColor._getGreen(), buttonColor._getBlue(), 50);
        p.beginShape();
        for (let i = 0; i < n; i++) {
            let x = center + radius * p.cos(angle * i);
            let y = center + radius * p.sin(angle * i);
            p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
    };

    // Function to render the perimeter display using p5.js text
    p.renderPerimeterDisplay = function(n) {
        let angle = p.TWO_PI / n;
        let piApprox = n * p.sin(0.5 * angle);
        p.fill(255);
        p.textAlign(p.CENTER);
        p.textSize(16);
        p.text(`Perimeter ≈ ${p.nf(piApprox, 0, 4)}`, p.width/2, yPerimeterDisplay + 60);
    };

    // Function to render the sides display using p5.js text
    p.renderSidesDisplay = function(n) {
        p.fill(255);
        p.textAlign(p.CENTER);
        p.textSize(16);
        p.text(`Sides = ${n}`, p.width/2, yPerimeterDisplay + 30);
    };

}, 'sketch1a');