var SafetyBb1 = pc.createScript('safetyBb1');
    var safetyBb1 = 0;
// Create an array of materials to cycle the model through
SafetyBb1.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
SafetyBb1.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

SafetyBb1.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        var JsonDatas = jsondata[2].results[0].series[0].values[0][5];
        if (JsonDatas <= 0) safetyBb1 = 0;
        else safetyBb1 = 1;
    });
};
SafetyBb1.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

SafetyBb1.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (safetyBb1) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (safetyBb1 === 0) this.entity.setLocalPosition(3.991,23,-0.461);
    else this.entity.setLocalPosition(3.991,0,-0.461);
    // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};