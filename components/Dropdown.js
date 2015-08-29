var Dropdown = React.createClass({
  render: function(){
    var items = this.props.item.map(function(item){
      return <option value={item}>{item}</option>;
    });
    return (
      <div>
        <label>{this.props.filter}</label>
        <select ref="inf" onChange={this.props.update}>
          <option value="All">All</option>
          {items}
        </select>
      </div>
    );
  }
});
