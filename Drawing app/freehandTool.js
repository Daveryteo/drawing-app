function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";

	//to smoothly draw. Draw a line from the previous mouse location
	//to the current mouse location. The values store
	//the locations from the last frame. -1 if we haven't start drawing yet
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if already have values for previousX and Y, draw a line from
			//there to the current mouse location
			else
			{
				stroke(colourP.selectedColour);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse, set the previousMouse values
		//back to -1.
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
}