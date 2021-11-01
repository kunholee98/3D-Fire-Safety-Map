var SafetyC1 = pc.createScript('safetyC1');
    var safetyC1 = 0;
// Create an array of materials to cycle the model through
SafetyC1.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
SafetyC1.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

SafetyC1.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        var JsonDatas = jsondata[4].results[0].series[0].values[0][5];
        if (JsonDatas <= 0) safetyC1 = 0;
        else safetyC1 = 1;
    });
};
SafetyC1.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

SafetyC1.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (safetyC1) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (safetyC1 === 0) this.entity.setLocalPosition(-0.229,7.5,1.906);
    else this.entity.setLocalPosition(-0.229,0.213,1.906);
    // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};