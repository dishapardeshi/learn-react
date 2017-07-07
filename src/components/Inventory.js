import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import {base} from '../base';
import { AddFishForm } from './AddFishForm';

export class Inventory extends Component {

  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user, error) => {
      if(user){
        this.authHandler({user});
      }
    });
  }

  handleChange(e, key){
    const fish = this.props.fishes[key];
    console.log(e.target.name, e.target.value);
    const updatedFish = {
      ...fish,
      [e.target.name] : e.target.value
    }
    console.log(updatedFish);
    this.props.updateFish(key, updatedFish);
  }

  authenticate(providerKey) {
    console.log(`Trying to login with ${providerKey}`);
    var provider = new firebase.auth.GithubAuthProvider();
    console.log(provider);
    firebase.auth().signInWithPopup(provider)
      .then(this.authHandler)
      .catch((error)=> console.error(error));
  }

  logOut() {
    firebase.auth().signOut().then(() => {
      console.log('Logged Out');
      this.setState({ uid: null });
    });
  }
  authHandler(authData){
    console.log(authData);
    const storeRef = firebase.database().ref(this.props.storeId);
    console.log(storeRef);

    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      if(!data.owner){
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });

    });

  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store Inventory.</p>
        <button className="github"
          onClick={() => this.authenticate('github')}>
        Login with GitHub</button>
      </nav>
    );
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (<div className="fish-edit" key={key} >
      <input type="text" name="name"
        onChange={(e) => this.handleChange(e,key)} value={fish.name} placeholder="Fish Name" />
      <input type="text" name="price"
        onChange={(e) => this.handleChange(e,key)} value={fish.price} placeholder="Fish Price" />
      <select placeholder="Fish Status" name="status"
        onChange={(e) => this.handleChange(e,key)} value={fish.Status} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
      </select>
      <textarea type="text" name="desc"
        onChange={(e) => this.handleChange(e,key)} value={fish.desc} placeholder="Fish Desc"></textarea>
      <input type="text" name="image"
        onChange={(e) => this.handleChange(e,key)} value={fish.image} placeholder="Fish Image"/>
      <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
    </div>);
  }

  render() {
    const logout = <button onClick={ () => this.logOut() }>Log Out!</button>
    //if not logged in at all
    if(!this.state.uid){
      return <div>{this.renderLogin()}</div>
    }

    //check if owner
    if(this.state.uid !== this.state.owner ){
      return (
        <div>
          <p>Sorry, you aren't the owner of this store</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <p>Inventory</p>
        {logout}
        {
          Object
            .keys(this.props.fishes)
            .map(this.renderInventory)
        }
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired
}
