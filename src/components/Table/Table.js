import Actions from '../Actions/Actions';
import Dialog from '../Dialog/Dialog';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Rating from '../Rating/Rating';
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
require('./style.css');

/*
  Each Table row consists of:
    * A header row, where each column name can be clicked to sort the column.
    * An array of table rows consisting of:
      * Data rendered as defined in <root>/schema.js,
      * A set of Action buttons for info, editing, and deleting rows
*/
class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
      dialog: null
    };
  }

  /* 
    componentWillReceiveProps allows a component to receive updated props from parent component 
    It is used here to update the state of the Table data.
  */
  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.initialData});
  }

  render() {
    return (
      <div className="Table">
        {this._renderTable()}
        {this._renderDialog()}
      </div>
    );
  }

  _renderTable() {
    return (
      <table>
        <thead>
          <tr>
            {
              this.props.schema.map(item => {
                if (!item.show) {
                  return null;
                }

                let title = item.label;
                if (this.state.sortby === item.id) {
                  title += this.state.descending ? '\u2191' : '\u2193';
                }

                return (
                  <th
                    className={`schema-${item.id}`} // Note the ES6 template string `... ${}`
                    key={item.id}
                    onClick={this._sort.bind(this, item.id)} // bind _sort to the clicked item
                  >
                    {title}
                  </th>
                );
              }, this)
            }
            <th className="TableNotSortable">Actions</th> {/* TableNotSortable prevents Actions from being sorted with other table elements */}
          </tr>
        </thead>
        <tbody onDoubleClick={this._showEditor.bind(this)}>
          {this.state.data.map((row, rowidx) => { // render body rows according to the schema
            return (
              <tr key={rowidx}>{
                Object.keys(row).map((cell, idx) => {
                  const schema = this.props.schema[idx];
                  if (!schema || !schema.show) {
                    return null;
                  }
                  const isRating = schema.type === 'rating';
                  const edit = this.state.edit;
                  let content = row[cell];
                  if (!isRating && edit && edit.row === rowidx && edit.key === schema.id) {
                    content = (
                      <form onSubmit={this._save.bind(this)}>
                        <FormInput ref="input" {...schema} defaultValue={content}/>
                      </form>
                    );
                  } else if (isRating) {
                    content = <Rating readonly={true} defaultValue={Number(content)}/>;
                  }
                  return (
                    <td 
                      className={classNames({
                        [`schema-${schema.id}`]: true,
                        'TableEditable': !isRating,
                        'TableDataLeft': schema.align === 'left',
                        'TableDataRight': schema.align === 'right',
                        'TableDataCenter': schema.align !== 'left' && schema.align !== 'right',
                      })} 
                      key={idx}
                      data-row={rowidx}
                      data-key={schema.id}
                    >
                      {content}
                    </td>
                  );
                }, this)}
                <td className="TableDataCenter">
                  <Actions onAction={this._actionClick.bind(this, rowidx)}/>
                </td>
              </tr>
            );
          }, this)}
        </tbody>
      </table>
    );
  }

  _sort(key) {
    let data = Array.from(this.state.data);
    var column = key;
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
  }

  _showEditor(e) {
    this.setState({edit: {
      row: parseInt(e.target.dataset.row, 10), 
      cell: e.target.dataset.key
    }});
  }

  _save(e) {
    e.preventDefault();
    const value = this.refs.input.getValue();
    let data = Array.from(this.state.data);
    data[this.state.edit.row][this.state.edit.cell] = value;
    this.setState({
      edit: null, // done editing
      data: data
    });
    this._fireDataChange(data);
  }

  _deleteConfirmationClick(action) {
    if (action === 'dismiss') {
      this._closeDialog();
      return;
    }
    let data = Array.from(this.state.data);
    data.splice(this.state.dialog.idx, 1); // splice(idx,1) removes 1 item at idx from array
    this.setState({
      dialog: null,
      data: data
    });
    this._fireDataChange(data);
  }

  _closeDialog() {
    this.setState({dialog: null});
  }

  _renderDialog() {
    if (!this.state.dialog) {
      return null;
    }
    switch (this.state.dialog.type) {
      case 'delete':
        return this._renderDeleteDialog();
      case 'info':
        return this._renderFormDialog(true);
      case 'edit':
        return this._renderFormDialog();
      default:
        throw Error(`Unexpected dialog type ${this.state.dialog.type}`);
    }
  }

  _renderDeleteDialog() {
    const first = this.state.data[this.state.dialog.idx];
    const nameguess = first[Object.keys(first)[1]];
    return (
      <Dialog
        modal={true}
        header="Confirm delete"
        confirmLabel="Delete"
        onAction={this._deleteConfirmationClick.bind(this)}
      > {`Are you sure you want to delete "${nameguess}"?`}
      </Dialog>
    );
  }
  _renderFormDialog(readonly) {
    return (
      <Dialog
        modal={true}
        header={readonly ? 'Item info' : 'Edit item'}
        confirmLabel={readonly ? 'ok' : 'Save'}
        hasCancel={!readonly}
        onAction={this._saveDataDialog.bind(this)}
      >
        <Form
          ref="form"
          fields={this.props.schema}
          initialData={this.state.data[this.state.dialog.idx]}
          readonly={readonly}
        />
      </Dialog>
    );
  }

  _saveDataDialog(action) {
    if (action === 'dismiss') {
      this._closeDialog();
      return;
    }
    let data = Array.from(this.state.data);
    data[this.state.dialog.idx] = this.refs.form.getData();
    this.setState({dialog: null, data: data});
    this._fireDataChange(data);
  }

  _fireDataChange(data) {
    this.props.onDataChange(data);
  }

  _actionClick(rowidx, action) {
    this.setState({dialog: {type: action, idx: rowidx}});
  }

}

Table.propTypes = {
  schema: PropTypes.arrayOf(
    PropTypes.object),
  initialData: PropTypes.arrayOf(
    PropTypes.object),
  onDataChange: PropTypes.func
};

export default Table;