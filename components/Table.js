var Table = React.createClass({
  getInitialState:function(){
    var data = this.props.markers;
    return {
      data: data
    }
  },
  componentWillReceiveProps:function(nextProps){
    var update = [];
    nextProps.markers.map(function(item,index) {
      if (item.options.visible) {
        update.push(item);
      }
    });

    this.setState({data: update});
  },
  render: function(){
    console.log("Rerendering");
    console.log(this.state.data);
    var notes = this.state.data.map(function(note, index){
      return <li className="list-group-item" key={index}>
        #{note.type} # {note.size} #{note.title} #{note.latitude} #{note.longitude} </li>
    });
    return (
      <ul className="list-group">
        {notes}
      </ul>
    )
  }
});
