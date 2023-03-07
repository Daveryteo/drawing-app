function layertool(layer)
{
    //Name and icon
    this.icon= "assets/layer.png";
    this.name = "layertool";

    var self = this;

    //set the layer
    this.layer = layer;

    //Initiate new layer to false since we have not saved any layers at first
    this.newlayer1 = false;
    this.newlayer2 = false;

    //Create graphics for the different layers
    //Add it to the content div and give it fixed position
    var c2 = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
    c2.parent("content");
    c2.position(85, 35, 'fixed');
    var c3 = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
    c3.parent("content");
    c3.position(85, 35, 'fixed');

    //Initiate layer variables to store the image of the different layers
    var layer1;
    var layer2;

    this.draw = function()
    {

    }


    //Also clear options
    this.unselectTool = function()
    {
        updatePixels();
        //clear options
        select(".options").html("");

        //Set the layer to 0
        self.layer = 0;

        //Hide the different layers when changing to another tool
        c2.hide();
        c3.hide();
    };

    //Populate options with viewing and saving of different layers
    this.populateOptions = function()
    {
        //The html of the buttons
        if(self.layer == 0)
        {
            //If there is no saved layers disable the buttons for the respective
            //layers and enable them if there are saved layers
            if(self.newlayer1 == false)
            {
                if(self.newlayer2 == false)
                {
                    select(".options").html(
                        "<button id='layer1' disabled> View layer 1 </button>" +
                        "&nbsp&nbsp&nbsp&nbsp" +
                        "<button id='layer2' disabled> View layer 2</button>" +
                        "<br><br>" +
                        "<button id='save1'>Save layer 1</button>" +
                        "&nbsp&nbsp&nbsp&nbsp" +
                        "<button id='save2'>Save layer 2</button>"
                    );
                }
                else if(self.newlayer2 == true)
                {
                    select(".options").html(
                        "<button id='layer1' disabled> View layer 1 </button>" +
                        "&nbsp&nbsp&nbsp&nbsp" +
                        "<button id='layer2'> View layer 2</button>" +
                        "<br><br>" +
                        "<button id='save1'>Save layer 1</button>" +
                        "&nbsp&nbsp&nbsp&nbsp" +
                        "<button id='save2'>Save layer 2</button>"
                    );
                }
            }
            else if(self.newlayer1 == true)
            {
                if(self.newlayer2 == false)
                {
                    select(".options").html(
                        "<button id='layer1'> View layer 1 </button>" +
                        "&nbsp&nbsp&nbsp&nbsp" +
                        "<button id='layer2' disabled> View layer 2</button>" +
                        "<br><br>" +
                        "<button id='save1'>Save layer 1</button>" +
                        "&nbsp&nbsp&nbsp&nbsp" +
                        "<button id='save2'>Save layer 2</button>"
                    );
                }
                else if(self.newlayer2 == true)
                {
                    select(".options").html(
                        "<button id='layer1'> View layer 1 </button>" +
                        "&nbsp&nbsp&nbsp&nbsp" +
                        "<button id='layer2'> View layer 2</button>" +
                        "<br><br>" +
                        "<button id='save1'>Save layer 1</button>" +
                        "&nbsp&nbsp&nbsp&nbsp" +
                        "<button id='save2'>Save layer 2</button>"
                    );
                }
            }
        }
        //click handler for viewing layer 1
        select("#layer1").mouseClicked(function ()
        {
            if(self.newlayer1 == true)
            {
                //hide layer 2 if they were viewing it
                c3.hide();

                //Show layer 1
                c2.show();
                c2.image(layer1, 0, 0, canvasContainer.size().width, canvasContainer.size().height);
            }
        });

        //click handler for viewing layer 2
        select('#layer2').mouseClicked(function()
        {
            if(self.newlayer2 == true)
            {
                //Hide layer 1 if they were viewing it
                c2.hide();

                //Show layer 2
                c3.show();
                c3.image(layer2, 0, 0, canvasContainer.size().width, canvasContainer.size().height);
            }
        });

        //Click handler for saving layer 1
        select('#save1').mouseClicked(function()
        {
            var button = select("#layer1");
            //Enable to viewing button on saving layer 1
            if(self.newlayer1 == false)
            {
                button.removeAttribute("disabled", "disabled");
            }

            //Save layer 1 and set the newlayer 1 to true since there is a saved layer
            layer1 = get(0, 0, canvasContainer.size().width, canvasContainer.size().height);
            self.newlayer1 = true;
        });

        //Click handler for saving layer 2
        select('#save2').mouseClicked(function()
        {
            var button = select("#layer2");
            //Enable to viewing button on saving layer 2
            if(self.newlayer2 == false)
            {
                button.removeAttribute("disabled", "disabled");
            }

            //Save layer 2 and set the newlayer 2 to true since there is a saved layer
            layer2 = get(0, 0, canvasContainer.size().width, canvasContainer.size().height);
            self.newlayer2 = true;
        });
    };
}