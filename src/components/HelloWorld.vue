<template>
  <div class="app-wrap">
    <header>
      <input
        type="text"
        v-model="searchboxVal"
        @keypress="setQuery"
        autocomplete="off"
        class="search-box"
        placeholder="Search for a city..."
      />
    </header>
    <main>
      <section class="location">
        <div class="city">Northampton, GB{{ cityname }}</div>
        <div class="date">Thursday 10 January 2020{{dataVal}}</div>
      </section>
      <div class="current">
        <div class="temp">15{{tempVal}}</div>
        <div class="weather">{{weatherVal}}</div>
        <div class="hi-low">{{hilowVal}}</div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      key: "afaf9f8d48cff6cafd32e23220bcfdbf",
      base: "https://api.openweathermap.org/data/2.5/",
      searchboxVal: "",
      cityname: "",
      dataVal:"",
      tempVal:"",
      weatherVal:"",
      hilowVal:""
    };
  },
  props: {
    msg: String,
  },
  methods: {
    setQuery: (evt) => {
      var that=this
      if (evt.keyCode == 13) {
        that.getResults(that.searchboxVal);
      }
    },
    getResults: () => {
      fetch(
        this.base +
          "weather" +
          "?q=" +
          this.query +
          "&units=metric" +
          "&APPID=" +
          this.key
      )
        .then((weather) => {
          return weather.json();
        })
        .then(this.displayResults);
    },
    displayResults: (weather) => {
      this.cityname = `${weather.name}, ${weather.sys.country}`;
      let now = new Date();
      this.dataVal = this.dateBuilder(now);
      this.tempVal = `${Math.round(weather.main.temp)}<span>°c</span>`;
      this.weatherVal = weather.weather[0].main;
      this.hilowVal= `${Math.round(weather.main.temp_min)}°c / ${Math.round(
        weather.main.temp_max
      )}°c`;
    },
    dateBuilder: (d) => {
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
  background-image: url("../assets/bg.jpg");
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
