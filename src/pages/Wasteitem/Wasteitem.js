// import React, { Component } from 'react';
// import { Link as RouterLink} from 'react-router-dom';
// import Button from '@material-ui/core/Button'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
// import AppBar from '@material-ui/core/AppBar'
// import TextField from '@material-ui/core/TextField'
// import './Wasteitem.css'
// import Navbar from '../../components/navbar/Navbar.js'
// import { Grid, Container, Paper } from '@material-ui/core';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import plasticImg from '../GreenCart/Images/PlasticBottles.jpg'
// import eWasteImg from '../GreenCart/Images/e-waste.jpg'
// import glassImg from '../GreenCart/Images/glass.jpg'



// class Wasteitem extends Component{

//     // This is a state that holds the current values of variables we are interested in.
//     // In this case, they are count for plastic bottles and batteries
//     state = {updating_qty:null}
    
//     // Handle Change to text fields
//     // Honestly not entirely clear how this works, but I believe it's the handleChange('[input]')
//     // which determines which fields are updated in props. Something like that :)
//     handleChange = input => e => {
//         this.setState({[input]: e.target.value})
//     }

//     // Can possibly remove this
//     handleClick = input => e => {
//         this.setState({[input]: 1})
//     }


//     handleClickOpen = e=>{
//         console.log(e)
//         if (e=='plastic'){
//             this.setState({plastic_dialog: true})
//         }
//         if (e=='ewaste'){
//             this.setState({ewaste_dialog: true})
//         }
//         if (e=='glass'){
//             this.setState({glass_dialog: true})
//         }
//     };

//     handleClose = e =>  {
//         this.setState({plastic_dialog: false, ewaste_dialog: false, glass_dialog: false, updating_qty: null});
//     };

//     handleSubmitandClose = input => e => {
//         console.log(input)
//         if (this.state.updating_qty==null){
//             this.setState({dialog: false});
//         } else{
//             var new_qty = this.state.updating_qty
//             this.setState({plastic_dialog: false, ewaste_dialog: false, glass_dialog: false, [input]: new_qty, updating_qty: null})
//         }
//     }


    

//   render(){
//     console.log(this.state)
    
//     return(
//         <div class="waste_item_content">
//             <Navbar/>
//             <div class="waste_selection">
//             <section id="test">
//             {/* MuiThemeProvider only accepts one element, so everyting is wrapped in a div*/}
//             <MuiThemeProvider>
//             <div>
                
//                 {/* Material UI comes with an AppBar, but I'm not sure if you can use it across
//                 multiple pages */}
//                 <AppBar title="Select stuff you want to dispose!"/>
                
//                 {/* Grid is used for formatting */}
//                 <Grid
//                     container="true"
//                     direction="column"
//                     justify="center"
//                     alignItems="center"
//                     spacing={3}>

//                 {/* Plastic Bottles */}
//                     <Grid
//                         item
//                         direction="column"
//                         justify="center"
//                         alignItems="center">
//                         <Paper elevation={3} variant="outlined">
//                         <Grid 
//                             container
//                             direction="row"
//                             justify="space-around"
//                             alignItems="center"
//                             spacing={2}>
//                             <Grid item><img src={plasticImg} /></Grid>
//                             <Grid item>
//                                 {(this.state.plastic_bottle!=null)? <p>{this.state.plastic_bottle}</p> : <p>0</p>}
//                                 <Button target="plastic" variant="contained" size="medium" onClick={this.handleClickOpen.bind(this, "plastic")}>
//                                 Add to Cart
//                                 </Button>

//                                 <Dialog open={this.state.plastic_dialog} onClose={this.handleClose} aria-labelledby="plastic_dialog">
//                                     <DialogTitle id="plastic_dialog">Add to Cart?</DialogTitle>
//                                     <DialogContent id="plastic_dialog">
//                                         <DialogContentText>
//                                             Enter your desired quantity
//                                         </DialogContentText>
//                                         <TextField
//                                             autoFocus
//                                             margin="dense"
//                                             id="name"
//                                             label="Enter quantity"
//                                             type="number"
//                                             fullWidth
//                                             onChange={this.handleChange('updating_qty')}
//                                         />
//                                     </DialogContent>
//                                     <DialogActions id="plastic_dialog">
//                                     <Button onClick={this.handleClose} color="primary">
//                                         Cancel
//                                     </Button>
//                                     <Button onClick={this.handleSubmitandClose('plastic_bottle')} color="primary">
//                                         Confirm
//                                     </Button>
//                                     </DialogActions>
//                                 </Dialog>
//                             </Grid>
//                         </Grid>
//                         </Paper>
//                     </Grid>
                
