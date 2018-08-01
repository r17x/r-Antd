import React, {Component} from 'react'
import {LocaleProvider} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import {Layout, Menu} from 'antd'
import './App.css'
import {
  PertanianForm,
} from './Component/PertanianApp'


const {
  Header,
  Content,
  Footer,
} = Layout

export default class App extends Component {
  state = {
    collapsed: false,
  };
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Layout>
          <Layout>
            <Header className="header" style={{background: '#fff', padding: 0}}>
              <div className="logo">
                <h1>Alat Ukur</h1>
              </div>
              <Menu theme="dark" mode="horizontal">
              </Menu>
            </Header>
            <Content style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
            }}>
              <PertanianForm/>
            </Content>
            <Footer style={{textAlign: 'center'}}>
            AlatUkur ©2018 Created by Elminaya
            </Footer>
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}

