import React from 'react';
require('./style.css');
//import ReactDOM from 'react-dom';

var Excel = React.createClass({
  propTypes: {
    headers: React.PropTypes.array,
    initialData: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {
      headers: ['Book', 'Author', 'Language', 'Published', 'Sales'],
      initialData: [
        [ 'The Lord of the Rings', 'J.R.R. Tolkien',
          'English', '1954-1955', '150 million'
        ],
        [ 'Le Petit Prince (The Little Prince)', 'Antoine de Saint-Exupery', 
          'French', '1943', '140 million'
        ]
      ]
    };
  },
  getInitialState: function() {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null, // {row: index, cell: index}
      search: false,
      _preSearchData: null
    };
  },
  render: function(){
    return (
      <div className="Excel">
        {this._renderToolbar()}
        {this._renderTable()}
      </div>
    );
  },
  _renderTable: function() {
    return (
      React.DOM.table(null,
        React.DOM.thead({onClick: this._sort},
          React.DOM.tr(null,
            // Convert headers array to array of <th> elements
            this.props.headers.map(function(title, idx) {
              if (this.state.sortby === idx) {
                title += this.state.descending ? '\u2191' : ' \u2193';
              }
              return React.DOM.th({key: title}, title);
            }, this)
          )
        ),
        React.DOM.tbody({onDoubleClick: this._showEditor},
          this._renderSearch(),
          // Convert state data array to array of <tr> rows
          this.state.data.map(function(row, rowidx) {
            return (
              React.DOM.tr({key: rowidx}, 
                // Convert row array to array of <td> elements
                row.map(function(cell, idx) {
                  var content = cell;
                  var edit = this.state.edit;
                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    content = React.DOM.form({onSubmit: this._save},
                      React.DOM.input({
                        type: 'text',
                        defaultValue: content
                      })
                    );
                  }
                  return React.DOM.td({
                    key: idx,
                    'data-row': rowidx
                  }, content);
                }, this)
              )
            );
          }, this)
          )
        )
    );
  },
  _renderToolbar: function() {
    return(
      React.DOM.button(
        {
          onClick: this._toggleSearch,
          className: 'toolbar'
        }, 
        'search'
    ));
  },
  _sort: function(e) {
    var column = e.target.cellIndex;
    // copy the data. Array.slice returns a subarray (a single row of the table)
    var data = this.state.data.slice();
    var descending = this.state.sortby === column && !this.state.descending;
    // Array.sort takes a comparison function that takes two arguments
    data.sort(function(a, b) {
      return descending
      ? (a[column] < b[column] ? 1 : -1)
      : (a[column] > b[column] ? 1 : -1);
    });
    // update the state with the sorted data
    this.setState({
      data: data,
      sortby: column,
      descending: descending
    });
  },
  _showEditor: function(e) {
    this.setState({edit: {
      row: parseInt(e.target.dataset.row, 10), 
      cell: e.target.cellIndex
    }});
  },
  _save: function(e) {
    e.preventDefault();
    var input = e.target.firstChild;
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null, // done editing
      data: data
    });
  },
  _renderSearch: function() {
    if (!this.state.search) {
      return null;
    }
    return (
      React.DOM.tr({onChange: this._search},
        this.props.headers.map(function(_ignore, idx) {
          return React.DOM.td({key: idx},
            React.DOM.input({
              type: 'text',
              'data-idx': idx
            }));
        }))
    );
  },
  _search: function(e) {
    var needle = e.target.value.toLowerCase();
    if (!needle) { 
      this.setState({data: this._preSearchData});
      return;
    }
    var idx = e.target.dataset.idx;
    var searchdata = this._preSearchData.filter(function(row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.setState({data: searchdata});
  },
  _toggleSearch: function() {
    if (this.state.search) {
      this.setState({
        data: this._preSearchData,
        search: false
      });
      this._preSearchData = null;
    } else {
      this._preSearchData = this.state.data;
      this.setState({search: true});
    }
  }
});

export default Excel;