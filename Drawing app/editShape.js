function editShape(c)
{
    //set a name and icon for the object
    this.icon = "assets/editshape.JPG";
    this.name = "Editing Shapes";

    //set edit mode to false
    this.editMode = false;

    //set selectmode to false
    this.selectedMode = false;

    //initiate current shape array
    this.currentShape = [];

    //Get the canvas
    this.canvas = c;

    var self = this;

    this.draw = function()
    {
        updatePixels();
        if(mouseIsPressed)
        {
            if(!this.editMode)
            {
                //If mouse is pressed while in the canvas and edit mode
                //is true, push points into currentshape array
                if(mouseY < 550 && mouseY > 20 && mouseX > 5)
                {
                    self.currentShape.push({
                        x:mouseX,
                        y:mouseY,
                    });
                }
            }
            else
            {
                for(var i = 0; i < self.currentShape.length; i++)
                {
                    //Check if mouse is in range of the circles to edit
                    if(dist(self.currentShape[i].x, self.currentShape[i].y, mouseX, mouseY) < 15)
                    {
                        self.currentShape[i].x = mouseX;
                        self.currentShape[i].y = mouseY;
                    }
                }
            }
        }

        //Drawing of the shape
        beginShape();
        for(var i = 0; i < self.currentShape.length; i++)
        {
            noFill();
            stroke(colourP.selectedColour);
            vertex(self.currentShape[i].x, self.currentShape[i].y);

            //Editing the vertices
            if(self.editMode)
            {
                fill("blue");
                ellipse(self.currentShape[i].x, self.currentShape[i].y, 10);
                noFill();
            }
        }
        endShape();
    }
    //Check if the mouse pressed is on the canvas
    this.mousePressonCanvas = function(c)
    {
       if(mouseX > c.elt.offsetLeft &&
          mouseX < (c.elt.offsetLeft + c.width + c.width) &&
          mouseY > c.elt.offsetTop - 38 &&
          mouseY < 540)
        {
            return true;
        }
        return false;
    }

    //when the tool is deselected update the pixels to just show the drawing
    //Also clear options
    this.unselectTool = function()
    {
        updatePixels();
        //clear options
        select(".options").html("");
    };

    //adds 2 buttons and click handlers to the options area. When clicked
    //allows the user to add more vertices or to resume editing or the other
    //button is for when they are happy with what they have drawn
    this.populateOptions = function()
    {
        select(".options").html(
            "<button id='Editshape'>Edit Shape</button>" +
            "<br>" +
            "<button id='Finalshape'>Final Shape</button>"
        );

        //click handler for editing shape and adding vertices
        select("#Editshape").mouseClicked(function()
        {
            var button = select("#" + this.elt.id)
            //When not editing
            if(self.editMode)
            {
                self.editMode = false;
                button.html('Edit Shape');
            }
            //When editing
            else
            {
                self.editMode = true;
                button.html('Add Vertices');
            }
        });

        //click handler for final shape
        select('#Finalshape').mouseClicked(function()
        {
            self.editMode = false;
            self.draw();
            loadPixels();
            self.currentShape= [];
        });
    };
}