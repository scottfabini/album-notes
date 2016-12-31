import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo/Logo';
import Excel from './components/Excel2/Excel';
import Button from './components/Button/Button';
import Suggest from './components/Suggest/Suggest';
import Rating from './components/Rating/Rating';
import FormInput from './components/FormInput/FormInput';
import Form from './components/Form/Form';
import Actions from './components/Actions/Actions';
import Dialog from './components/Dialog/Dialog';
import schema from './components/Excel2/schema';
import fileData from './components/Excel2/data';

/**
Component properties:
Actions: onAction (fn)
Button: href (string)
Dialog: header, confirmLabel, modal, onAction, hasCancel 
Form: fields.id, fields.label, fields.type, fields.options, initialData, readonly 
FormInput: type, id, options, defaultValue
Rating: defaultValue, readonly, max
Suggest: options
*/
localStorage.clear();
var data = fileData;

var headers = localStorage.getItem('headers');
//var data = localStorage.getItem('data');
/*
let data = JSON.parse(localStorage.getItem('data'));

if (!data) {
  data = {};
  schema.forEach(item => data[item.id] = item.sample);
  data = [data];
  console.log(data);
}
*/

if (!headers) {
  headers = ['Album', 'Artist', 'Year', 'Rating', 'Comments'];
  //data = [['Test', 'Test Artist', '2015', '3', 'bleh']];
}

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Logo />
          <h2>Welcome to React</h2>
        </div>
        <h1> Excel <br/></h1>
    {/* Excel, with headers and data from local arrays*/}
    <Excel schema={schema} initialData={data} />
    
    <h1> Buttons <br/></h1>
    <div>Button with onClick: 
    <Button onClick={() => alert('ouch')}>Click me!</Button>
    </div>
    <div>Link Button:
    <Button href="http://reactjs.com">Follow me</Button>
    </div>
    <div>Custom class name: 
    <Button className="custom">I do nothing</Button>
    </div>

    <h1> Forms <br /></h1>
    <h2>Suggest</h2>
    <div>
    { /* options are what to select from in the drop-down */ }
    <Suggest options={['eenie', 'meenie', 'miney', 'mo']} />
    </div>

    <h2>Rating</h2>
    <div>No initial value:
    <Rating />
    </div>
    <div>Initial value 4: 
    <Rating defaultValue={4}/>
    </div>
    <div>Take it to 11: 
    <Rating max={11}/>
    </div>
    <div>Read only: 
    <Rating readonly={true} defaultValue={3} />
    </div>

    <h2>Form Input Factory</h2>
    <table><tbody>
      <tr>
        <td>Vanilla input</td>
        <td><FormInput /></td>
      </tr>
      <tr>
        <td>Prefilled</td>
        <td><FormInput defaultValue="it's like a default" /></td>
      </tr>
      <tr>
        <td>Rating</td>
        <td><FormInput type="rating" defaultValue={4} /></td>
      </tr>
      <tr>
        <td>Suggest</td>
        <td>
          <FormInput
          type="suggest" defaultValue="green" options={['red', 'green', 'blue']}
          />
        </td>
      </tr>
      <tr>
        <td>Vanilla textarea</td>
        <td><FormInput type="text" /></td>
      </tr>
    </tbody></table>
    
    <h2>Form</h2>
    <div>
    <Form 
    fields={[
    {label: 'Rating', type: 'rating', id: 'rateme'},
    {label: 'Greetings', id: 'freetext'}
    ]}
    initialData={ {rateme: 4, freetext: 'Hello'} } />
    </div>

    <h2>Actions</h2>
    <div>
      {/* Here we pass in the prop onAction={type}. The Actions component mutates this type
          to either info, edit, or delete. When onAction completes, this parent accesses the
          type variable and uses the value for an alert pop-up */}
      <Actions onAction={type => alert(type)} />
      }
    </div>

    <h1>Dialog</h1>
    <div>
      <Dialog
        header="Out of the box example"
        onAction={type => alert(type)}
      >
      Hello, dialog!
      </Dialog>
      <Dialog 
        header="No cancel, custom button"
        hasCancel={false}
        confirmLabel="Whatever"
        onAction={type => alert(type)}
      >
      Anything goes here, see:
      <Button>A button</Button>
      </Dialog>
      
    </div>
      </div>
    );
  }
}

export default App;
