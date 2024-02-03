import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { fetchAndProcessData } from './drugData';
import { useDispatch, useSelector } from 'store';
import { predictHalfLife, resetPredictionData } from 'store/slices/singleinputpredictionSlice';

const speciesData = [
    { id: 1, name: 'Cattle' },
    { id: 2, name: 'Chickens' },
    { id: 3, name: 'Goats' },
    { id: 4, name: 'Sheep' },
    { id: 5, name: 'Swine' },
    { id: 6, name: 'Turkeys' }
];

const SamplePage = () => {
    const dispatch = useDispatch();
    // Redux selector to access data from the store
    const predictionData = useSelector((state) => state.prediction);
    // const [isDataAvailable, setIsDataAvailable] = useState(false);

    // useEffect(() => {
    //     if (predictionData[0] && predictionData[0].LambdaZHl !== undefined) {
    //         setIsDataAvailable(true);
    //     }
    // }, [predictionData]);
    // Add an effect to monitor changes in predictionData
    // useEffect(() => {
    //     if (predictionData.length > 0) {
    //         const firstPrediction = predictionData[0];
    //         console.log(firstPrediction);
    //     }
    // }, [predictionData]);

    const [selectedDrug, setSelectedDrug] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [showSpecies, setShowSpecies] = useState(false);
    const [drugData, setDrugData] = useState([]);
    const [casNumber, setCasNumber] = useState('');

    const handleDrugSelectChange = (event) => {
        const selectedDrugId = event.target.value;
        setSelectedDrug(selectedDrugId);
        setShowSpecies(true);

        // Find the selected drug by its ID
        const selectedDrugObj = drugData.find((drug) => drug.id === selectedDrugId);
        if (selectedDrugObj) {
            // Set the CAS number in the CAS number state
            setCasNumber(selectedDrugObj.cas);
        }
    };

    const handleSpeciesSelectChange = (event) => {
        setSelectedSpecies(event.target.value);
    };

    const handleResetAll = () => {
        setSelectedDrug('');
        setSelectedSpecies('');
        setShowSpecies(false);
        setCasNumber('');
        dispatch(resetPredictionData());
    };

    useEffect(() => {
        // Fetch and process the drug data when the component mounts
        fetchAndProcessData()
            .then((data) => {
                setDrugData(data);
                console.log(drugData);
            })
            .catch((error) => {
                console.error('Error loading drug data:', error);
            });
    }, []);

    const handlePredictHalfLife = async (event) => {
        event.preventDefault();
        const formData = { CAS: casNumber, Species: selectedSpecies };

        console.log(formData);

        // Dispatch the predictHalfLife action with the form data
        dispatch(predictHalfLife(formData));
    };

    return (
        <MainCard title="Model Prediction">
            <Box display="flex" flexDirection="column" alignItems="flex-start" marginBottom="16px">
                <Button variant="contained" color="secondary" onClick={handleResetAll} style={{ alignSelf: 'flex-start' }}>
                    Reset All
                </Button>
                <Typography variant="h4" style={{ marginTop: '16px' }}>
                    <strong>Select the Drug Data</strong>
                </Typography>
                <FormControl variant="outlined" style={{ minWidth: 400, marginTop: '16px' }}>
                    <InputLabel id="select-drug-label">Select Drug</InputLabel>
                    <Select
                        labelId="select-drug-label"
                        id="select-drug"
                        value={selectedDrug}
                        onChange={handleDrugSelectChange}
                        label="Select Drug"
                    >
                        {drugData.map((drug) => (
                            <MenuItem key={drug.id} value={drug.id}>
                                {drug.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box marginTop="16px" marginBottom="16px">
                <TextField
                    label="CAS Number"
                    variant="outlined"
                    value={casNumber}
                    InputProps={{
                        readOnly: true
                    }}
                />
            </Box>

            {showSpecies && (
                <>
                    <Typography variant="h4">
                        <strong>Select Species:</strong>
                    </Typography>
                    <FormControl variant="outlined" style={{ minWidth: 200, marginTop: '16px' }}>
                        <InputLabel id="select-species-label">Select Species</InputLabel>
                        <Select
                            labelId="select-species-label"
                            id="select-species"
                            value={selectedSpecies}
                            onChange={handleSpeciesSelectChange}
                            label="Select Species"
                        >
                            {speciesData.map((species) => (
                                <MenuItem key={species.id} value={species.name}>
                                    {species.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            )}

            <Box display="flex" justifyContent="center" marginTop={4}>
                <Button variant="contained" color="primary" onClick={handlePredictHalfLife}>
                    Predict Half Life
                </Button>
            </Box>

            {/* Conditional rendering to display the response data */}
            {predictionData.LambdaZHl && (
                <Box marginTop={2} className="predicted-container">
                    <Typography variant="h6" className="predicted-label">
                        Predicted Half Life:
                    </Typography>
                    <Typography className="predicted-value">{`${predictionData.LambdaZHl} hrs`}</Typography>
                </Box>
            )}
        </MainCard>
    );
};

export default SamplePage;
