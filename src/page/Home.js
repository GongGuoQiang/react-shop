import React, { Component } from 'react';
import { NavBar, Icon, Carousel, WingBlank } from 'antd-mobile';
import { Link } from 'react-router-dom'
import Star from '../components/Star'
import '../assets/css/home.css'
import axios from 'axios'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            imgHeight: 200,
            shoplist:[],
            score:[1,2,3,4,5],
            num:this.props.name/2,
        };
    }

    componentDidMount() {
        axios.get("http://cangdu.org:8001/v2/index_entry")
            .then((res) => {
                var mybody = res.data;
                var num = parseInt(mybody.length / 8);
                var category = [];
                var arr = [];
                for (var i = 0; i < num; i++) {
                    arr = [];
                    for (var h = 0; h < 8; h++) {
                        arr.push(mybody[i * 8 + h]);
                    }
                    category.push(arr);
                }
                arr = [];
                if (num * 8 < mybody.length) {
                    for (var k = num * 8; k < mybody.length; k++) {
                        arr.push(mybody[num * 8 + k])
                    }
                    category.push(arr);
                }
                this.setState({
                    category: category
                })
            })
            .catch(function (error) {
                console.log(error);
            });

            axios.get('http://cangdu.org:8001/shopping/restaurants?latitude=31.22967&longitude=121.4762').then(res => {
                this.setState({
                    shoplist:res.data
                })
              }, response => {
                this.num=this.num+1;
              });    
    }

    render() {
        return (
            <div className='home'>
                <NavBar
                    mode="dark"
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    ]}
                >仁恒置地广场a座</NavBar>
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        infinite
                    >
                        {this.state.category.map((val,index) => (
                            <div className="box" key={index} style={{ width: '100%', height: this.state.imgHeight }}>
                               {
                                   val.map((item,index) =>(
                                       <div className="img_box" key={index}>
                                            <img src={`https://fuss10.elemecdn.com${item.image_url}`} />
                                            <p>{item.title}</p>
                                       </div>
                                   ))
                               }
                            </div>
                        ))}
                    </Carousel>
                </WingBlank>
                <div className="shop">
                    <div className="title">
                        <i className='iconfont icon-shangjia'></i>  <h3>附近商家</h3>
                    </div>
                    <div className="shop_list">
                        {
                            this.state.shoplist.map((item,index)=>{
                                return(
                                    <Link to={`/shopList/${item.id}`} style={{color:'#000'}} className="item" key={index}>
                                        <div className="fl">
                                            <img src={`http://cangdu.org:8001/img/${item.image_path}`} />
                                        </div>
                                        <div className="fr">
                                        <div className="shoptop">
                                        <span className="pinpai ">品牌</span>
                                        <span className="shopname">{item.name}</span>
                                        <span className="rightspan right mgr">
                                        {
                                            item.supports.map((child,index)=>(
                                                <span key={index}>{child.icon_name}</span>
                                            ))
                                        }
                                        </span>
                                        </div>
                                        <div className="xxdiv">
                                        <div className="xxbox fs10 mgl">
                                            <Star name={item.rating}></Star>
                                        </div>
                                        <span className="colred mgleft8">{item.rating}</span>
                                        <span className="">月售{item.recent_order_num}单</span>
                                        <span className="rightspan right mgr">
                                            <span v-if="item.delivery_mode" className="fn">{item.delivery_mode.text}</span>
                                        </span>
                                        </div>
                                        <div className="shopfoot">
                                            <div><span className="">￥{item.float_minimum_order_amount}起送/{item.piecewise_agent_fee.tips}</span></div>
                                            <div><span className="right mgr"><span className="">{item.distance}/</span><span className="col">{item.order_lead_time}</span></span></div>
                                        </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;