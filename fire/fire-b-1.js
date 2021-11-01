var FireB1 = pc.createScript('fire-b1');
    var scaleB1;
// initialize code called once per entity
FireB1.prototype.initialize = function() {

//    this.entity.setLocalScale(20,20,20);
    var self = this;
    function renewData() {
        self.loadData();
        self.setting();
    
    }
    setInterval(renewData, 1000);
};


// update code called every frame
FireB1.prototype.update = function(dt) {
        
};

FireB1.prototype.openurl = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
        });
        xhr.open("GET", url);
        xhr.send();
    };
    
FireB1.prototype.loadData = function() {
        var jsondata;
        this.openurl("https://tower2.nm.gist.ac.kr:1337/", function(data) {
            var rawData = JSON.stringify(data, null, 4);
            jsondata = JSON.parse(rawData);
            var JsonDatas = jsondata[2].results[0].series[0].values[0][4];
  //          var FlameVoltage = JsonDatas.replace("V","");
  //          console.log(jsondata);
  //          console.log(JsonDatas);
  //          console.log(FlameVoltage);
           scaleB1 = parseFloat(JsonDatas) - 2.5;
  //          console.log(scaleB1);
    
           
        });
 /*       JsonDatas = jsondata[0].results[0].series[0].values[0];
        var rawFlameVoltage = JsonDatas[2];
        FlameVoltage = value.replace("V","");
        console.log(FlameVoltage);
  */      
    };
    
FireB1.prototype.setting = function() {
    if (scaleB1 <= 0) this.entity.setLocalScale(0,0,0);
    else this.entity.setLocalScale(scaleB1*7, scaleB1*7, scaleB1*7);
       // entity.setPosition(-1,scaleB1*0.075,2.5);
        this.entity.setPosition(2.976,0.33,2.693);
    };
// swap method called for script hot-reloading
// inherit your script state here
// FireB1.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/