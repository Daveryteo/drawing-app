function smiley() {
    //set an icon and a name for the object
    this.icon = "assets/smiley.jpg";
    this.name = "smiley";

    //set the defult mode to be fill
    this.fillMode = "fill";
    var self = this;

    this.draw = function ()
    {
        //Check if mouse is pressed
        if (mouseIsPressed)
        {
            //To prevent out of the canvas click
            if (mouseX > 30 && mouseY < 540 && mouseY > 2)
            {
                //Allows the smiley to be moved around
                updatePixels();

                //Check whether fill mode is fill or no fill
                //Proceed to draw the smiley that is wanted
                if (self.fillMode == "fill")
                {
                    drawSmileyFill(mouseX, mouseY);
                }
                else
                {
                    drawSmileyNoFill(mouseX, mouseY);
                }
            }
        }
        else
        {
            //To save the sticker
            loadPixels();
        }
    };

    //Draw no filled smiley
    var drawSmileyNoFill = function (mx, my)
    {
        push();
        translate(mx, my);
        var xoffset = 80;
        var yoffset = 80;
        stroke(colourP.selectedColour);
        fill(255);
        ellipse(80 - xoffset, 80 - yoffset, 60, 60);
        fill(colourP.selectedColour);
        ellipse(65 - xoffset, 70 - yoffset, 10, 10);
        ellipse(95 - xoffset, 70 - yoffset, 10, 10);
        arc(80 - xoffset, 85 - yoffset, 40, 20, 2 * PI, PI);
        pop();
    };

    //Draw filled smiley
    var drawSmileyFill = function (mx, my)
    {
        push();
        translate(mx, my);
        var xoffset = 80;
        var yoffset = 80;
        stroke(colourP.selectedColour);
        fill(colourP.selectedColour);
        ellipse(80 - xoffset, 80 - yoffset, 60, 60);
        fill(255);
        ellipse(65 - xoffset, 70 - yoffset, 10, 10);
        ellipse(95 - xoffset, 70 - yoffset, 10, 10);
        arc(80 - xoffset, 85 - yoffset, 40, 20, 2 * PI, PI);
        pop();
    };

    //when the tool is deselected update the pixels. Also clear options
    this.unselectTool = function ()
    {
        updatePixels();
        //clear options
        select(".options").html("");
    };

    //adds a button and click handler to the options area. When clicked
    //toggle whether smiley is fill or no fill
    this.populateOptions = function ()
    {
        select(".options").html(
            "<button id='fillButton'>No Fill</button>");
        //click handler
        select("#fillButton").mouseClicked(function ()
        {
            var button = select("#" + this.elt.id);
            if (self.fillMode == "fill")
            {
                self.fillMode = "nofill";
                button.html('Fill');
            }
            else
            {
                self.fillMode = "fill";
                button.html('No Fill');
            }
        });
    };
}