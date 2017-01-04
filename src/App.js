import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo/Logo';
import Table from './components/Table/Table';
import Button from './components/Button/Button';
import Suggest from './components/Suggest/Suggest';
import Rating from './components/Rating/Rating';
import FormInput from './components/FormInput/FormInput';
import Form from './components/Form/Form';
import Actions from './components/Actions/Actions';
//import Dialog from './components/Dialog/Dialog';
import schema from './schema';
import fileData from './data';

/**
Component properties, for reference:
Actions: onAction (fn)
Button: href (string)
Dialog: header, confirmLabel, modal, onAction, hasCancel 
Form: fields.id, fields.label, fields.type, fields.options, initialData, readonly 
FormInput: type, id, options, defaultValue
Rating: defaultValue, readonly, max
Suggest: options
*/
var data = fileData;

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Logo className="App-logo"/>
          <h2>Welcome to React</h2>
        </div>
        <h1> Rolling Stone Top 100 Album (2012 edition) </h1>
        <p> Table is sortable by clicking header rows. </p>
        <p> Table is modifyiable with Actions buttons. </p>
        <span> <Actions onAction={type => alert(type)} /> </span>
      
      {/* Main Table */}
      <Table schema={schema} initialData={data} onDataChange={() => {}}/>
      
      {/* Underlying Components */ }
      <br/><br/><br/>
      <hr/>
      <h1> Underlying Components </h1>
      <hr/>

      <h1> Buttons <br/></h1>
      {/* onClick provides a callback function (ES6 arrow) that raises an alert on click*/}
      <div>Button with onClick: 
        <Button onClick={() => alert('ouch')}>Click me!</Button>
      </div>
      {/* Passing in an href prop return an <a> tag (link) rather than a <button> */}
      <div>Link Button:
        <Button href="http://reactjs.com">Follow me</Button>
      </div>
      <div>Custom class name: 
        {/* React requires use of className= rather than class= (reserved by HTML)*/}
        <Button className="custom">I do nothing</Button>
      </div>
    
      <hr/>
      <h1> Forms <br /></h1>
      <h2>Suggest</h2>
      <div>
        { /* options are what to select from in the drop-down */ }
        <Suggest options={['eenie', 'meenie', 'miney', 'mo']} />
      </div>

      <h2>Rating</h2>
      {/* defaultValue sets initial number of stars to illuminate; max sets total number of stars */}
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
      {/* Factory generates different forms based on type prop */}
      <table style={{margin: "0px auto"}}><tbody>
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
        initialData={ {rateme: 4, freetext: 'Hello'} } 
      />
      </div>

      <hr/>
      <h2>Actions</h2>
      <div>
        {/* Here we pass in the prop onAction={type}. The Actions component mutates this type
            to either info, edit, or delete. When onAction completes, this parent accesses the
            type variable and uses the value for an alert pop-up */}
        <Actions onAction={type => alert(type)} />
      </div>
    </div>
    );
  }
}

export default App;
