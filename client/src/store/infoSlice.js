import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// create data
export const createData = createAsyncThunk(
  "createData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/example`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// fetch data
export const fetchData = createAsyncThunk(
  "fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/example`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// fetch single data
export const fetchSingleData = createAsyncThunk(
  "fetchSingleData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/example/${id}`
      );
      return response.data.example;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update single data
export const updateSingleData = createAsyncThunk(
  "updateSingleData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/example/${data.id}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update single data
export const deleteSingleData = createAsyncThunk(
  "deleteSingleData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/example/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const infobase = createSlice({
  name: "infobase",
  initialState: {
    infos: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createData.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(createData.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(fetchData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.infos = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchSingleData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSingleData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchSingleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateSingleData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateSingleData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSingleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default infobase.reducer;
