import React from 'react';
import axios from 'axios';
import { Button } from 'react-materialize';

class Geocoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geocodedLat: null,
      geocodedLong: null,
      title: '',
      description: '',
      address: '',
    };
    this.setGeocodeSearch = this.setGeocodeSearch.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  handleFormSubmit(submitEvent) {
    const { title, description, address } = this.state;
    submitEvent.preventDefault();
    console.log('You Clicked Submit', submitEvent);
    //this.setState({address2: this.state.htmlFormAddress});
    // const geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    // })
    // //geocoder.setInput('search', 'New orleans, LA, 70113');
    // console.log(geocoder.query);
    /*
    {                    api address               } / {         address in english      } .json ? {        access token       }
    http://api.mapbox.com/geocoding/v5/mapbox.places/2539 Columbus st new orleans la 70113.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g
    */
    axios.get(` http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g`)
      .then((geocodedResults) => {
        const latNlongArr = geocodedResults.data.features[0].center;
        this.setState({geocodedLong: latNlongArr[0], geocodedLat: latNlongArr[1]});
        const params = {
          title,
          description,
          lat: latNlongArr[1],
          long: latNlongArr[0],
        };
        axios.put('/events', params)
          .then((result) => { console.log(result); });
      });
    // console.log(title, description);
  }

  setGeocodeSearch(e) {
    this.setState({ address: e.target.value });
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleFormSubmit}>
        <input type="text" name="address" placeholder="address" value={this.state.address} onChange={this.setGeocodeSearch} />
        <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange} />
        <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
      
        <Button type="submit">
          Submit Event
        </Button>
      </form>
    );
  }
}

export default Geocoder;
