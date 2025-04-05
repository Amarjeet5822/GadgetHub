
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
import { User, LogOut, Heart, Package, ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logoutUser, updateDetailUser } from '../RTK/features/authUserSlice';

const AccountPage = () => {

  const [isUpdating, setIsUpdating] = useState(false);
  const { data, authStatus } = useSelector(state => state.authUser)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: data?.name || '',
    email: data?.email || '',
    mobileNumber: data?.mobileNumber || '',
    address: data?.address || '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const fetchUpdateDetail = async (user) => {
      try {
        await dispatch(updateDetailUser(user)).unwrap();
        console.log("user detail updated");
      } catch (error) {
        console.log("error to update details", error?.message );
      } finally {
        setIsUpdating(false);
      }
    }
    fetchUpdateDetail(formData);
  };
  
  const handleLogout = () => {
    const fetchLogout = async () => {
      try {
        await dispatch(logoutUser()).unwrap();
        navigate("/")
      } catch (error) {
        console.log("failed to logout")
      }
    }
    fetchLogout()
  };
  useEffect(() => {
    if(!authStatus.isAuthenticated) {
      navigate("/");
    }
    const fetchGetUser = async () => {
      try {
        await dispatch(getUser()).unwrap();
        // console.log("data => ", data )
        setFormData(data)
      } catch (error) {
        console.log("failed to get User")
      }
    }
    fetchGetUser()
  },[]) 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Account sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 text-primary rounded-full p-3">
                <User className="w-10 h-10" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{data?.name}</h2>
                <p className="text-gray-600">{data?.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <div className="bg-primary/10 text-primary rounded-md flex items-center p-3">
                <User className="w-5 h-5 mr-3" />
                <span>Account Details</span>
              </div>
              <button 
                className="text-gray-600 hover:bg-gray-50 w-full rounded-md flex items-center p-3 transition-colors"
                onClick={() => navigate('/wishlist')}
              >
                <Heart className="w-5 h-5 mr-3" />
                <span>Wishlist</span>
                <span className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-xs ml-auto">
                  {/* {favorites?.length || 0} */}
                  {0}
                </span>
              </button>
              <button 
                className="text-gray-600 hover:bg-gray-50 w-full rounded-md flex items-center p-3 transition-colors"
                onClick={() => navigate('/bag')}
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                <span>Shopping Cart</span>
                <span className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-xs ml-auto">
                  {/* {cartItems.length} */}
                  {0}
                </span>
              </button>
              <button 
                className="text-gray-600 hover:bg-gray-50 w-full rounded-md flex items-center p-3 transition-colors"
              >
                <Package className="w-5 h-5 mr-3" />
                <span>Order History</span>
              </button>
              <button 
                className="text-red-600 hover:bg-red-50 w-full rounded-md flex items-center p-3 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Log Out</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Account details */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Account Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-md focus-within:border-primary">
                      <span className="pl-3 text-gray-500">
                        <User className="w-5 h-5" />
                      </span>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full border border-gray-200 p-3 focus:outline-none focus:ring-0"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-md focus-within:border-primary">
                      <span className="pl-3 text-gray-500">
                        <Mail className="w-5 h-5" />
                      </span>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full border border-gray-200 p-3 focus:outline-none focus:ring-0"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-md focus-within:border-primary">
                    <span className="pl-3 text-gray-500">
                      <Phone className="w-5 h-5" />
                    </span>
                    <input 
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="block w-full border-0 p-3 focus:outline-none focus:ring-0"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="flex items-start border border-gray-200 rounded-md focus-within:border-primary">
                    <span className="pl-3 pt-3 text-gray-500">
                      <MapPin className="w-5 h-5" />
                    </span>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full border-0 p-3 focus:outline-none focus:ring-0"
                      placeholder="Your shipping address"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-70"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input 
                    type="password"
                    className="block w-full border border-gray-300 rounded-md p-2.5 focus:border-primary focus:ring-primary"
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input 
                      type="password"
                      className="block w-full border border-gray-300 rounded-md p-2.5 focus:border-primary focus:ring-primary"
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input 
                      type="password"
                      className="block w-full border border-gray-300 rounded-md p-2.5 focus:border-primary focus:ring-primary"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                <div>
                  <button
                    type="button"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
