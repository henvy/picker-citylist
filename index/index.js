let citys = require("../lib/citys.js");
Page({
  data: {
    Level: {
      Province: [],
      City: [],
      Area: [],
    },
    CitysList:[],
    CitysIndex: [1, 1, 1],
  },
  onLoad: function () {
    let self = this;
    let _Province = citys.filter(p => p.Level == 1);
    let _City = citys.filter(p => p.Level == 2);
    let _Area = citys.filter(p => p.Level == 3);
    self.setData({
      Level: {
        Province: _Province,
        City: _City,
        Area: _Area,
      },
      CitysList: [_Province, _City, _Area],
    })
    console.log(self.data);
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  bindMultiPickerColumnChange: function (e) {
    let self = this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    console.log(self.data.CitysList[e.detail.column][e.detail.value]);
    let _data = {
      CitysList: self.data.CitysList,
      CitysIndex: self.data.CitysIndex,
    };
    let provinceId = 0;
    let cityId = 0;
    let city = [];
    let area = [];
    switch (e.detail.column) {
      case 0:
        self.setData({
          "CitysList[2]": []
        });
        provinceId = self.data.CitysList[0][e.detail.value].Id;
        city = self.data.Level.City.filter(p => p.ParentId == provinceId);
        cityId = city[0].Id;
        area = self.data.Level.Area.filter(p => p.ParentId == cityId);
        _data.CitysList[1] = city;
        _data.CitysList[2] = area;
        _data.CitysIndex[0] = e.detail.value;
        _data.CitysIndex[1] = 0;
        _data.CitysIndex[2] = 0;
        break;
      case 1:
        self.setData({
          "CitysList[2]": []
        });
        cityId = self.data.CitysList[1][e.detail.value].Id;
        area = self.data.Level.Area.filter(p => p.ParentId == cityId);
        _data.CitysList[2] = area;
        _data.CitysIndex[1] = e.detail.value;
        _data.CitysIndex[2] = 0;
        break;
      case 2:
        _data.CitysIndex[2] = e.detail.value;
        break;
      default:
        console.log(111111111111111111111111111111111111111111);
    }
    this.setData(_data);
  },
})