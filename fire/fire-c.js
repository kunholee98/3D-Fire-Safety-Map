var FireC = pc.createScript('fire-c');
    var scaleC;
// initialize code called once per entity
FireC.prototype.initialize = function() {

//    this.entity.setLocalScale(10,10,10);
    var self = this;
    function renewData() {
        self.loadData();
        self.setting();
    
    }
    setInterval(renewData, 1000);
};


// update code called every frame
FireC.prototype.update = function(dt) {
        
};

FireC.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };
    
FireC.prototype.loadData = function() {
        var jsondata;
        this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
            var rawData = JSON.stringify(data, null, 4);
            jsondata = JSON.parse(rawData);
            var JsonDatas = jsondata[4].results[0].series[0].values[0][4];
//            var FlameVoltage = JsonDatas.replace("V","");
//            console.log(jsondata);
//            console.log(JsonDatas);
//            console.log(FlameVoltage);
            scaleC = parseFloat(JsonDatas)-2.5;
//            console.log(scaleC);
    
           
        });
 /*       JsonDatas = jsondata[0].results[0].series[0].values[0];
        var rawFlameVoltage = JsonDatas[2];
        FlameVoltage = value.replace("V","");
        console.log(FlameVoltage);
  */      
    };
    
FireC.prototype.setting = function() {
    this.entity.setLocalScale(3,3,3);
    //if (scaleC <=0) this.entity.setLocalScale(0,0,0);
    //else this.entity.setLocalScale(scaleC*7, scaleC*7, scaleC*7);
       // entity.setPosition(-1,scaleC*0.075,2.5);
        this.entity.setPosition(2.716,0.33,-1.85);
    };
// swap method called for script hot-reloading
// inherit your script state here
// FireC.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/