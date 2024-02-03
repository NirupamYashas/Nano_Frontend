import React, { useState } from 'react';
import { Typography, Checkbox, FormControlLabel, FormGroup, Grid, Button, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import drugData from './drugData';

const speciesData = [
    { id: 1, name: 'Cattle' },
    { id: 2, name: 'Chicken' },
    { id: 3, name: 'Goats' },
    { id: 4, name: 'Sheep' },
    { id: 5, name: 'Swine' },
    { id: 6, name: 'Turkey' }
];

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    const [selectedDrugs, setSelectedDrugs] = useState([]);
    const [showSpecies, setShowSpecies] = useState(false);

    const handleDrugCheckboxChange = (event) => {
        const drugId = event.target.value;
        setSelectedDrugs((prevSelectedDrugs) => {
            const updatedSelectedDrugs = prevSelectedDrugs.includes(drugId)
                ? prevSelectedDrugs.filter((id) => id !== drugId)
                : [...prevSelectedDrugs, drugId];

            setShowSpecies(updatedSelectedDrugs.length > 0);
            return updatedSelectedDrugs;
        });
    };

    const handleCheckAll = () => {
        const allDrugIds = drugData.map((drug) => drug.id.toString());
        setSelectedDrugs(allDrugIds);
        setShowSpecies(true);
    };

    const handleResetAll = () => {
        setSelectedDrugs([]);
        setShowSpecies(false);
    };

    return (
        <MainCard title="Model Prediction">
            <Typography variant="h4">
                <strong>Select the Drug Data</strong>
            </Typography>
            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                <Button variant="contained" color="primary" onClick={handleCheckAll} style={{ marginRight: '16px' }}>
                    Check All
                </Button>
                <Button variant="contained" color="secondary" onClick={handleResetAll}>
                    Reset All
                </Button>
            </div>

            <Grid container spacing={2} style={{ marginBottom: '16px' }}>
                {drugData.map((drug) => (
                    <Grid item xs={6} sm={4} md={3} key={drug.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedDrugs.includes(drug.id.toString())}
                                    onChange={handleDrugCheckboxChange}
                                    value={drug.id.toString()}
                                />
                            }
                            label={drug.name}
                        />
                    </Grid>
                ))}
            </Grid>

            {showSpecies && (
                <>
                    <Typography variant="h4">
                        <strong>Select Species:</strong>
                    </Typography>
                    <Box display="flex" flexWrap="wrap" marginTop={2}>
                        {speciesData.map((species) => (
                            <FormControlLabel
                                key={species.id}
                                control={<Checkbox />}
                                label={species.name}
                                style={{ marginRight: '16px' }}
                            />
                        ))}
                    </Box>
                </>
            )}

            {/* "Predict Half Life" button */}
            <Box display="flex" justifyContent="center" marginTop={4}>
                <Button variant="contained" color="primary">
                    Predict Half Life
                </Button>
            </Box>
        </MainCard>
    );
};

export default SamplePage;
