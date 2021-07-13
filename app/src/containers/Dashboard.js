import React, { Component } from 'react';
import { AppDrawer} from '../components/Private'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { changePageTitle } from '../helpers/common'
import {CustomizedTable} from '../components/Tables'
import { apiGet } from '../helpers/APIRequests';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    CardTitle: {
        // fontSize: 25,
        textAlign: 'center',
        marginRight: '8%',
    },
});

const StatsCard = withStyles({
    root: {
        minWidth: 275,
    },
   
   
})(Card);

class Dashboard extends Component {

    constructor(props){
        super(props)
        this.state = {
            bylinks:[]
        }
    }
    getData = async () => {
        var dataFetched
        await apiGet("/api/url/user/user-bylinks/", (res)=> {
            this.setState({bylinks:res.bylinks})
            dataFetched = true
        }, err => { dataFetched = false})

        return dataFetched
    }
    async componentDidMount(){
        changePageTitle('Dashboard')
        const getDATA = await this.getData();
        if(!getDATA) 
            setTimeout(async() => {
                await this.getData()
            }, 1500);
        console.log(`getDATA`, getDATA)
       
    }
    render() {
        const { classes } = this.props;
        const { bylinks } = this.state
        const table_columns = [ 
            {title: 'URL', align:'left', key:'origUrl'}, 
            {title: 'Bylink', align:'center', key: 'shortUrl'}, 
            {title: 'Clicks', align:'center', key:'clicks'}, 
            {title: 'Last Clicked IP', align:'right', key:'ip_last_clicked'}, 
            {title: 'Created At', align:'center', key: 'date'},   
        ]
        return (
            <>
                <AppDrawer>
                <div className={classes.root}>
                    <Grid container spacing={3} direction="row" justify="space-between" >
                        <Grid item xs={12}>
                            <StatsCard>
                            <CardContent>
                                <Typography className={classes.CardTitle} variant="h6"  color="textSecondary" gutterBottom>
                                     My Bylinks
                                </Typography>
                                <CustomizedTable data={bylinks} columns={table_columns}/> 
                            </CardContent>
                            </StatsCard>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            
                        </Grid> */}
                        
                        
                    </Grid>
                    </div>
                </AppDrawer>
            </>
        );
    }
}

export default withStyles(useStyles)(Dashboard);