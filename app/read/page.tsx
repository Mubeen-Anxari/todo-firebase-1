"use client";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export default function page() {
  const [getData, setGetData] = useState<any>([]);
  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "AddData"));
      const userData = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setGetData(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {getData && getData.length > 0 ? (
        getData.map((user: any) => (
          <div
            key={user.id}
            className="mb-4 p-4 border rounded-md shadow-sm bg-white"
          >
            <h1 className="text-xl font-semibold">{user.firstName}</h1>
            <p className="text-gray-700">Last Name: {user.lastName}</p>
            <p className="text-gray-700">Email: {user.email}</p>
          </div>
        ))
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
