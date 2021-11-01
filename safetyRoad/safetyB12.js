var SafetyBb2 = pc.createScript('safetyBb2');
    var safetyBb2 = 0;
// Create an array of materials to cycle the model through
SafetyBb2.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
SafetyBb2.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

SafetyBb2.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        var JsonDatas = jsondata[2].results[0].series[0].values[0][5];
        if (JsonDatas <= 0) safetyBb2 = 0;
        else safetyBb2 = 1;
    });
};
SafetyBb2.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

SafetyBb2.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (safetyBb2) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (safetyBb2 === 0) this.entity.setLocalPosition(-1.876,7.5,0.117);
    else this.entity.setLocalPosition(-1.876,0.213,0.117);
    // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};