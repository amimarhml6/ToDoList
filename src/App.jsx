import './App.css'
import ToDoList from './Page/ToDoList'
import { createTheme ,ThemeProvider} from '@mui/material/styles';
import { green , blue} from '@mui/material/colors';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { DialogsProvider } from '@toolpad/core/useDialogs';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: blue[500],
    },

  },
});

function App() {


  return (
    <DialogsProvider>
      <NotificationsProvider>
        <ThemeProvider theme={theme}>
          <div className='haha'>
            <ToDoList/>
          </div>
        </ThemeProvider>
      </NotificationsProvider>
    </DialogsProvider>

      

  )
}

export default App
