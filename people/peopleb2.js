var Peopleb2 = pc.createScript('peopleb2');
    var peopleb2 = 0;
var peoplebb2 = 0;
// Create an array of materials to cycle the model through
Peopleb2.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
Peopleb2.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

Peopleb2.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        peopleb2 = jsondata[3].results[0].series[0].values[0][5];
        if (peopleb2 > 0) peoplebb2 = 1;
        else peoplebb2 = 0;
    });
};
Peopleb2.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

Peopleb2.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (peoplebb2) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (peoplebb2 === 0)
    {
        this.entity.setLocalPosition(-3.886,50,-3.543);
        this.entity.setLocalScale(0.5,0.3,0.5);
    }
    else
    {
        this.entity.setLocalScale(Math.sqrt(peopleb2)*2*0.12,Math.sqrt(peopleb2)*2*0.15,Math.sqrt(peopleb2)*2*0.12);
        this.entity.setLocalPosition(-3.886,peopleb2*0.05,-3.543);
    }
        // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};