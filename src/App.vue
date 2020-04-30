<template>
  <div id="app">
    <header>
      <input
        type="text"
        v-model="searchboxVal"
        @keypress="setQuery"
        autocomplete="off"
        class="search-box"
        placeholder="请输入城市名称..."
      />
    </header>
    <main>
      <section class="location">
        <div class="city">{{ citynm }}</div>
        <div class="date">{{ days }}</div>
      </section>
      <div class="current">
        <div class="temp">{{ temperature }}</div>
        <div class="weather">{{ weather }}</div>
        <div class="hi-low">{{ hilowVal }}</div>
      </div>
    </main>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "App",
  data() {
    return {
      searchboxVal: "北京",
      citynm: "",
      days: "",
      temperature: "",
      weather: "",
      hilowVal: ""
      
      
    };
  },
  props: {
    msg: String,
  },
  created:function (){
    this.initQuery()
  },
  methods: {
    initQuery:function(){
      let that = this 
        let weaidVal = this.searchboxVal
          $.ajax({
            type:'post',
            url:'http://api.k780.com/?app=weather.today',
            data:{weaid:weaidVal,appkey:'50902',sign:'30bbc10ea1787756f4b0d44b929bf30e'},
            success:function(data){
              if(data.success==1){
                let weather=data.result
                that.citynm =weather.citynm;
                that.days = weather.days;
                that.temperature = weather.temperature_curr;
                that.weather = weather.weather;
                that.hilowVal = Math.round(weather.temp_low)+'°c / '+Math.round(weather.temp_high)+'°c';

              }
                console.log(data);
            },
            error:function(){}
        })
    },
    setQuery: function(evt) {
      if (evt.keyCode == 13) {
        let that = this
        // let weaidVal = this.searchboxVal
          $.ajax({
            type:'post',
            url:'http://api.k780.com/?app=weather.today',
            data:{weaid:this.searchboxVal,appkey:'50902',sign:'30bbc10ea1787756f4b0d44b929bf30e'},
            success:function(data){
              if(data.success==1){
                let weather=data.result
                that.citynm =weather.citynm;
                that.days = weather.days;
                that.temperature = weather.temperature_curr;
                that.weather = weather.weather;
                that.hilowVal = Math.round(weather.temp_low)+'°c / '+Math.round(weather.temp_high)+'°c';

              }
                console.log(data);
            },
            error:function(){}
        })
       
      }
    }
  }
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
  background-image: url("./assets/bg.jpg");
  background-size: cover;
  background-position: top center;
}

.app-wrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.6)
  );
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 15px 15px;
}

header input {
  width: 100%;
  max-width: 280px;
  padding: 10px 15px;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 16px 0px 16px 0px;
  border-bottom: 3px solid #df8e00;

  color: #313131;
  font-size: 20px;
  font-weight: 300;
  transition: 0.2s ease-out;
}

header input:focus {
  background-color: rgba(255, 255, 255, 0.6);
}

main {
  flex: 1 1 100%;
  padding: 25px 25px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.location .city {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 5px;
}

.location .date {
  color: #fff;
  font-size: 16px;
}

.current .temp {
  color: #fff;
  font-size: 102px;
  font-weight: 900;
  margin: 30px 0px;
  text-shadow: 2px 10px rgba(0, 0, 0, 0.6);
}

.current .temp span {
  font-weight: 500;
}

.current .weather {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  font-style: italic;
  margin-bottom: 15px;
  text-shadow: 0px 3px rgba(0, 0, 0, 0.4);
}

.current .hi-low {
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  text-shadow: 0px 4px rgba(0, 0, 0, 0.4);
}
</style>
