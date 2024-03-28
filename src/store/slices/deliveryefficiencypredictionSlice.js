// predictionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';

const initialState = {
    formData: {
        Type: '',
        MAT: '',
        TS: '',
        CT: '',
        TM: '',
        Shape: '',
        Size: null,
        ZetaPotential: null,
        Admin: null
    },
    analysisResult: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

// Async thunk for making the prediction API call
export const predictDeliveryEfficiency = createAsyncThunk('predictDeliveryEfficiency', async (formData, { rejectWithValue }) => {
    try {
        console.log(formData);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}delivery-efficiency`, formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const predictionSlice = createSlice({
    name: 'prediction',
    initialState,
    reducers: {
        resetAnalysisData: (state) => {
            state.formData = initialState.formData;
            state.analysisResult = initialState.analysisResult;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(predictDeliveryEfficiency.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(predictDeliveryEfficiency.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.analysisResult = action.payload;
            })
            .addCase(predictDeliveryEfficiency.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { resetAnalysisData } = predictionSlice.actions;

export const selectFormData = (state) => state.prediction.formData;
export const selectAnalysisResult = (state) => state.prediction.analysisResult;
export const selectAnalysisStatus = (state) => state.prediction.status;
export const selectAnalysisError = (state) => state.prediction.error;

export default predictionSlice.reducer;
//---------------------------------------------------
