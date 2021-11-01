var safetyroadCc2 = pc.createScript('safetyCc2');
    var safetyCc2 = 0;
// Create an array of materials to cycle the model through
safetyroadCc2.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
safetyroadCc2.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

safetyroadCc2.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        var JsonDatas = jsondata[4].results[0].series[0].values[0][5];
        if (JsonDatas <= 0) safetyCc2 = 0;
        else safetyCc2 = 1;
    });
};
safetyroadCc2.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

safetyroadCc2.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (safetyCc2) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (safetyCc2 === 0) this.entity.setLocalPosition(-2.374,7.5,4.026);
    else this.entity.setLocalPosition(-2.374,-2.482,4.026);
    // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};