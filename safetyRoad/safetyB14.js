var SafetyB14 = pc.createScript('safetyB14');
    var safetyB14 = 0;
// Create an array of materials to cycle the model through
SafetyB14.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
SafetyB14.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

SafetyB14.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        var JsonDatas = jsondata[2].results[0].series[0].values[0][5];
        if (JsonDatas <= 0) safetyB14 = 0;
        else safetyB14 = 1;
    });
};
SafetyB14.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

SafetyB14.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (safetyB14) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (safetyB14 === 0) this.entity.setLocalPosition(17.756,30,-0.471);
    else this.entity.setLocalPosition(17.756,2.584,-0.471);
    // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};