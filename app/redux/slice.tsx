import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Define the UserData interface
interface UserData {
  id?: string;
  title?: string;  // Adjust according to your Firestore data structure
  // Add other fields if necessary
}

// Define the CounterState interface
export interface CounterState {
  todos: UserData[];
}

const initialState: CounterState = {
  todos: [],
};

// Thunk for deleting a document by ID
export const deleteDocById = createAsyncThunk<void, string>(
  "user/deleteDocById",
  async (id: string) => {
    await deleteDoc(doc(db, "AddData", id));
  }
);



export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle successful deletion
    builder.addCase(deleteDocById.fulfilled, (state, action) => {
      // Ensure the `id` is used for filtering
      state.todos = state.todos.filter((todo) => todo.id !== action.meta.arg);
    });

  },
});

export const {} = counterSlice.actions;
export default counterSlice.reducer;
