// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardMedia, Container, Grid, Link, Stack, Typography, CardContent } from '@mui/material';

// assets
import SubCard from 'ui-component/cards/SubCard';
import homepageImg from 'assets/images/landing/homepageimg.jpeg';
import { IconCircleCheck } from '@tabler/icons';
import SkeletonTotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| LANDING - CUSTOMIZE ||============================== //

const CustomizeSection = () => {
    const theme = useTheme();
    const listSX = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '10px 0',
        fontSize: '1rem',
        color: theme.palette.grey[900],
        svg: { color: theme.palette.secondary.main }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container justifyContent="space-between" alignItems="center" spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}>
                <MainCard content={false} sx={{ marginLeft: 2, marginTop: 8 }}>
                    <CardContent>
                        <Grid item xs={12} md={12} sx={{ img: { width: '100%' }, marginTop: 5, marginBottom: 10, paddingRight: 5 }}>
                            <Stack sx={{ width: '90%', mx: 'auto' }}>
                                <CardMedia component="img" image={homepageImg} alt="Layer" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        <SkeletonTotalIncomeCard />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SkeletonTotalIncomeCard />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </CardContent>
                </MainCard>
            </Grid>
        </Container>
    );
};

export default CustomizeSection;
