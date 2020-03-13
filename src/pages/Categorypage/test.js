
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import tileData from './tileData';


const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'visible',
    backgroundColor: theme.palette.background.paper,
    height: 'auto',
    width: 800,
  },

  indivCell: {
    "borderRadius": 25,
    width: 100,
  },

  control: {
    padding: theme.spacing(500),
  },

  gridList: {
    flexWrap: 'nowrap',
    width:700,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',

  },

  title: {
    color: theme.palette.primary,
  },

  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const theme = createMuiTheme({
    overrides: {
      // Style sheet name

      MuiButton: {
        // Name of the rule
        text: {
          // Some CSS
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //   borderRadius: 3,
        //   border: 0,
        //   color: 'white',
        //   height: 48,
        //   padding: '0 30px',
        //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        spacing: 17,
        },


      },
    },
  });



export default function SingleLineGridList() {
  const classes = useStyles();
  return (
      
    <div className={classes.root}>
    <ThemeProvider theme={theme}>
    <div className="catname">
            <h2>Plastics</h2>
          </div>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}

              actionIcon={
                <IconButton color="#FFFFFF">
                <AddShoppingCartIcon />
              </IconButton>
              }
            />
          </GridListTile>

        ))}

      </GridList>
      </ThemeProvider>
    </div>
  );
}