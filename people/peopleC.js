var PeopleC = pc.createScript('peoplec');
    var peoplec = 0; // 사람의 수
    var peoplecc = 0; // 사람의 유무
// Create an array of materials to cycle the model through
PeopleC.attributes.add("materials", {type: "asset", assetType: "material", array: true, title: "Materials"});

// initialize code called once per entity
PeopleC.prototype.initialize = function() {
    var self = this;
    
    
    // Change materials every second

    this.materialIndex = 0;
    function yes() {
        self.renewData();
        self.changeToNextMaterial();
    }
    setInterval(yes, 1000);
};

PeopleC.prototype.renewData = function(){
    var jsondata;
    this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
        var rawData = JSON.stringify(data, null, 4);
        jsondata = JSON.parse(rawData);
        peoplec = jsondata[4].results[0].series[0].values[0][5];
        if (peoplec > 0) peoplecc = 1;
        else peoplecc = 0;
    });
};
PeopleC.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };

PeopleC.prototype.changeToNextMaterial = function(dt) {
    // Get the next material asset in the array 
    this.materialIndex = (peoplecc) % this.materials.length;
    var material = this.materials[this.materialIndex];        
    if (peoplecc === 0)
    {
        this.entity.setLocalPosition(-0.692,50,3.351);
        this.entity.setLocalScale(0.5,0.3,0.5);
    }
    else
    {
        this.entity.setLocalScale(Math.sqrt(peoplec)*2*0.12,Math.sqrt(peoplec)*2*0.15,Math.sqrt(peoplec)*2*0.12);
        this.entity.setLocalPosition(1.013,peoplec*0.05,-3.613);
    }
        // Assign the material to all the mesh instances in the model
    var meshInstances1 = this.entity.model.meshInstances;
    for (var i = 0; i < meshInstances1.length; ++i) { 
        var mesh = meshInstances1[i];
        mesh.material = material.resource;
    }
};