import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk("fetchTodos", async () => {
  const response = await fetch("/api/task");
  const data = response.json();
  return data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    isLoading: true,
    isError: false,
    isUpdate: null,
  },
  reducers: {
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
    setIsUpdateNull: (state, action) => {
      state.isUpdate = null;
    },
    addItem: (state, action) => {
      state.todos.push(action.payload);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((ele) => ele._id !== id);
    },
    updateTaskStore: (state, action) => {
      const id = action.payload._id;
      state.todos.forEach((ele) => {
        if (ele._id === id) {
          ele.title = action.payload.title;
          ele.description = action.payload.description;
          ele.catagory = action.payload.catagory;
          ele.targetDate = action.payload.targetDate;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload.allTask;
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {
      console.log("🔥🔥🔥🔥🔥 Error -->", action.payload);
      state.isError = true;
    });
  },
});

export const {
  addItem,
  removeItem,
  setIsUpdate,
  setIsUpdateNull,
  updateTaskStore,
} = todoSlice.actions;

export default todoSlice.reducer;
