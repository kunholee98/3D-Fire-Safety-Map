var Peopleb1 = pc.createScript('peopleb1');
    var peopleb1 = 0;
var peoplebb1 = 0;
// Create an array of materials to cycle the model through
Peopleb1.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
Peopleb1.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

Peopleb1.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        peopleb1 = jsondata[2].results[0].series[0].values[0][5];
        if (peopleb1 > 0) peoplebb1 = 1;
        else peoplebb1 = 0;    });
};
Peopleb1.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

Peopleb1.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (peoplebb1) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (peoplebb1 === 0)
    {
        this.entity.setLocalPosition(-0.692,50,3.351);
        this.entity.setLocalScale(0.5,0.3,0.5);
    }
    else
    {
        this.entity.setLocalScale(Math.sqrt(peopleb1)*2*0.12,Math.sqrt(peopleb1)*2*0.15,Math.sqrt(peopleb1)*2*0.12);
        this.entity.setLocalPosition(2.083,peopleb1*0.05,1.46);
    }
        // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};