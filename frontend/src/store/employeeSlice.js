import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addEmployee = createAsyncThunk(
  'addEmployee',
  async (data, { rejectWithValue }) => {
    // console.log(data);
    try {
      const response = await fetch('http://127.0.0.1:8000/employees/', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const showEmployeeList = createAsyncThunk(
  'showEmployeeList',
  async (args = 'http://127.0.0.1:8000/employees/', { rejectWithValue }) => {
    try {
      const response = await fetch(args, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/employees/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) return id;
      else throw new Error('Failed to delete!');
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const editEmployee = createAsyncThunk(
  'editEmployee',
  async (data, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('mobile', data.mobile);
    formData.append('date_of_birth', data.date_of_birth);

    if (data.image) {
      formData.append('image', data.image);
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/employees/${data.id}/`,
        {
          method: 'PUT',
          body: formData,
        }
      );
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: {
    employees: [],
    defaultEmployees: [],
    loading: false,
    error: null,
    message: null,
    searchData: [],
    next: null,
    previous: null,
    direction: null,
    searchData: null,
  },

  reducers: {
    sortEmployeeByType: (state, action) => {
      const type = action.payload;
      if (type === 'default') {
        state.direction = null;
        state.employees = [...state.defaultEmployees];
      } else {
        if (state.direction)
          state.direction = state.direction === 'asc' ? 'des' : 'asc';
        else state.direction = 'asc';
        state.employees = state.employees.sort((a, b) => {
          const valueA = a[type].toString().toLowerCase();
          const valueB = b[type].toString().toLowerCase();
          if (valueA < valueB) return state.direction === 'asc' ? -1 : 1;
          if (valueA > valueB) return state.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
    },

    searchEmployeeData: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.direction = null;
        state.message = 'Employee Added!';
        state.employees.unshift(action.payload);
        state.defaultEmployees = state.employees;
      })
      .addCase(addEmployee.rejected, (state) => {
        state.message = 'Some Error Occured';
      })
      .addCase(showEmployeeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(showEmployeeList.fulfilled, (state, action) => {
        state.loading = false;
        state.direction = null;
        state.employees = action.payload.results;
        state.defaultEmployees = state.employees;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(showEmployeeList.rejected, (state) => {
        state.message = 'Some Error Occured';
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (ele) => ele.id !== action.payload
        );
        state.defaultEmployees = state.employees;
      })
      .addCase(deleteEmployee.rejected, (state) => {
        state.message = 'Some Error Occured';
      })
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
        state.defaultEmployees = state.employees;
      })
      .addCase(editEmployee.rejected, (state) => {
        state.message = 'Some Error Occured';
      });
  },
});

export default employeeSlice.reducer;

export const { sortEmployeeByType, searchEmployeeData } = employeeSlice.actions;
