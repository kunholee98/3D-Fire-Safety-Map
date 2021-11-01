var safetyroadA1 = pc.createScript('safetyA1');
    var safetyA1 = 0;
// Create an array of materials to cycle the model through
safetyroadA1.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
safetyroadA1.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

safetyroadA1.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        var JsonDatas = jsondata[0].results[0].series[0].values[0][5];
        if (JsonDatas <= 0) safetyA1 = 0;
        else safetyA1 = 1;
    });
};
safetyroadA1.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

safetyroadA1.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (safetyA1) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (safetyA1 === 0) this.entity.setLocalPosition(-0.692,50,4.891);
    else this.entity.setLocalPosition(-0.692,0.213,4.891);
    // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};