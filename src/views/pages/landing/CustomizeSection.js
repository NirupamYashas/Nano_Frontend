// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardMedia, Container, Grid, Link, Stack, Typography, CardContent } from '@mui/material';

// assets
import SubCard from 'ui-component/cards/SubCard';
import homepageImg from 'assets/images/landing/Nano-AI-QSAR.jpeg';
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
                        <Grid item xs={12} md={12} sx={{ img: { width: '100%' }, marginTop: 5, marginBottom: 5, paddingRight: 0 }}>
                            <Stack sx={{ width: '100%', mx: 'auto' }}>
                                <CardMedia component="img" image={homepageImg} alt="Layer" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} md={12}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h2"
                                            color="primary"
                                            align="center"
                                            sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}
                                        >
                                            Introduction
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography sx={listSX}>
                                            <IconCircleCheck size={33} />
                                            The objective of the Nano-AI-QSAR model web dashboard is to provide a tool to predict
                                            nanoparticle&apos;s delivery efficacy in major tissues (heart, liver, lung, kidney, and spleen)
                                            and tumor.
                                        </Typography>
                                        <Typography sx={listSX}>
                                            <IconCircleCheck size={37} />
                                            Users only need to enter several input features, such as physicochemical properties of a
                                            nanoparticle and some experimental design information, and then can run the model to generate
                                            relevant predictions.
                                        </Typography>
                                        <Typography sx={listSX}>
                                            <IconCircleCheck size={45} />
                                            These predictions can help determine the relationship among the nanoparticle&apos;s
                                            physicochemical properties, target tissue delivery efficacy, and therapy strategies, ultimately
                                            providing useful information to design safe and more efficient cancer nanomedicines
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            </Grid>
        </Container>
    );
};

export default CustomizeSection;
