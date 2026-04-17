import  { useEffect, useState } from "react";
// import BottomNav from "./stickyNav";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard } from "react-icons/fa";
import StickyBottomNav from "../components/stickyNavv";

const SendMoney = () => {
  const [amount, setAmount] = useState("");
  // const [userImage, setUserImage] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [receiver, setReceiver] = useState({
    name: "",
    bank: "",
    accountNumber: "",
    routingNumber: "",
    amount: "",
    purpose: "",
    senderAccount: "",
    comment: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver({ ...receiver, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setError(true); // Simulating a transaction failure
    }, 3000);
  };



  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAmount(parsedUser.amount); // Set initial amount
      // setUserImage(parsedUser.profilePicture || "default-avatar.jpg"); // Use parsedUser instead of user
      setUserName(parsedUser.firstName || "User"); // Use parsedUser instead of user
      console.log(amount)
    } else {
      // setUserImage("default-avatar.jpg"); 
      setUserName("User"); 
    }
  }, []);
  


  return (
    <>
      <div className="">
        {/* Header */}
        <div className="bg-red-700  text-white p-4 flex justify-end items-center sticky top-0 z-10">
 {user && (
            <img
              src=''
              alt=""
              className="h-10 w-10 rounded-full border-2 border-white hidden"
            />
          )}
        <h1 className="text-lg text-white font-thin">
  {userName ? `${userName}${userName.endsWith("'") ? "" : "'s"} Dashboard` : "Dashboard"}
</h1>

        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 lg:px-6 mt-8">
          {/* Left Section */}
          <div className="lg:w-1/3 space-y-6">
            {/* Total Balance Section */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-gray-700 font-medium">Total Balance</h2>
                <button className="bg-red-100 text-red-600 p-2 rounded-lg">
                  <span className="material-icons">content_copy</span>
                </button>
              </div>
              <h1 className="text-3xl font-bold mt-2">
                ${user?.amount.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>

        <hr />

      
      </div>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6">
            {/* Header */}
            <header className="w-full flex items-center justify-between py-4 border-b lg:max-w-md">
              <button className="text-xl text-gray-600" onClick={() => navigate(-1)}>
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">New Transfer</h1>
              <div className="w-8"></div>
            </header>
      
            {/* Payment Form */}
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-gray-700 text-lg font-medium mb-4">Transfer Details</h2>
      
              <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
                {/* From */}
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-red-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Debit Card</p>
                      <p className="text-xs text-gray-500">**** **** **** 4900</p>
                    </div>
                  </div>
                  <button className="text-red-500 text-sm">Change</button>
                </div>
      
                {/* Recipient Details */}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Recipient Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={receiver.name}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Bank Name</label>
                  <input
                    type="text"
                    name="bank"
                    placeholder="Enter bank name"
                    value={receiver.bank}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Enter account number"
                    value={receiver.accountNumber}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Bank Routing Number (ABA)</label>
                  <input
                    type="text"
                    name="routingNumber"
                    placeholder="Enter routing number"
                    value={receiver.routingNumber}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                {/* Amount */}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Transfer Amount</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={receiver.amount}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                {/* Purpose of Payment (Optional) */}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Purpose of Payment (Optional)</label>
                  <input
                    type="text"
                    name="purpose"
                    placeholder="Enter purpose (optional)"
                    value={receiver.purpose}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                  />
                </div>
      
                {/* Sender's Account Details (for verification) */}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Sender's Account Details</label>
                  <input
                    type="text"
                    name="senderAccount"
                    placeholder="Enter sender's account details"
                    value={receiver.senderAccount}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                {/* Comment */}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Your Comment</label>
                  <input
                    type="text"
                    name="comment"
                    placeholder="Write a message..."
                    value={receiver.comment}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                  />
                </div>
      
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-red-700 text-white py-3   text-lg font-medium hover:bg-black transition"
                >
                  Send Money
                </button>
              </form>
            </div>
      
            {/* Loading Overlay */}
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-xl font-medium animate-pulse">Processing...</div>
              </div>
            )}
      
            {/* Error Modal */}
            {error && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
  <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl text-center">
    
    {/* Title */}
    <h2 className="text-xl font-semibold text-red-600">
      Transaction Failed
    </h2>

    {/* Message */}
    <p className="text-gray-600 mt-3">
      We were unable to process your transaction. This may be due to missing or invalid details.
    </p>

    {/* Documentation request */}
    <p className="text-gray-500 text-sm mt-2">
      Please provide the required documentation or reach out to support for assistance.
    </p>

    {/* Buttons */}
    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
      
      {/* Upload / Documentation button */}


      {/* Contact Support */}
      <a
        href="mailto:premiuminv@financier.com?subject=Transaction%20Issue&body=Hello%2C%20I%20encountered%20a%20transaction%20failure.%20Please%20assist."
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-center"
      >
        Contact Support
      </a>
    </div>

    {/* Close */}
    <button
      onClick={() => setError(false)}
      className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
    >
      Close
    </button>

  </div>
</div>
            )}
          </div>

      {/* <BottomNav /> */}
      <StickyBottomNav/>
    </>
  );
};

export default SendMoney;
