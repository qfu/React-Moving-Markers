var ExampleGoogleMap = React.createClass({
  getDefaultProps: function () {
    return {
      initialZoom: 15,
      mapCenterLat: 43.6425569,
      mapCenterLng: -79.4073126
    };
  },
  getInitialState:function() {
    return{
      should: true
    }
  },
  componentWillMount: function() {
    console.log("componentWillMount");

  },
  componentDidMount: function () {

    var mapOptions = {
        center: this.mapCenterLatLng(),
        zoom: this.props.initialZoom
      },
      map = new google.maps.Map(this.getDOMNode(), mapOptions);
    //this is the place to set the markers
    this.setState({map: map});
    this.setMarkers(map);
    console.log("componentDidMount");
  },
  mapCenterLatLng: function () {
    var props = this.props;
    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  },
  componentWillReceiveProps:function(nextProps){

    console.log('componentWillReceiveProps');

    console.log(nextProps.markers)

    this.setState({should:true});
    var currentMap = this.state.map;
    var currentMarkers = this.state.markers;
    var update = nextProps.markers;

    currentMarkers.forEach(function(marker){
      marker.setMap(null);
    });

    var array =[];
    update.forEach(function(marker) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(marker.latitude, marker.longitude),
        title: marker.title,
        map: currentMap
      });
      array.push(marker);
    });
    this.setState({markers: array});
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
  moveMarkers: function(){
    var markers = this.state.markers;
    setInterval(function(){
      for(var i = 0; i < markers.length; i++){
        var l = markers[i].getPosition().lat() + (Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
        var lo = markers[i].getPosition().lng()+ (Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
        markers[i].setPosition(new google.maps.LatLng(l, lo));
      }
    }, 100);

  },
  render: function () {
    console.log("MapComponentRendering");

    var style = {
      width: '300px',
      height: '300px'
    };

    return (
      <div className='map' style={style} >{this.props.children}</div>
    );
  }
});
