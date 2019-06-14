
import Order from '../page/Order.js'
import Home from '../page/Home.js'
let routes = [
    {
      path:'/',
      component:Home,
      exact:true
    },
    {
     path:'/order',
     component:Order,
    }
   ]

   export default routes;