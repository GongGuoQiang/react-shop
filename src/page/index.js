import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import '../App.css'
import Home from './Home'
import Order from './Order'
import My from './My'
import Search from './Search'
import shopList from './shopList'
import {
  TabBar
} from 'antd-mobile';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '/home',
      fullScreen: false,
      hidden: false,
    };
  }
// componentWillMount(){
//   console.log(this.props)
//   if(this.props.location.pathname === '/' || this.props.location.pathname === '/home' || this.props.location.pathname === '/order' || this.props.location.pathname === '/my' || this.props.location.pathname === '/search'){
//       this.setState({
//         hidden:false
//       })
//     }else{
//       this.setState({
//         hidden:true
//       })
//     }
// }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%' }}>
    <Switch>
         <Route exact path="/" component={Home}></Route>
         <Route exact path="/home" render={()=><Redirect to="/"/>}></Route>
         <Route exact path="/order"  component={Order}></Route>
         <Route exact path="/search"  component={Search}></Route>
         <Route exact path="/my"  component={My}></Route>
         <Route exact path="/shoplist/:id" component={shopList}></Route>
    </Switch>
      </div>
    );
  }

  render() {
    return (
      <div>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            hidden={this.state.hidden}
            barTintColor="white"
          >
            <TabBar.Item
              title="首页"
              key="Life"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
              }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
              }}
              />
              }
              selected={
                this.state.selectedTab === '/home'
              }
              onPress={() => {
                this.setState({
                  selectedTab: '/home',
                });
                this.props.history.push('/')
              }}
              data-seed="logId"
            >
              {this.renderContent('home')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              title="订单"
              key="order"
              badge={'1'}
              selected={this.state.selectedTab === '/order'}
              onPress={() => {
                this.setState({
                  selectedTab: '/order',
                });
                this.props.history.push('/order')
              }}
              data-seed="logId1"
            >
              {this.renderContent('Koubei')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              title="搜索"
              key="search"
              selected={this.state.selectedTab === '/search'}
              onPress={() => {
                this.setState({
                  selectedTab: '/search',
                });
                this.props.history.push('/search')
              }}
            >
              {this.renderContent('Friend')}
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
              selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
              title="My"
              key="my"
              selected={this.state.selectedTab === '/my'}
              onPress={() => {
                this.setState({
                  selectedTab: '/my',
                });
                this.props.history.push('/my')
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
          </TabBar>
      </div>
    );
  }
}
export default App;
