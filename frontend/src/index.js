import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/frontendcss.css'
import App from './App';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';

import Room from './components/Rooms';
import ServiceScreen from './screen/ServiceScreen';
import AboutUsScreen from './screen/AboutUsScreen';
import Gallery from './screen/Gallery';
import Testimonial from './screen/Testimonial';
import ContactUs from './screen/ContactUs';
import UserProfileScreen from './screen/UserProfileScreen';
import { Provider } from 'react-redux';
import store from './store';
import AdminRoutes from './components/AdminRoutes';
import UsersList from './screen/admin/UsersList';
import RentDetails from './screen/admin/RentDetails';
import Enquiries from './screen/admin/Enquiries';
import EnquiryDetails from './components/admin/EnquiryDetails';
import UserDetails from './components/admin/UserDetails';
import PrivateRoutes from './components/PrivateRoutes';

import UserEnquiryForm from './screen/UserEnquiryForm';
import RoomType from './screen/admin/RoomType';
import ServiceType from './screen/admin/ServiceType';

import GalleryAdmin from './components/admin/GalleryAdmin';
import ResetPasswordForm from './screen/ResetPasswordForm'
import PayRent from './components/PayRent';
import RentDetailsForUser from './screen/admin/RentDetailsForUser';
import ViewUserRentDetails from './screen/admin/ViewUserRentDetails';
import RentPaidDetailsForUser from './screen/RentPaidDetailsForUser';
import ForgotPassword from './screen/ForgotPassword';
import UserTestimony from './screen/UserTestimony';
import { HelmetProvider } from 'react-helmet-async';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPasswordForm />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/rooms' element={<Room />} />
      <Route path='/service' element={<ServiceScreen />} />
      <Route path='/about' element={<AboutUsScreen />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/testimonial' element={<Testimonial />} />
      <Route path='/contact' element={<ContactUs />} />

      <Route path="" element={<PrivateRoutes />}>
        <Route path='/user-testimony' element={<UserTestimony />} />
        <Route path='/user-enquiry' element={<UserEnquiryForm />} />
        {/* <Route path='/user-testimony' element={<UserTestimony />} /> */}
        <Route path='/pay-rent' element={<PayRent />} />
        <Route path='/rent-details' element={<RentPaidDetailsForUser />} />
        <Route path='/profile' element={<UserProfileScreen />} />
      </Route>

      <Route path='' element={<AdminRoutes />}>
        <Route index={true} path='/admin/users' element={<UsersList />} />
        <Route path='/admin/users/search/:keyword/page/:pageNumber' element={<UsersList />} />
        <Route path='/admin/users/search/:keyword' element={<UsersList />} />
        <Route path='/admin/users/page/:pageNumber' element={<UsersList />} />
        <Route index={true} path='/admin/enquiries' element={<Enquiries />} />
        <Route path='/admin/enquiries/search/:keyword' element={<Enquiries />} />
        <Route path='/admin/enquiries/search/:keyword/page/:pageNumber' element={<Enquiries />} />
        <Route path='/admin/enquiries/page/:pageNumber' element={<Enquiries />} />
        <Route path='/admin/user/:id/edit' element={<UserDetails />} />
        <Route index={true} path='/admin/rent-details' element={<RentDetails />} />
        <Route path='/admin/rent-details/search/:keyword' element={<RentDetails />} />
        <Route path='/admin/rent-details/page/:pageNumber' element={<RentDetails />} />

        <Route path='/admin/enquiries/:id/edit' element={<EnquiryDetails />} />
        <Route path='/admin/rooms' element={<RoomType />} />
        <Route path="/admin/service" element={<ServiceType />} />
        <Route path="/admin/gallery" element={<GalleryAdmin />} />
        <Route path="//admin/rent-details/:id/edit" element={<RentDetailsForUser />} />
        <Route path="//admin/rent-details/:id/view" element={<ViewUserRentDetails />} />
      </Route>


    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} ></RouterProvider>
      </Provider>
    </HelmetProvider>






  </React.StrictMode >
);

