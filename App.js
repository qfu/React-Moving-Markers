
var App = React.createClass({
  getInitialState:function(){
    return {
      title:"marker",
      size:"10",
      type:"JinBei",
      data:[
        {
          'title' : "marker1",
          'size':"9" ,
          'type':"BMW" ,
          'latitude' : "39.9",
          'longitude' : "116.3"
        },
        {
          'title' : "marker2",
          'size':"10",
          'type':"Audi",
          'latitude' : "39.8",
          'longitude' : "116.4"
        },
        {
          'title' : "marker3",
          'size': "11",
          'type': "Mercedes",
          'latitude' : "39.7",
          'longitude' : "116.2"
        },
        {
          'title' : "marker1",
          'size': "9",
          'type': "Mercedes",
          'latitude' : "39.3",
          'longitude' : "116.7"
        },
        {
          'title' : "marker1",
          'size': "9",
          'type': "Mercedes",
          'latitude' : "39.32",
          'longitude' : "116.71"
        }
      ]
    }
  },
  componentWillReceiveProps:function(nextProps){
    console.log("AppReceiveProps")
  },
  componentWillMount:function(){
    console.log("AppWillMount");
  },
  componentDidMount:function(){
    console.log("AppDidMount");
    this.inc = setInterval(this.updateInfo,100);
  },
  componentWillUnmount:function(){
    clearInterval(this.inc);
  },
  updateInfo: function(){
    console.log("times")
    var data = this.state.data;

    for(var i = 0; i < data.length; i++){
      data[i].latitude  =parseInt(data[i].latitude)+(Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
      data[i].longitude =parseInt(data[i].longitude)+(Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
    }

    this.setState({data:data});
  },
  componentDidUpdate: function () {
    console.log("AppDidUpdate");
  },
  update: function(e){
    console.log("AppUpdate");
    var updateData=[];
    var a = this.refs.title.getDOMNode().value;
    var b= this.refs.type.getDOMNode().value;
    var c = this.refs.size.getDOMNode().value;

    for(var i=0; i < data.length; i++) {
      if (data[i].title != a ||
        data[i].size != c ||
        data[i].type != b) {
      } else {
        updateData.push(data[i]);
      }
    }
    this.setState({data:updateData});
  },
  render:function(){
    console.log("AppRendering");
    console.log(this.state.data);
    var data = this.state.data;
    return (
      <div>
        <ExampleGoogleMap ref="Beijing" mapCenterLat={39.9167} mapCenterLng={116.3833} initialZoom={4} markers={data}>
        </ExampleGoogleMap>
        <Label txt="Type" />
        <select ref="type" onChange={this.update}>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes">Mercedes</option>
        </select>
        <br/>
        <Label txt="Size" />
        <select ref="size" onChange={this.update}>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>
        <br/>
        <Label txt="Title" />
        <select ref="title" onChange={this.update}>
          <option value="marker1">marker1</option>
          <option value="marker2">marker2</option>
          <option value="marker3">marker3</option>
        </select>
        <Table markers={data}/>
      </div>
    )
  }
});
