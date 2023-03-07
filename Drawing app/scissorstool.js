function scissors()
{
    //Set an icon and a name
    this.icon = "assets/scissor.png"
    this.name = "scissors";

    //Setting the default values and creating the variables
    this.selectmode = 0;
    this.selectedarea = {x: 0, y:0, w: 100, h: 100};
    this.selectedpixels = get(this.selectedarea.x, this.selectedarea.y, this.selectedarea.w, this.selectedarea.h);

    var self = this;

    //Initiate cutting to be false
    var cutting = false;

    //Initiate variables and give them default values
    var previousMouseX = -1;
    var previousMouseY = -1;
    var firstmouseX = -1;
    var firstmouseY = -1;

    this.draw = function()
    {
        if(mouseIsPressed)
        {
            if(mouseX > 30 && mouseY < 540 && mouseY > 2)
            {
                if(self.selectmode == 0)
                {
                    //check if they previousX and Y are -1. set them to the current
                    //mouse X and Y if they are.
                    if (previousMouseX == -1)
                    {
                        console.log("update mouse")
                        previousMouseX = mouseX;
                        previousMouseY = mouseY;
                    }
                    //if we already have values for previousX and Y we can draw a line from
                    //there to the current mouse location
                    else
                    {
                        stroke(0);
                        noFill();
                        line(previousMouseX, previousMouseY, mouseX, mouseY);
                        previousMouseX = mouseX;
                        previousMouseY = mouseY;
                    }
                }
                else if (self.selectmode == 1)
                {
                    if(cutting == false)
                    {
                        firstmouseX = mouseX;
                        firstmouseY = mouseY;
                        cutting = true;
                    }

                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                    self.drawcutarea(firstmouseX, firstmouseY);
                }
                else if(self.selectmode == 2)
                {
                    var x = mouseX - this.selectedarea.w / 2;
                    var y = mouseY - this.selectedarea.h / 2;
                    push();
                    image(this.selectedpixels, x, y);
                    pop();
                }
            }
        }
        else
        {
            //if the user has released the mouse we want to set the previousMouse values
            //back to -1.
            previousMouseX = -1;
            previousMouseY = -1;
            loadPixels();
        }
    }

    this.drawcutarea = function(mx, my)
    {
        noFill();
        strokeWeight(1);
        stroke(0);
        var w = mouseX - mx;
        var h = mouseY - my;

        self.selectedarea.w = w;
        self.selectedarea.h = h;

        updatePixels();
        rect(mx, my, self.selectedarea.w, self.selectedarea.h);
        previousMouseX = mouseX;
        previousMouseY = mouseY;
    }

    //when the tool is deselected update the pixels. Also clear options
    this.unselectTool = function ()
    {
        updatePixels();
        //clear options
        select(".options").html("");
        self.selectmode = 0;
        cutting = false;
    };

    //Select area button, cut and stop paste
    this.populateOptions = function ()
    {
        select(".options").html(
            "<button id='selectarea'>Select Area</button>");
        // 	//click handler
        select("#selectarea").mouseClicked(function ()
        {
            var button = select("#" + this.elt.id);
            if(self.selectmode == 0)
            {
                self.selectmode += 1;
                button.html('Cut');

                loadPixels(); // store current frame
            }
            else if(self.selectmode == 1)
            {
                self.selectmode += 1;
                button.html('Stop paste');

                //refresh the screen
                updatePixels();

                //store the pixels
                self.selectedpixels = get(firstmouseX + 1, firstmouseY + 1, self.selectedarea.w - 1, self.selectedarea.h - 1);

                //draw a rectangle over it
                fill(255);
                noStroke();
                rect(firstmouseX, firstmouseY, self.selectedarea.w + 1, self.selectedarea.h + 1);
            }
            else if(self.selectmode == 2)
            {
                //Set the select mode to 0
                self.selectmode = 0;
                loadPixels();

                //Reset the values of the selected area
                self.selectedarea = {x: 0, y: 0, w: 100, h:100};
                button.html("select area");

                //Set cutting to false
                cutting = false;
            }
        });
    };
}