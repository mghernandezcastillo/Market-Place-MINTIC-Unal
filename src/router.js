import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Account from './components/Account.vue'
import Allproducts from './components/Allproducts.vue' 
import CreateProducts from './components/CreateProduct.vue'
import ProductDetails from './components/ProductDetails.vue'
import MyProducts from './components/MyProducts.vue'
import UpdateProduct from './components/UpdateProduct.vue'
import DeleteProduct from './components/DeleteProduct.vue'
import ContactInformationUpdate from './components/ContactInformationUpdate.vue'
import ResetPasswordRequirement from './components/ResetPasswordRequirement.vue'
import ResetPasswordConfirm from './components/ResetPasswordConfirm.vue'

const routes = [
  {
    path: '/', // raiz 
    name: 'root', //nombre identificador de la ruta del componente
    component: Allproducts // encargado de pintar la raiz
  },
  {
    path: '/user/logIn', //ruta para acceder
    name: 'logIn',
    component: LogIn
  },
  {
    path: '/user/signUp', //ruta para acceder
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/user/home', //ruta para acceder
    name: 'home',
    component: Home
  },
  {
    path: '/user/account', //ruta para acceder
    name: 'account',
    component: Account
  },
  {
    path: '/user/productos', //ruta para acceder
    name: 'productos',
    component: Allproducts
  },
  {
    path: '/user/createproduct', //ruta para acceder
    name: 'createproduct',
    component: CreateProducts
  },
  {
    path: '/user/productDetails', //ruta para acceder
    name: 'productDetails',
    component: ProductDetails
  },
  {
    path: '/user/myProducts', //ruta para acceder
    name: 'myProducts',
    component: MyProducts
  },
  {
    path: '/user/updateProduct', //ruta para acceder
    name: 'updateProduct',
    component: UpdateProduct
  },
  {
    path: '/user/deleteProduct', //ruta para acceder
    name: 'deleteProduct',
    component: DeleteProduct
  },
  {
    path: '/user/ContactInformationUpdate', //ruta para acceder
    name: 'contactInformationUpdate',
    component: ContactInformationUpdate
  },
  {
    path: '/user/ResetPasswordRequirement', //ruta para acceder
    name: 'resetPasswordRequirement',
    component: ResetPasswordRequirement
  },
  {
    path: '/user/ResetPasswordConfirm', //ruta para acceder
    name: 'resetPasswordConfirm',
    component: ResetPasswordConfirm
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
