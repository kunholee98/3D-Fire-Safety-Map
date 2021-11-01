var peopleA = pc.createScript('peoplea1');
    var peoplea1 = 0;
var peopleaa1 = 0;
// Create an array of materials to cycle the model through
peopleA.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
peopleA.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

peopleA.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        peoplea1 = jsondata[0].results[0].series[0].values[0][5];
if (peoplea1 > 0) peopleaa1 = 1;
        else peopleaa1 = 0;
    });
};
peopleA.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

peopleA.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (peopleaa1) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (peopleaa1 === 0)
    {
        this.entity.setLocalPosition(-0.692,50,3.351);
        this.entity.setLocalScale(0.5,0.3,0.5);
    }
    else
    {
        this.entity.setLocalScale(Math.sqrt(peoplea1)*2*0.12,Math.sqrt(peoplea1)*2*0.15,Math.sqrt(peoplea1)*2*0.12);
        this.entity.setLocalPosition(-4.026,peoplea1*0.05,2.353);
    }
        // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};