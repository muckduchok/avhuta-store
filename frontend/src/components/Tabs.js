import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs className="tabs" centered value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Описание" {...a11yProps(0)} />
          <Tab label="Характеристики" {...a11yProps(1)} />
          <Tab label="Отзывы" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel className="tabs-app" value={value} index={0}>
        Цветной монитор с TFT сенсорным экраном 7 дюймов, подключение 2 вызывных панелей и 2 видеокамер. Разговор по громкой связи, есть интерком на 3 видеодомофона. Соединение с вызывной панелью 4 проводное. Слот microSD до 32 Гб, питание 100-240V, 50-60 Hz, потребление 9W, в режиме 
<div>
        <pre>ФУНКЦИОНАЛ ВИДЕОДОМОФОНА Tantos Neo Slim (белый) 7"

• к домофону возможно подключить одновременно 2 вызывные панели и 2 аналоговых 
видеокамеры, а также параллельно подключить еще 3 видеодомофона;
• домофон Tantos Neo Slim (white) 7" оснащен цветным TFT-экраном с диагональю 7 дюймов, высокой четкостью и хорошей цветопередачей;
• слот на microSD карту объемом до 32 Гб (класс не ниже 6-го);
• встроенный видеорегистратор (датчик движения на 1 канал)
• интерком;
• функция общего вызова;
• разговор с посетителем осуществляется в режиме громкой связи (HandsFree);
• работа как в индивидуальном, так и многоквартирном режиме.</pre></div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}