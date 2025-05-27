new p5(function(p) {
    let center = 200;
    let radius = 150;
    let yPerimeterDisplay = 350;
    let s = 5; // Number of sides for the polygon
    let sidesKatexElement;
    let perimeterKatexElement;
    let buttonColor;
    let buttons = [];

    p.setup = function() {
        let canvas = p.createCanvas(400, 450);
        buttonColor = p.color(187, 134, 252);

        // Create div elements for KaTeX rendering
        sidesKatexElement = p.createDiv('');
        sidesKatexElement.position(0, yPerimeterDisplay + 30);
        sidesKatexElement.style('width', '100%');
        sidesKatexElement.style('text-align', 'center');
        sidesKatexElement.style('color', 'white');

        perimeterKatexElement = p.createDiv('');
        perimeterKatexElement.position(0, yPerimeterDisplay + 60);
        perimeterKatexElement.style('width', '100%');
        perimeterKatexElement.style('text-align', 'center');
        perimeterKatexElement.style('color', 'white');

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
        p.renderPerimeterDisplay(s, radius);
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

    // Function to render the perimeter display using KaTeX
    p.renderPerimeterDisplay = function(n) {
        let angle = p.TWO_PI / n;
        let piApprox = n * p.sin(0.5 * angle);
        katex.render(`\\text{Perimeter} \\approx ${p.nf(piApprox, 0, 4)}`, perimeterKatexElement.elt, {
            throwOnError: false
        });
    };

    // Function to render the sides display using KaTeX
    p.renderSidesDisplay = function(n) {
        katex.render(`\\text{Sides} = ${n}`, sidesKatexElement.elt, {
            throwOnError: false
        });
    };

}, 'sketch1a');