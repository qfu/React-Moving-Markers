var ExampleGoogleMap = React.createClass({
  getDefaultProps: function () {
    return {
      initialZoom: 15,
      mapCenterLat: 43.6425569,
      mapCenterLng: -79.4073126
    };
  },
  getInitialState:function() {
    return{should: true}
  },
  componentWillMount: function() {
    console.log("componentWillMount");
  },
  componentDidMount: function () {
    console.log("componentDidMount");
    var mapOptions = {
        center: this.mapCenterLatLng(),
        zoom: this.props.initialZoom
      },
      map = new google.maps.Map(this.getDOMNode(), mapOptions);
    //this is the place to set the markers
    this.setState({map: map});
    this.setMarkers(map);
  },
  mapCenterLatLng: function () {
    var props = this.props;
    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  },
  componentWillReceiveProps:function(nextProps){
    //handle the incremental rendering
    var nextMarkers = nextProps.markers;
    var markers = this.state.markers;
    for(var i = 0; i < markers.length;i++){
      if(nextMarkers[i].longitude == markers[i].longitude &&
        nextMarkers[i].latitude == markers[i].latitude){
          //the location is the same
          //the incremental rendering will happen if the visibility changes
          if(nextMarkers[i].options.visible != markers[i].visible){
            markers[i].setVisible(nextMarkers[i].options.visible);
          }
      }else{
        //the location changes, location rendering must be executed.
        markers[i].setPosition(new google.maps.LatLng(nextMarkers[i].latitude, nextMarkers[i].longitude));
        if(nextMarkers[i].options.visible != markers[i].visible){
           markers[i].setVisible(nextMarkers[i].options.visible);
        }
      }
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    console.log("MapShouldUpdate");
    return this.state.should;
  },
  componentDidUpdate: function () {
    console.log("componentDidUpdate");
    console.log(this.state.map);
  },
  setMarkers: function(map){
    var markers =[];
    this.props.markers.forEach(function(marker) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(marker.latitude, marker.longitude),
        title: marker.title,
        map: map
      });
      markers.push(marker);
    });
    console.log("setMarkers");
    this.setState({markers: markers});
  },
  render: function () {
    console.log("MapComponentRendering");
    var style = {
      width: '300px',
      height: '300px'
    };
    return (
      <div className='map' style={style} ></div>
    );
  }
});
