import React, {Component} from "react";
import logo from "../logo.svg";
import "../App.css";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import db from "../Firebase";
import "react-datepicker/dist/react-datepicker.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date(`2018-09-10 00:00:00`)),
      from: '8wQyaKlM488Y9msL6PhF',
      to: '7HtcZQMyfvzWdxfe32MG',
    };
    this.handlePickDate = this.handlePickDate.bind(this);
    this.handleSelectFrom = this.handleSelectFrom.bind(this);
    this.handleSelectTo = this.handleSelectTo.bind(this);
    this.searchBus = this.searchBus.bind(this);
    this.CreateData = this.CreateData.bind(this);
  }

  componentDidMount() {
    db.collection("Places")
      .get()
      .then((querySnapshot) => {
        let places = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            places.push({id: doc.id, name: doc.data().Name})
          }
        });
        this.props.dispatch({type: "GET_PLACES", data: places})
      });
  }

  async searchBus() {
    const datePicker = moment(this.state.startDate).format("YYYY-MM-DD");
    const startDate = new Date(`${datePicker} 00:00:00`);
    const endDate = new Date(`${datePicker} 23:59:59`);
    const routes = await db.collection("Bus_routes")
      .where("Date", ">=", startDate)
      .where("Date", "<=", endDate)
      .where("From", "==", this.state.from)
      .where("To", "==", this.state.to)
      .get().catch(function (error) {
        console.log("Error getting document:", error);
      });
    const busesData = [];
    const promisesBus = [];
    routes.forEach(route => {
      let busID = route.data().BusID;
      if (busID) {
        const bus = db.collection("Bus").doc(busID).get().catch(function (error) {
          console.log("Error getting document:", error);
        });
        promisesBus.push(bus);
        busesData.push({
          routeID: route.id,
          routeData: route.data(),
        })
      }
    });

    const busData = await Promise.all(promisesBus);
    busData.forEach((bus, index)=>{
      busesData[index].busData = bus.data();
    });

    this.props.dispatch({type: "GET_BUSES", data: busesData });
  }

  handleSelectFrom(e) {
    this.setState({
      from: e.target.value
    })
  }

  handleSelectTo(e) {
    this.setState({
      to: e.target.value
    })
  }

  handlePickDate(date) {
    this.setState({
      startDate: date
    });
  }

  CreateData() {
    let routes = db.collection("Bus_routes");
    routes.doc().set({
      BusID: '5a4ieY8WEbQWfwWYAdxz',
      Date: new Date('2018-09-10 21:30'),
      From: "8wQyaKlM488Y9msL6PhF",
      To: "7HtcZQMyfvzWdxfe32MG",
      Price: 500000
    });
  }

  number_format(number, decimals, dec_point, thousands_sep) {
    let n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    let d = dec_point == undefined ? "," : dec_point;
    let t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    let i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Your login status <code>{this.props.loginStatus ? "Logged in" : "Not logged in"}</code>
        </p>
        From :
        <select onChange={this.handleSelectFrom} value={this.state.from}>
          <option value="">Select from</option>
          {this.props.places.map((place, index) =>
            <option key={index.toString()} value={place.id}>{place.name}</option>)}
        </select>
        To :
        <select onChange={this.handleSelectTo} value={this.state.to}>
          <option value="">Select to</option>
          {this.props.places.map((place, index) =>
            <option key={index.toString()} value={place.id}>{place.name}</option>)}
        </select>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handlePickDate}
        />
        <button onClick={this.searchBus}>
          Find Bus
        </button>
        {/*<button onClick={this.CreateData}>*/}
        {/*Create dump data*/}
        {/*</button>*/}
        <ul>
          {this.props.buses &&
          this.props.buses.map((bus, index) =>
            <li key={index.toString()}>
              <img src={bus.busData.Images[0]} alt=""/>
              <p>Name: {bus.busData.Name}</p>
              <p>Time: {moment.unix(bus.routeData.Date.seconds).format("hh:mm")}</p>
              <p>Price: {this.number_format(bus.routeData.Price, 0, ",", ".")} đ</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    places: state.search.places,
    buses: state.search.buses,
  }
}
export default connect(mapStateToProps)(Search);