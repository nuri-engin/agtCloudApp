import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class EditU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      id: '',
      name: '',
      username: '',
      isactive: '',
      isconfirmed: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const user = doc.data();
        this.setState({
          key: doc.id,
          ud: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          isactive: user.isactive,
          isconfirmed: user.isconfirmed
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({user:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { id, name, surname, email, isactive, isconfirmed } = this.state;

    const updateRef = firebase.firestore().collection('users').doc(this.state.key);
    updateRef.set({
      id,
      name,
      surname,
      email,
      isactive, 
      isconfirmed
    }).then((docRef) => {
      this.setState({
        key: '',
        id: '',
        name: '',
        surname: '',
        email: '',
        isactive: '',
        isconfirmed: ''
      });
      this.props.history.push("/showuser/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT USER
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/showuser/${this.state.key}`} className="btn btn-primary">User List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="id">ID:</label>
                <input type="text" className="form-control" name="id" value={this.state.id} onChange={this.onChange} placeholder="ID" />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div className="form-group">
                <label htmlFor="isactive">Active:</label>
                <input type="checkbox" className="form-control" name="isactive" value={this.state.isactive} onChange={this.onChange} placeholder="Active" />
              </div>
              <div className="form-group">
                <label htmlFor="isconfirmed">Confirmed:</label>
                <input type="checkbox" className="form-control" name="isconfirmed" value={this.state.isconfirmed} onChange={this.onChange} placeholder="Confirmed" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditU;