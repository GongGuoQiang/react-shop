import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import axios from 'axios'
import '../assets/css/home.css'
import { AutoComplete } from 'antd';
import Yuan from '../assets/img/yuan.png';

class shopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgpath: 'http://cangdu.org:8001/img/',
            shopInfo: '',
            shopList: [],
            active: 0,
            cars: [],
            mask:false,
            sumPrice:0
        };
    }


    componentDidMount() {
        axios.get(`http://cangdu.org:8001/shopping/restaurant/${this.props.match.params.id}`)
            .then((res) => {
                this.setState({
                    shopInfo: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(`http://cangdu.org:8001/shopping/v2/menu?restaurant_id=${this.props.match.params.id}`)
            .then((res) => {
                this.setState({
                    shopList: res.data
                });
                this.getshopnum();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    refsToArray(ctx, prefix) {
        let results = [];
        for (let i = 0; ; i++) {
            let ref = ctx.refs[prefix + '-' + String(i)];
            if (ref) results.push(ref);
            else return results;
        }
    }


    ScrollTop(number = 0, time) {
        if (!time) {
            this.refs.scrollBody.scrollTop = number;
            return number;
        }
        const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
        let spacingInex = time / spacingTime; // 计算循环的次数
        let nowTop = document.body.scrollTop + this.refs.scrollBody.scrollTop; // 获取当前滚动条位置
        let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
        let scrollTimer = setInterval(() => {
            if (spacingInex > 0) {
                spacingInex--;
                this.ScrollTop(nowTop += everTop);
            } else {
                clearInterval(scrollTimer); // 清除计时器
            }
        }, spacingTime);
    }

    handleClick = (index, event) => {
        this.setState({
            active: index
        });
        var topHeight = this.refsToArray(this, 'ListHeader')[index].offsetTop;
        this.ScrollTop(topHeight, 500);
    }
    handleAdd = (itemChild) => {
        // this.setState({
        //     sumPrice:this.state.sumPrice+itemChild.specfoods[0].price
        // });
        this.sumPrice(itemChild,1)
        var obj = {
            name: itemChild.name,
            description: itemChild.description,
            price: itemChild.specfoods[0].price,
            id: itemChild.item_id,
            num: 1
        }
        var addok = true;
        var data = this.state.cars;
        for (const key in this.state.cars) {
            if (itemChild.item_id == this.state.cars[key].id) {
                data[key].num = data[key].num + 1
                addok = false
                break;
            }
        }
        if (addok) {
            data.push(obj)
        }
        this.setState({
            cars: data
        })
        this.getshopnum();
    }
    showCars(){
        this.setState({
            mask:!this.state.mask
        })
    }

    sumPrice(itemChild,val){
        if(val == 1){
            this.setState({
                sumPrice:this.state.sumPrice+itemChild.specfoods[0].price
            });
        }else{
            this.setState({
                sumPrice:this.state.sumPrice-itemChild.specfoods[0].price
            });
        }
        
    } 

    handleReduce(item){
        this.sumPrice(item,0)
        var data = this.state.cars;
        for(var i=0;i<this.state.cars.length;i++){
            if(this.state.cars[i].id==item.item_id){
                  this.state.cars[i].num==1?data.splice(i,1):(data[i].num=data[i].num-1);
                  this.setState({
                    cars:data
                  });
                this.getshopnum();
                  break;
            }
        }
        
    }
    //购物车数量
    getshopnum(){
        var data = this.state.shopList;
        var cars = this.state.cars;
        for(var i=0;i<data.length;i++){
            for(var k=0;k<data[i].foods.length;k++){
                  var isadd=true;                          //判断该商品是否在购物车
                  for( var h=0;h<cars.length;h++){
                      if(data[i].foods[k].item_id==cars[h].id){
                        data[i].foods[k].mynum=cars[h].num;
                          isadd=false;
                          break;
                      }
                  }
                  if(isadd){
                    data[i].foods[k].mynum=0;
                  }
            }
        }
        this.setState({
            shopList:data
        });
    }
    

    renderContent = tab =>
        (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            <p>Content of {tab.title}</p>
        </div>);

    render() {
        const tabs = [
            { title: '商品' },
            { title: '评价' }
        ];
        let _refi = 0;
        let makeRef = () => {
            return 'ListHeader-' + (_refi++);
        };
        return (
            <div className="shopList fixed">
                <div className="head">
                    <img className="bg" src={`${this.state.imgpath}${this.state.shopInfo.image_path}`} />
                    <div className="shopInfo">
                        <a href="javascript:;" className="index--iRT3"></a>
                        <div className="name">{this.state.shopInfo.name}</div>
                        <img className="logo" src={`${this.state.imgpath}${this.state.shopInfo.image_path}`} />
                        <div className="text">
                            <p>{this.state.shopInfo.promotion_info}</p>
                        </div>
                    </div>
                </div>
                <div className="g-title">{this.state.shopInfo.address}</div>
                <div className="main" >
                    <Tabs tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                        <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
                            <div className='left'>
                                <ul>
                                    {
                                        this.state.shopList.map((item, index) => {
                                            return (
                                                <li key={index} onClick={this.handleClick.bind(this, index)} className={this.state.active == index ? 'active' : ''}>
                                                    <i className="icon"></i>
                                                    {item.name}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="right">
                                <div className="right_box" ref="scrollBody" style={{ overflow: "auto", height: "100%" }}>
                                    {
                                        this.state.shopList.map((item, key) => {
                                            return (
                                                <div key={key} ref={makeRef()}>
                                                    <p style={{ padding: "10px", fontSize: "16px" }}>{item.name}<span style={{ marginLeft: '20px', fontSize: '14px', color: '#999' }}>{item.description}</span></p>
                                                    <ul>
                                                        {
                                                            item.foods.map((itemChild, index) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <img src={`${this.state.imgpath}${itemChild.image_path}`} />
                                                                        <div className="text" style={{ paddingLeft: '5px' }}>
                                                                            <p className="name" style={{ color: '#333', textAlign: 'left', fontWeight: 'normal' }}>{itemChild.name}</p>
                                                                            <p className="pinNumber">{itemChild.tips}</p>
                                                                            <div className="bottom">
                                                                                <span>现价：￥{itemChild.specfoods[0].price}</span>
                                                                                <span>原价：56￥</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="boxx" style={{display:'flex',alignItems:'center'}}>
                                                                           <i className="iconfont icon-jian" style={{display:itemChild.mynum>0?'block':'none'}} onClick={this.handleReduce.bind(this, itemChild)}></i>
                                                                                {itemChild.mynum>0?itemChild.mynum:''}
                                                                           <i style={{marginLeft:'5px'}} className="iconfont icon-jia" onClick={this.handleAdd.bind(this, itemChild)}></i>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            评价
                        </div>
                    </Tabs>
                    <div style={{ height: '60px',background: 'rgba(61,61,63,.9)',position:'relative' }}>
                        <div className="cars" onClick={this.showCars.bind(this)} style={{position:'absolute',zIndex:'20000'}}>
                            <div className="box">
                                <p style={{backgroundImage:this.state.cars.length>0? 'radial-gradient(circle,#3190e8 6.266667vw,#3190e8 0)':''}}><i className="iconfont icon-gouwucheman"></i></p>
                                <span style={{ color: this.state.sumPrice>0?'#fff': '#999' ,fontSize:this.state.sumPrice>0?'16px':''}}>
                                    {
                                        this.state.sumPrice>0?'￥'+this.state.sumPrice:'未选购任何商品'
                                    }
                                </span>
                            </div>
                            <p className="price" style={{background:this.state.sumPrice>=20?'#38ca73':'',height:'100%',lineHeight:'60px'}}>
                                {
                                    this.state.sumPrice>=20?'立即结算':'还差'+(20-this.state.sumPrice)+'起送'
                                }
                                
                                </p>
                        </div>
                    </div>
                    {/* 弹框 */}
                    <div className="mask" style={{display:this.state.mask?'block':'none'}}></div>
                    <div className="list_box" style={{ display: this.state.cars.length > 0 && this.state.mask ? 'block' : 'none' }}>
                    <div className="top">已选产品</div>
                        <ul>
                            {
                                this.state.cars.map((item,index) => {
                                    return (
                                        <li key={index}>
                                            <div className="left_box">
                                                <p className="name">{item.name}</p>
                                                <span>{item.description}</span>
                                            </div>
                                            <div className="right_box">
                                               <p className="price">￥{item.price}</p>
                                               <div className="box">
                                                   <i className="iconfont icon-jian"></i>
                                                   <span>{item.num}</span>
                                                   <i className="iconfont icon-jia"></i>
                                               </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default shopList;