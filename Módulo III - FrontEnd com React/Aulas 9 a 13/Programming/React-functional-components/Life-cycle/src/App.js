import React, { Component } from 'react';

import Toggle from './components/toggle/Toggle';
import Users from './components/users/Users';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false,
    }
  }

  /*
  componentDidMount: executado após o primeiro render(), render pai. Útil para requisições HTTP.
  componentDidUpdate: executado após toda invocação de render(). Útil para aplicação de efeitos colaterais
  componentWillUnmount: executado antes do componente "morrer". Útil para finalização de objetos, como por exemplo o clearInterval
  */ 

  async componentDidMount() { // Here is a great place to put the API and req HTTP
    const res = await fetch('https://randomuser.me/api/?seed=rush&nat=br&results=10');

    const json = await res.json();

    this.setState({
      users: json.results,
    });
  }
 
  handleShowUsers = (isChecked) => {
    this.setState({ showUsers: isChecked });
  }

  render() {
    const { showUsers, users } = this.state;

    return(
      <div>
        <h3>React LifeCycle</h3>
        <Toggle description="Mostrar usuários:" enabled={showUsers} onToggle={this.handleShowUsers} />
        <hr />
        { showUsers && <Users users={ users } /> } {/* When showUsers is true, show users */}
      </div>
    );
  }
}
