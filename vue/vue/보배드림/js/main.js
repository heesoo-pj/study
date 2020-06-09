var app = new Vue ({
  el:'#main',
  data : mainData(),
  created:function(){
    this.doShuffle();
  },
  methods:{
    doShuffle: function(){
      this.mainSpeciaRendomlData = [];

      // var data00 = (window.Math.random() * 100) % this.mainSpecialData[0].length 
      //     data00 = window.Math.floor(data00)
      // var data01 = (window.Math.random() * 100) % this.mainSpecialData[1].length 
      //     data01 = window.Math.floor(data01)
      // var data02 = (window.Math.random() * 100) % this.mainSpecialData[2].length 
      //     data02 = window.Math.floor(data02)         

      // this.mainSpeciaRendomlData.push(this.mainSpecialData[0][data00]);
      // this.mainSpeciaRendomlData.push(this.mainSpecialData[1][data01]);
      // this.mainSpeciaRendomlData.push(this.mainSpecialData[2][data02]);

      for(var i=0; i<=3; i++){
        var data = (window.Math.random() * 100) % this.mainSpecialData[i].length;
            data = window.Math.floor(data);
            console.log(data)
            this.mainSpeciaRendomlData.push(this.mainSpecialData[i][data]);
      }
    },
  }
})

