var SafetyC3 = pc.createScript('safetyC3');
    var safetyC3 = 0;
// Create an array of materials to cycle the model through
SafetyC3.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
SafetyC3.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

SafetyC3.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        var JsonDatas = jsondata[4].results[0].series[0].values[0][5];
        if (JsonDatas <= 0) safetyC3 = 0;
        else safetyC3 = 1;
    });
};
SafetyC3.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

SafetyC3.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (safetyC3) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (safetyC3 === 0) this.entity.setLocalPosition(2.8,7.5,-0.475);
    else this.entity.setLocalPosition(2.8,0,-0.475);
    // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};