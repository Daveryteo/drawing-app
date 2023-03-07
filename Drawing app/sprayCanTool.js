function SprayCanTool()
{
	//Set name and icon
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

	var points = 13;
	var spread = 10;

	this.draw = function()
	{
		var r = random(5,10);
		if(mouseIsPressed)
		{
			for(var i = 0; i < points; i++)
			{
				fill(colourP.selectedColour);
				stroke(colourP.selectedColour);
				point(random(mouseX-spread, mouseX + spread), random(mouseY-spread, mouseY+spread));
			}
		}
	};
}