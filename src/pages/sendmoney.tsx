import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard } from "react-icons/fa";
import log from "../assets/logo.webp";
import { getUsers, updateUser } from "../backend/api"; // Ensure same API as Admin
import StickyBottomNav from "../components/stickyNavv";

const SendMoney = () => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [receiptEmail, setReceiptEmail] = useState("");
const [receiptLoading, setReceiptLoading] = useState(false);
const [receiptSent, setReceiptSent] = useState(false);
  const [userImage, setUserImage] = useState<string>("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [userName, setUserName] = useState<string>("");
  const [receiver, setReceiver] = useState({
    name: "",
    bank: "",
    accountNumber: "",
    routingNumber: "",
    amount: "", // keep raw number as string
    purpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Fetch users like Admin panel
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);

      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserImage(parsedUser.profilePicture || "default-avatar.jpg");
        setUserName(parsedUser.firstName || "User");
      }
    };
    fetchData();
  }, []);

useEffect(() => {
  emailjs.init({
    publicKey: "IAM1bWrLv9ylk-CFH",
  });
}, []);



const generateReferenceNumber = () => {
  const randomPart = Math.floor(100000 + Math.random() * 900000);

  return `TRX-${Date.now().toString().slice(-6)}-${randomPart}`;
};


const sendReceiptEmail = async () => {
  if (!receiptEmail.trim()) {
    alert("Please enter your email address.");
    return;
  }

  const transferAmount = Number(receiver.amount);
  const transactionDate = new Date().toLocaleDateString("en-US");

  setReceiptLoading(true);

  try {
    const response = await emailjs.send(
      "service_lpzew74",
      "template_ptoc1fm",
      {
        to_email: receiptEmail,
        receiver_name: receiver.name,
        bank_name: receiver.bank,
        user_name: userName,
        account_number: receiver.accountNumber,
        amount: formatAmountForHistory(transferAmount),
        transaction_date: transactionDate,
        purpose: receiver.purpose || "Money Transfer",
        status: "Pending",
      }
    );

    console.log("Email sent:", response.status, response.text);

    setReceiptSent(true);
  } catch (error) {
    console.error("EmailJS error:", error);
    alert("Failed to send receipt. Please try again.");
  } finally {
    setReceiptLoading(false);
  }
};



  // Format input for display, store raw in state
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, ""); // allow digits & dot
    setReceiver({ ...receiver, amount: raw });
  };

  const formatDisplayAmount = (value: string) => {
    if (!value) return "";
    const num = Number(value);
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "amount") {
      handleAmountChange(e);
    } else {
      setReceiver({ ...receiver, [e.target.name]: e.target.value });
    }
  };

  const formatAmountForHistory = (amount: number) => {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const transferAmount = Number(receiver.amount);
    const count = Number(localStorage.getItem("transferCount") || 0);

    if (count >= 1000) {
      setError(true);
      return;
    }

    if (transferAmount <= 0) {
      alert("Invalid transfer amount");
      return;
    }

    if (transferAmount > user.amount) {
      alert("Insufficient balance");
      return;
    }

    setLoading(true);

    // 🔹 New history entry like Admin
    const newHistoryEntry = {
      date: new Date().toISOString().split("T")[0],
      amount: transferAmount,
      description: `Pending Transfer to ${receiver.name}`,
      type: "pending",
      formattedAmount: formatAmountForHistory(transferAmount),
    };

    const updatedUser = {
      ...user,
      amount: user.amount - transferAmount,
      history: [newHistoryEntry, ...(user.history || [])],
    };

    try {
      // 🔹 Find index and update backend like Admin panel
      const index = users.findIndex((u) => u.email === user.email);
      if (index !== -1) {
        await updateUser(index, updatedUser);

        // 🔹 Update local state & storage
        const updatedUsers = [...users];
        updatedUsers[index] = updatedUser;
        setUsers(updatedUsers);
        setUser(updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
        localStorage.setItem("transferCount", String(count + 1));
      }

      const newReference = generateReferenceNumber();
setReferenceNumber(newReference);


      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to send money. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-red-800 text-white p-4 flex justify-between items-center sticky top-0 z-10">
        {user && (
          <img
            src={userImage}
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-white"
          />
        )}
        <h1 className="text-lg font-thin">
          {userName ? `${userName}'s Dashboard` : "Dashboard"}
        </h1>
      </div>

      {/* Balance */}
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-gray-700 font-medium">Total Balance</h2>
          <h1 className="text-3xl font-bold mt-2">
            $
            {user?.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h1>
        </div>
      </div>

      {/* Transfer Form */}
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6">
        <header className="w-full flex items-center justify-between py-4 border-b max-w-md">
          <button onClick={() => navigate(-1)} className="text-xl">
            <FaArrowLeft />
          </button>
          <h1 className="text-lg font-semibold">New Transfer</h1>
          <div className="w-8" />
        </header>

        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
              <FaCreditCard className="text-red-600" />
              <div>
                <p className="text-sm font-medium">Debit Card</p>
                <p className="text-xs text-gray-500">**** **** **** 4900</p>
              </div>
            </div>

            {[
              { name: "name", label: "Receiver Full Name" },
              { name: "bank", label: "Bank Name" },
              { name: "accountNumber", label: "Account Number" },
              { name: "routingNumber", label: "Routing Number" },
              { name: "amount", label: "Transfer Amount" },
              { name: "purpose", label: "Purpose (Optional)" },
            ].map((field) => (
              <div key={field.name} className="bg-gray-100 p-3 rounded-lg">
                <label className="text-sm text-gray-600">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={
                    field.name === "amount"
                      ? formatDisplayAmount(receiver.amount)
                      : (receiver as any)[field.name]
                  }
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                  required={field.name !== "purpose"}
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-3 text-lg hover:bg-black transition"
            >
              Send Money
            </button>
          </form>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <img src={log} alt="Loading" className="animate-pulse" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-center max-w-sm">
            <h2 className="text-red-600 font-semibold">
              Transfer Access Restricted
            </h2>
            <p className="text-sm mt-2">
              Tier-2 Compliance Required. Please contact support.
            </p>
            <button
              onClick={() => setError(false)}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    {success && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

      {!receiptSent ? (
        <>
          <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-2xl text-green-600">✓</span>
            </div>

            <h2 className="text-green-600 font-semibold text-xl mt-4">
              Transfer Submitted
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Your transfer is currently pending.
            </p>
          </div>

          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"> <p className="text-xs text-gray-500"> Transaction Reference </p> <p className="font-semibold text-gray-800 mt-1 tracking-wide"> {referenceNumber} </p> </div>
          
   

          <div className="mt-6">
            <h3 className="font-semibold text-gray-800">
              Email Transaction Receipt
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Enter your email address to receive a copy of your
              transaction details.
            </p>
          </div>

          <input
            type="email"
            value={receiptEmail}
            onChange={(e) => setReceiptEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-4 outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            type="button"
            onClick={sendReceiptEmail}
            disabled={receiptLoading}
            className="w-full bg-red-800 text-white py-3 rounded-lg mt-4 hover:bg-black transition disabled:opacity-50"
          >
            {receiptLoading ? "Sending Receipt..." : "Send Receipt"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg mt-3"
          >
            Skip
          </button>
        </>
      ) : (
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-2xl text-green-600">✓</span>
          </div>

          <h2 className="text-green-600 font-semibold text-xl mt-4">
            Receipt Sent
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Your transaction receipt has been sent to:
          </p>

          <p className="font-medium text-gray-800 mt-2 break-all">
            {receiptEmail}
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full bg-green-600 text-white py-3 rounded-lg mt-6"
          >
            Done
          </button>
        </div>
      )}
    </div>
  </div>
)}

     <StickyBottomNav/>
    </>
  );
};

export default SendMoney;
