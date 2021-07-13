import React,{useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Collapse, IconButton,
  CircularProgress, Typography
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  statsTableHead:{
    backgroundColor:'#541712'
  }
});


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  loading:{
    display: "block",
    justifyContent: "center",
    // marginLeft: "-8vw"
    //  marginLeft: "50%",
    // marginRight: "44%",
    width: "100px", height: "100px",
  },
  loadingProgressOuter:{
    borderLeftStyle: "none",
    borderRightStyle: "none",
    borderRadius: "64px",
    borderTopStyle: "dotted",
    borderBottomStyle: "dotted",
    "& svg":{
      opacity: 0
    }
  },
  loadingProgressInner:{
    // position: "absolute",
    // top: "25.5vh",
    // left: "2.5vw" ,
    marginLeft: "10%", 
    // marginTop: "-5vw", 
    marginTop: "-95%", 
    display: "flex",
    borderLeftStyle: "dotted",
    borderRightStyle: "dotted",
    borderRadius: "64px",
    borderTopStyle: "none",
    borderBottomStyle: "none",
    "& svg":{
      opacity: 0
    }
  },
  LoadingContainer:{ 
    width: "14%", margin: "10px auto"
  }
});
const Loading = () => {
  const classes = useStyles();
  return(
    <div className={classes.LoadingContainer}>

      <div className={classes.loading}> 
        <CircularProgress size={100} thickness={2} className={classes.loadingProgressOuter}/>
        <CircularProgress size={80}  thickness={1} className={classes.loadingProgressInner} color="secondary"/>

      </div>
    </div>
  )
}
const GoogleMapLink = props => {
  const {lat, long} = props
  var {area} = props
  if(area > 1) area = 15
  const url = `https://www.google.com/maps/@${lat},${long},${area}z`
  return (
    <a href={url} target="_blank" rel="noreferrer">{url}</a>
  )
  
}
function Row(props) {
  const { row, columns } = props
  const [open, setOpen] = useState(false)
   const classes = useRowStyles()
  var c_ips = []
  return (
    <>
      <StyledTableRow>
          <StyledTableCell>
            {(row.clicks_ip.length >= 1 && (row.clicks_ip.location !== null || row.clicks_ip.location !== undefined)) &&
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton> 
            }
          </StyledTableCell>
          {columns.map((c,i) => (
            <StyledTableCell align={i === (columns.length-1) ? 'right':c.align} key={c.key}>{row[c.key]}</StyledTableCell>
          ))}
      </StyledTableRow> 
      <StyledTableRow>
      {(row.clicks_ip.length >= 1 && (row.clicks_ip.location !== null || row.clicks_ip.location !== undefined))  ? (
        <>
        <StyledTableCell style={{display: open ? 'table-cell': 'none'}}>
        <Typography variant="h6" gutterBottom component="div">
                Clicks Stats
              </Typography>
          </StyledTableCell>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0, display: open ? 'table-cell': 'none' }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
             
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                      <StyledTableCell className={classes.statsTableHead}>No. of Clicks</StyledTableCell>
                      <StyledTableCell className={classes.statsTableHead}>IP Address</StyledTableCell>
                      <StyledTableCell className={classes.statsTableHead}>City/Region/Country</StyledTableCell>
                      <StyledTableCell className={classes.statsTableHead}>Map Link</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.clicks_ip.map((s,o) => {
                    if(c_ips.length === 0) c_ips.push(s.clientip) //runs 1st time
                    else{
                      if(c_ips.includes(s.clientip)) {
                        // return (null)
                      }
                      else {
                        c_ips.push(s.clientip)
                      }
                    }
                    return(
                    <TableRow key={o}>
                      <StyledTableCell>{s.count}</StyledTableCell> 
                      <StyledTableCell>{s.clientip}</StyledTableCell> 
                      <StyledTableCell>{s.location !== null && s.location.city+'/'+ s.location.region+'/'+s.location.country }</StyledTableCell>
                      <StyledTableCell>{s.location !== null && <GoogleMapLink lat={s.location.ll[0]} long={s.location.ll[1]} area={s.location.area} />}</StyledTableCell>
                        
                    </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
        </>
       ) : null } 
       </StyledTableRow>
    </>
  )
}

export default function CustomizedTable(props) {
  const classes = useStyles();
  const {columns, data} = props
  
  return (
    <>
    {data.length === 0 ? <Loading />: 
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            {columns.map(c => (
              <StyledTableCell align={c.align} key={c.title}>{c.title}</StyledTableCell> 
            ))}

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row}  columns={columns} /> 
            // <StyledTableRow key={row.name}>
            //   {columns.map((c,i) => (
            //     <StyledTableCell align={i === (columns.length-1) ? 'right':c.align} key={c.key}>{row[c.key]}</StyledTableCell>
            //   ))}
            // </StyledTableRow> 
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
    </>
  );
}