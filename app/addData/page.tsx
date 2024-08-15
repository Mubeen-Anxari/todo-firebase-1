"use client";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { deleteDocById } from "../redux/slice";

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string; 
}

export default function AddUser() {
  const todos = useAppSelector(state => state.counter.todos);
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [getData, setGetData] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: UserDetails = {
      firstName,
      lastName,
      email,
      password,
    };

    const ref = collection(db, "AddData");
    try {
      await addDoc(ref, data);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword(""); 
      fetchData(); // Refetch data to update the list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "AddData"));
      const userData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setGetData(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteDocById(id)).unwrap();
      setGetData(getData.filter(user => user.id !== id)); // Update state directly
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add User Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add User
          </button>
        </form>
      </div>
      <div className="mt-6 w-full max-w-lg">
        {getData.length > 0 ? (
          getData.map((user) => (
            <div
              key={user.id}
              className="mb-4 p-4 border rounded-md shadow-sm bg-white"
            >
              <h1 className="text-xl text-black font-semibold">{user.firstName}</h1>
              <p className="text-gray-700">Last Name: {user.lastName}</p>
              <p className="text-gray-700">Email: {user.email}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
}
