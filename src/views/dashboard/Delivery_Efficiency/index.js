import React, { useState } from 'react';
import {
    Typography,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Collapse,
    Paper,
    Grid,
    TextField,
    InputAdornment
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';
import {
    predictDeliveryEfficiency,
    selectAnalysisResult,
    selectAnalysisStatus,
    resetAnalysisData
} from 'store/slices/deliveryefficiencypredictionSlice';

const initialFormData = {
    Type: '',
    MAT: '',
    TS: '',
    CT: '',
    TM: '',
    Shape: '',
    Size: 0.431364,
    ZetaPotential: -59.4,
    Admin: 0.0
};

const SamplePage = () => {
    const dispatch = useDispatch();
    // Redux selector to access data from the store
    const analysisResult = useSelector(selectAnalysisResult);
    const status = useSelector(selectAnalysisStatus);

    const [formData, setFormData] = useState(initialFormData);
    const [sizeInput, setSizeInput] = useState(initialFormData.Size.toString());
    const [zetaPotentialInput, setZetaPotentialInput] = useState(initialFormData.ZetaPotential.toString());
    const [adminInput, setAdminInput] = useState(initialFormData.Admin.toString());

    const handleDropdownChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSliderChange = (name) => (event, newValue) => {
        setFormData({
            ...formData,
            [name]: newValue
        });
        if (name === 'Size') setSizeInput(newValue.toString());
        else if (name === 'ZetaPotential') setZetaPotentialInput(newValue.toString());
        else if (name === 'Admin') setAdminInput(newValue.toString());
    };

    const handleSizeInputChange = (event) => {
        const newValue = event.target.value === '' ? '' : Number(event.target.value);
        setSizeInput(event.target.value);
        if (newValue >= 0.431364 && newValue <= 2.659441) {
            setFormData({ ...formData, Size: newValue });
        }
    };

    const handleZetaPotentialInputChange = (event) => {
        const newValue = event.target.value === '' ? '' : Number(event.target.value);
        setZetaPotentialInput(event.target.value);
        if (newValue >= -59.4 && newValue <= 71.3) {
            setFormData({ ...formData, ZetaPotential: newValue });
        }
    };

    const handleAdminInputChange = (event) => {
        const newValue = event.target.value === '' ? '' : Number(event.target.value);
        setAdminInput(event.target.value);
        if (newValue >= 0.0 && newValue <= 1292.0) {
            setFormData({ ...formData, Admin: newValue });
        }
    };

    const handleResetAll = () => {
        setFormData(initialFormData); // Reset the form data to initial values
        dispatch(resetAnalysisData());
    };

    const typeOptions = ['INM', 'ONM', 'Hybrid'];
    const matOptions = ['Gold', 'Iron Oxide', 'Hybrid', 'Silica', 'Polymeric', 'Liposome', 'Hydrogel', 'Dendrimer', 'Other OM', 'Other IM'];
    const tsOptions = ['Active', 'Passive'];
    const ctOptions = [
        'Cervix',
        'Colon',
        'Brain',
        'Breast',
        'Skin',
        'Prostate',
        'Ovary',
        'Pancreas',
        'Lung',
        'Sarcoma',
        'Liver',
        'Glioma',
        'Others'
    ];
    const tmOptions = ['Xenograft Heterotopic', 'Xenograft Orthotopic', 'Allograft Heterotopic', 'Allograft Orthotopic'];
    const shapeOptions = ['Rod', 'Spherical', 'Plate', 'Others'];

    // Function to log formData to console
    const handlePredict = () => {
        console.log(formData);
        dispatch(predictDeliveryEfficiency(formData));
    };

    return (
        <MainCard title="Model Prediction">
            <Grid container spacing={2}>
                {/* Input Fields Column */}
                <Grid item xs={12} md={status === 'succeeded' ? 8 : 12}>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" marginBottom="16px">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleResetAll}
                            style={{ alignSelf: 'flex-start', marginBottom: '20px' }}
                        >
                            Reset All
                        </Button>

                        {/* Form Fields Here */}
                        {/* Row for Type and MAT dropdowns */}
                        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="16px" marginTop="16px">
                            <FormControl variant="outlined" style={{ width: '48%' }}>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    name="Type"
                                    value={formData.Type}
                                    onChange={handleDropdownChange}
                                    label="Type"
                                >
                                    {typeOptions.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" style={{ width: '48%' }}>
                                <InputLabel id="mat-label">MAT</InputLabel>
                                <Select
                                    labelId="mat-label"
                                    id="mat"
                                    name="MAT"
                                    value={formData.MAT}
                                    onChange={handleDropdownChange}
                                    label="MAT"
                                >
                                    {matOptions.map((mat) => (
                                        <MenuItem key={mat} value={mat}>
                                            {mat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Row for TS and CT dropdowns */}
                        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="16px">
                            <FormControl variant="outlined" style={{ width: '48%' }}>
                                <InputLabel id="ts-label">TS</InputLabel>
                                <Select labelId="ts-label" id="ts" name="TS" value={formData.TS} onChange={handleDropdownChange} label="TS">
                                    {tsOptions.map((ts) => (
                                        <MenuItem key={ts} value={ts}>
                                            {ts}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" style={{ width: '48%' }}>
                                <InputLabel id="ct-label">CT</InputLabel>
                                <Select labelId="ct-label" id="ct" name="CT" value={formData.CT} onChange={handleDropdownChange} label="CT">
                                    {ctOptions.map((ct) => (
                                        <MenuItem key={ct} value={ct}>
                                            {ct}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Row for TM and Shape dropdowns */}
                        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="25px">
                            <FormControl variant="outlined" style={{ width: '48%' }}>
                                <InputLabel id="tm-label">TM</InputLabel>
                                <Select labelId="tm-label" id="tm" name="TM" value={formData.TM} onChange={handleDropdownChange} label="TM">
                                    {tmOptions.map((tm) => (
                                        <MenuItem key={tm} value={tm}>
                                            {tm}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" style={{ width: '48%' }}>
                                <InputLabel id="shape-label">Shape</InputLabel>
                                <Select
                                    labelId="shape-label"
                                    id="shape"
                                    name="Shape"
                                    value={formData.Shape}
                                    onChange={handleDropdownChange}
                                    label="Shape"
                                >
                                    {shapeOptions.map((shape) => (
                                        <MenuItem key={shape} value={shape}>
                                            {shape}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Sliders */}
                        <Box display="flex" flexDirection="column" width="95%" gap="20px" marginBottom="16px" marginLeft="18px">
                            <Typography gutterBottom> Size </Typography>
                            <Slider
                                value={formData.Size}
                                onChange={handleSliderChange('Size')}
                                valueLabelDisplay="auto"
                                min={0.431364}
                                max={2.659441}
                                step={0.000001}
                                aria-labelledby="size-slider"
                                sx={{
                                    '& .MuiSlider-track': {
                                        color: 'transparent'
                                    },
                                    '& .MuiSlider-rail': {
                                        color: '#2196f3' // Use your desired color for the rail
                                    }
                                }}
                            />
                            <TextField
                                value={sizeInput}
                                onChange={handleSizeInputChange}
                                margin="dense"
                                type="number" // Ensures only numerical input is allowed
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">µm</InputAdornment>, // Optional, if you want to add units
                                    inputProps: {
                                        min: 0.431364, // Minimum value, matching the slider
                                        max: 2.659441, // Maximum value, matching the slider
                                        step: 0.000001 // Step value, matching the slider
                                    }
                                }}
                                variant="outlined"
                            />
                            <Typography gutterBottom> Zeta Potential </Typography>
                            <Slider
                                value={formData.ZetaPotential}
                                onChange={handleSliderChange('ZetaPotential')}
                                valueLabelDisplay="auto"
                                min={-59.4}
                                max={71.3}
                                step={0.01}
                                aria-labelledby="zeta-potential-slider"
                                sx={{
                                    '& .MuiSlider-track': {
                                        color: 'transparent'
                                    },
                                    '& .MuiSlider-rail': {
                                        color: '#2196f3' // Use your desired color for the rail
                                    }
                                }}
                            />
                            <TextField
                                value={zetaPotentialInput}
                                onChange={handleZetaPotentialInputChange}
                                margin="dense"
                                type="number"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mV</InputAdornment>
                                }}
                            />
                            <Typography gutterBottom> Admin </Typography>
                            <Slider
                                value={formData.Admin}
                                onChange={handleSliderChange('Admin')}
                                valueLabelDisplay="auto"
                                min={0.0}
                                max={1292.0}
                                step={0.1}
                                aria-labelledby="admin-slider"
                                sx={{
                                    '& .MuiSlider-track': {
                                        color: 'transparent'
                                    },
                                    '& .MuiSlider-rail': {
                                        color: '#2196f3' // Use your desired color for the rail
                                    }
                                }}
                            />
                            <TextField
                                value={adminInput}
                                onChange={handleAdminInputChange}
                                margin="dense"
                                type="number"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mg/kg</InputAdornment>
                                }}
                            />
                        </Box>

                        <Box display="flex" justifyContent="center" width="100%" marginTop="20px">
                            {status !== 'succeeded' && (
                                <Button variant="contained" color="primary" onClick={handlePredict}>
                                    Predict
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Grid>

                {/* Animation for displaying the output */}
                {status === 'succeeded' && (
                    <Grid item xs={12} md={4}>
                        <Box display="flex" justifyContent="center" width="100%" marginTop="20px">
                            <Collapse in={status === 'succeeded'} style={{ width: '100%' }}>
                                {status === 'loading' && <Typography textAlign="center">Loading...</Typography>}
                                {status === 'succeeded' && (
                                    <Box sx={{ mt: 2, width: '100%' }} className="predicted-container">
                                        <Typography variant="h6" gutterBottom className="predicted-label" textAlign="center">
                                            Prediction Results:
                                        </Typography>
                                        <Typography className="predicted-value">
                                            <Grid container spacing={2} justifyContent="center">
                                                {Object.entries(analysisResult).map(([key, value]) => (
                                                    <Grid item xs={12} sm={6} md={12} key={key}>
                                                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                                                            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                                                {key.replace(/_/g, ' ')}
                                                            </Typography>
                                                            <Typography variant="h4" sx={{ mt: 2 }}>
                                                                <span style={{ color: '#2196f3' }}> {value.toFixed(8)} </span>
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Typography>
                                    </Box>
                                )}
                                {status === 'failed' && <Typography textAlign="center">Error in prediction. Please try again.</Typography>}
                            </Collapse>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </MainCard>
    );
};

export default SamplePage;
