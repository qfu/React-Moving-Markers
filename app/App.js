
var App = React.createClass({
  getInitialState:function(){
    return {
      data: database
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
    this.inc = setInterval(this.updateInfo,500);
  },
  updateInfo: function(){
    console.log("times")
    var data = this.state.data;
    for(var i = 0; i < data.length/2; i++){
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
    var data = this.state.data;
    var updateData=[];
    var a = this.refs.title.refs.inf.getDOMNode().value;
    var b= this.refs.type.refs.inf.getDOMNode().value;
    var c = this.refs.size.refs.inf.getDOMNode().value;
    var filterA = (a=="All")? false:true;
    var filterB = (b=="All")? false:true;
    var filterC = (c=="All")? false:true;
    for(var i=0; i < data.length; i++) {
      if(filterA && !filterB && !filterC){
        data[i].options.visible = (data[i].title == a)? true:false;
      }
      else if(filterB && !filterA && !filterC){
        data[i].options.visible = (data[i].type == b)? true:false;
      }else if(filterC && !filterB && !filterA){
        data[i].options.visible = (data[i].size == c)? true:false;
      }else if(filterA && filterB && !filterC){
        data[i].options.visible = (data[i].title == a &&
                                    data[i].type == b)? true:false;
      }else if(filterA && filterC && !filterB){
        data[i].options.visible = (data[i].title == a &&
                                    data[i].size == c)? true:false;
      }else if(filterB && filterC && !filterA){
        data[i].options.visible = (data[i].type == b &&
                                    data[i].size == c)? true:false;
      }else if (filterA && filterB && filterC){
        data[i].options.visible = (data[i].title == a &&
                                    data[i].type == b &&
                                    data[i].size == c)? true:false;
      }
      else{
        data[i].options.visible = true;
      }
      updateData.push(data[i]);
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
        <Dropdown ref="type" filter="type" update={this.update} item={filter.type}/>
        <Dropdown ref="size" filter="size" update={this.update} item={filter.size}/>
        <Dropdown ref="title" filter="title" update={this.update} item={filter.title}/>

        <Table markers={data}/>


      </div>
    )
  }
});
