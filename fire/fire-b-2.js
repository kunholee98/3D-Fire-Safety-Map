var FireB2 = pc.createScript('fire-b2');
var scaleB2;
// initialize code called once per entity
FireB2.prototype.initialize = function() {
    
//    this.entity.setLocalScale(25,25,25);
    var self = this;
    function renewData() {
        self.loadData();
        self.setting();
    
    }
    setInterval(renewData, 1000);
};


// update code called every frame
FireB2.prototype.update = function(dt) {
        
};

FireB2.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };
    
FireB2.prototype.loadData = function() {
        var jsondata;
        this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
            var rawData = JSON.stringify(data, null, 4);
            jsondata = JSON.parse(rawData);
            var JsonDatas = jsondata[3].results[0].series[0].values[0][4];
//            var FlameVoltage = JsonDatas.replace("V","");
//            console.log(jsondata);
//            console.log(JsonDatas);
//           console.log(FlameVoltage);
            scaleB2 = parseFloat(JsonDatas) -2.5;
//            console.log(scaleB2);
    
           
        });
 /*       JsonDatas = jsondata[0].results[0].series[0].values[0];
        var rawFlameVoltage = JsonDatas[2];
        FlameVoltage = value.replace("V","");
        console.log(FlameVoltage);
  */      
    };
    
FireB2.prototype.setting = function() {
    if (scaleB2 <= 0) this.entity.setLocalScale(0,0,0);
    else this.entity.setLocalScale(scaleB2*7, scaleB2*7, scaleB2*7);
       // entity.setPosition(-1,scaleB2*0.075,2.5);
        this.entity.setPosition(-3.345,0.33,-2.579);
    };
// swap method called for script hot-reloading
// inherit your script state here
// FireB2.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/