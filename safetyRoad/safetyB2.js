var SafetyroadB2 = pc.createScript('safetyB2');
    var safetyB2 = 0;
// Create an array of materials to cycle the model through
SafetyroadB2.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
SafetyroadB2.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

SafetyroadB2.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        var JsonDatas = jsondata[3].results[0].series[0].values[0][5];
        if (JsonDatas <= 0) safetyB2 = 0;
        else safetyB2 = 1;
    });
};
SafetyroadB2.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

SafetyroadB2.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (safetyB2) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (safetyB2 === 0) this.entity.setLocalPosition(-0.692,50,2.142);
    else this.entity.setLocalPosition(-0.692,0.213,2.142);
    // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};