// {                           /* Batteries                 */}
//                     <Grid
//                         item
//                         direction="column"
//                         justify="center"
//                         alignItems="center">
//                         <Paper elevation={2} variant="outlined">
//                         <Grid 
//                             container
//                             direction="row"
//                             justify="space-around"
//                             alignItems="center"
//                             spacing={3}>
//                             <Grid item><img src={eWasteImg} /></Grid>
//                             <Grid item>
//                                 {(this.state.batteries!=null)? <p>{this.state.batteries}</p> : <p>0</p>}
//                                 <Button value="ewaste" variant="contained" size="medium" onClick={this.handleClickOpen.bind(this, "ewaste")}>
//                                 Add to Cart
//                                 </Button>

//                                 <Dialog open={this.state.ewaste_dialog} onClose={this.handleClose} aria-labelledby="ewaste_dialog">
//                                     <DialogTitle id="ewaste_dialog">Add to Cart</DialogTitle>
//                                     <DialogContent>
//                                         <DialogContentText>
//                                             Enter your desired quantity
//                                         </DialogContentText>
//                                         <TextField
//                                             autoFocus
//                                             margin="dense"
//                                             id="name"
//                                             label="Enter quantity"
//                                             type="number"
//                                             fullWidth
//                                             onChange={this.handleChange('updating_qty')}
//                                         />
//                                     </DialogContent>
//                                     <DialogActions>
//                                     <Button onClick={this.handleClose} color="primary">
//                                         Cancel
//                                     </Button>
//                                     <Button onClick={this.handleSubmitandClose('batteries')} color="primary">
//                                         Confirm
//                                     </Button>
//                                     </DialogActions>
//                                 </Dialog>
//                             </Grid>
//                         </Grid>
//                         </Paper>
//                     </Grid>

//             {/* Glass */}
//                     <Grid
//                         item
//                         direction="column"
//                         justify="center"
//                         alignItems="center">
//                         <Paper elevation={3} variant="outlined">
//                         <Grid 
//                             container
//                             direction="row"
//                             justify="space-around"
//                             alignItems="center"
//                             spacing={2}>
//                             <Grid item><img src={glassImg} /></Grid>
//                             <Grid item>
//                                 {/* <Button variant="contained" size="medium" onClick={this.handleClick('plastic_bottle')}>
//                                 Add to Cart
//                                 </Button> */}
//                                 {(this.state.glass!=null)? <p>{this.state.glass}</p> : <p>0</p>}
//                                 <Button value="glass" variant="contained" size="medium" onClick={this.handleClickOpen.bind(this, "glass")}>
//                                 Add to Cart
//                                 </Button>

//                                 <Dialog open={this.state.glass_dialog} onClose={this.handleClose} aria-labelledby="glass_dialog">
//                                     <DialogTitle id="glass_dialog">Add to Cart</DialogTitle>
//                                     <DialogContent>
//                                         <DialogContentText>
//                                             Enter your desired quantity?
//                                         </DialogContentText>
//                                         <TextField
//                                             autoFocus
//                                             margin="dense"
//                                             id="name"
//                                             label="Enter quantity"
//                                             type="number"
//                                             fullWidth
//                                             onChange={this.handleChange('updating_qty')}
//                                         />
//                                     </DialogContent>
//                                     <DialogActions>
//                                     <Button onClick={this.handleClose} color="primary">
//                                         Cancel
//                                     </Button>
//                                     <Button onClick={this.handleSubmitandClose('glass')} color="primary">
//                                         Confirm
//                                     </Button>
//                                     </DialogActions>
//                                 </Dialog>
//                             </Grid>
//                         </Grid>
//                         </Paper>
//                     </Grid>

//                     <Grid
//                         container="true"
//                         direction="column"
//                         justify="center"
//                         alignItems="center">
//                         <Button 
//                             variant="contained" color="primary" size="large" 
//                             component={RouterLink} 
//                             to={{
//                                pathname:'/Confirmation', 
//                                state: this.state
//                             }}>
//                             Proceed!
//                         </Button>
//                     </Grid>


//             </Grid>
//             </div>
//             </MuiThemeProvider>
//             </section>

//             </div>
//         </div>
//     );
//     }
// }

// export default Wasteitem;
