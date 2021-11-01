var FireTest = pc.createScript('fireTest');

var JsonDatas;
var FlameVoltage;
var scale;
var position;
var COvalue;
var COdensity;
var People;
var temperature;
var temp;
FireTest.prototype.initialize = function() {
    this.loadJsonFromRemote("https://tower2.nm.gist.ac.kr:1337/", function (data) {
        var el = JSON.stringify(data, null, 4);
        JsonDatas = JSON.parse(el);
    });
    temp = JsonDatas[0].results[0].series[0].values[0][4];
    console.log(FlameVoltage);
    for (var i = 0; temp[i] != "V"; i++);
    temp[i] = '\0';
    scale = (FlameVoltage+1) * 4;
    this.entity.setLocalScale(scale,scale,scale);
    this.entity.setPosition(-1,scale*0.075,2.5);
};

FireTest.prototype.setting = function() {
    this.entity.setLocalScale(scale,scale,scale);
    this.entity.setPosition(-1,scale*0.075,2.5);
};

FireTest.prototype.loadJsonFromRemote = function (url, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener("load", function () {
        callback(JSON.parse(this.response));
    });
    xhr.open("GET", url);
    xhr.send();
};