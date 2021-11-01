var FireA2 = pc.createScript('fire-a2');
    var scaleA2;
// initialize code called once per entity
FireA2.prototype.initialize = function() {

 //   this.entity.setLocalScale(10,10,10);
    var self = this;
    function renewData() {
        self.loadData();
        self.setting();
    
    }
    setInterval(renewData, 1000);
};


// update code called every frame
FireA2.prototype.update = function(dt) {
        
};

FireA2.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };
    
FireA2.prototype.loadData = function() {
        var jsondata;
        this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
            var rawData = JSON.stringify(data, null, 4);
            jsondata = JSON.parse(rawData);
            var JsonDatas = jsondata[1].results[0].series[0].values[0][4];
//            var FlameVoltage = JsonDatas.replace("V","");
            console.log(jsondata);
            console.log(JsonDatas);
//            console.log(FlameVoltage);
            scaleA2 = parseFloat(JsonDatas) - 2.5;
            console.log(scaleA2);
    
           
        });
 /*       JsonDatas = jsondata[0].results[0].series[0].values[0];
        var rawFlameVoltage = JsonDatas[2];
        FlameVoltage = value.replace("V","");
        console.log(FlameVoltage);
  */      
    };
    
FireA2.prototype.setting = function() {
    if (scaleA2 <= 0) this.entity.setLocalScale(0,0,0);
    else this.entity.setLocalScale(scaleA2*7, scaleA2*7, scaleA2*7);
       // entity.setPosition(-1,scale*0.075,2.5);
        this.entity.setPosition(-3.51,0.33,0.481);
    };
// swap method called for script hot-reloading
// inherit your script state here
// FireA2.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/