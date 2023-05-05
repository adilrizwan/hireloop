import * as React from 'react';
import { List, Box, ListItem, ListItemText, TextField, Button, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { theme, pageSize } from '../../constants/theme'
import { toast } from 'react-toastify'
import { buttonPlacement } from '../../constants/theme';
import axios from 'axios'
import { fieldNames } from '../../constants/selectMenus';

export function FindJobs() {
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [inputs, setInputs] = useState([]);
    const [availableId, setavailableId] = useState([1, 3, 5, 7, 9, 11, 13, 15]);
    const token = localStorage.getItem('user');

    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index].value = event.target.value;
        setInputs(newInputs);
    };
    const handleFieldClick = async (fieldName) => {
        let field = fieldName.toLowerCase();
        if (availableId.length > 0) {
            console.log(availableId)
            const id = availableId.shift();
            const newInputs = [...inputs, { id: id, value: field }, { id: id + 1, value: "" }];
            setInputs(newInputs);
            setavailableId(availableId);
            console.log(availableId)

        } else {
            toast.error("Cannot add any more fields.");
        }
    };
    const deleteField = (id) => {
        console.log(availableId)
        const newInputs = inputs.filter((input) => input.id !== id && input.id !== id - 1);
        const deletedId = id - 1;

        if (!availableId.includes(deletedId)) {
            setavailableId([...availableId, deletedId]);
        }

        setInputs(newInputs);
        console.log(availableId)

    };

    const onSubmit = async (event, page) => {
        event.preventDefault();
        try {
            let obj = {};
            for (let i = 0; i < inputs.length; i = i + 2) {
                obj[inputs[i].value] = inputs[i + 1].value;
            }
            const response = await axios.get('/applicant/jobs/search', {
                headers: {
                    Authorization: `${token}`
                },
                params: {
                    ...obj,
                    page: page
                }
            });
            setData(response.data);
            const totalCount = parseInt((response.data.Results.split(" "))[3]);
            setTotalPages(Math.ceil(totalCount / pageSize));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async (event, value) => {
        event.preventDefault();
        await onSubmit(event, value);
        setCurrentPage(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        mt: 3,
                        mb: 3,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h6" fontSize={18} align='center'>
                        Find Jobs
                    </Typography>
                    <Grid align='center'>
                        <Typography sx={{ mb: 1, mt: 1 }} variant="caption" fontSize={14} align="left">
                            {fieldNames.map((fieldName) => (
                                <Button
                                    key={fieldName}
                                    onClick={() => handleFieldClick(fieldName)}
                                    sx={{ mr: 1 }}
                                >
                                    {fieldName}
                                </Button>
                            ))}
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        {inputs.map((input, index) => (
                            <React.Fragment key={input.id}>
                                {index % 2 === 0 && (
                                    <Grid item>
                                        <TextField
                                            type="text"
                                            value={input.value}
                                            variant="standard"
                                        />
                                    </Grid>
                                )}
                                {index % 2 !== 0 && (
                                    <Grid item>
                                        <TextField
                                            type="text"
                                            value={input.value}
                                            onChange={(event) => handleInputChange(index, event)}
                                            variant="standard"
                                            InputProps={{

                                                endAdornment: (
                                                    <IconButton
                                                        onClick={() => deleteField(input.id)}
                                                        sx={{ padding: 0 }}
                                                    >
                                                        {/* <ClearIcon fontSize="small" /> */}
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>


                    <Grid align='center'>
                        <Button
                            style={buttonPlacement}
                            variant="contained"
                            size='large'
                            onClick={onSubmit}
                            color="primary">
                            Search
                        </Button>
                    </Grid>
                    <Typography variant="h6" fontSize={18} align='center'>
                        Search Results
                    </Typography>
                    <Typography sx={{ mb: 1, mt: 1 }} variant='caption' fontSize={14} align='right'>{data.Results}</Typography>
                    {data.SearchResults && data.SearchResults.length > 0 ? (
                        <List>
                            {data.SearchResults && data.SearchResults.map((result, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={result.title} secondary={result.companyName}
                                    />
                                    <Box>
                                        <Button
                                            style={{ margin: "10px" }}
                                            variant="contained"
                                            size='small'
                                            color="secondary">
                                            View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size='small'
                                            color="accent">
                                            Apply
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography align='center'>No results found.</Typography>
                    )}
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleSearch}
                        color="primary"
                        sx={{
                            marginTop: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            '& .Mui-selected': {
                                color: 'primary.main',
                            },
                        }}
                    />
                </Paper>
            </Grid >
        </ThemeProvider >
    );
}