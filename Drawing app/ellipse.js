function Ellipse()
{
    //Name and icon of tool
    this.icon = "assets/ellipse.png";
    this.name = "ellipse";

    //set the mouseX and Y to default values when not drawing
    var previousMouseX = -1;
    var previousMouseY = -1;
    var firstMouseX = -1;
    var firstMouseY = -1;

    this.draw = function ()
    {
        //If mouse is pressed
        if (mouseIsPressed)
        {
            //While the mouse is in the canvas
            if(mouseX > 30 && mouseY < 540 && mouseY > 2)
            {
                //check if it was still drawing or not
                if (previousMouseX == -1)
                {
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                    firstMouseX = mouseX;
                    firstMouseY = mouseY;

                }
                else
                {
                    //erase the old ellipse and redraw
                    updatePixels();
                    var ellipselength = (mouseX - firstMouseX) * 2;
                    var ellipsewidth = (mouseY - firstMouseY) * 2;
                    stroke(colourP.selectedColour);
                    noFill();
                    ellipse(firstMouseX, firstMouseY, ellipselength, ellipsewidth);
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;

                }
            }
        }
        //If mouse is not pressed set the default values back to -1
        else
        {
            previousMouseX = -1;
            previousMouseY = -1;
            //save the ellipse
            loadPixels();
        }
        fill(colourP.selectedColour);
    };
}