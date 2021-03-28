import { app, PORT } from './app';
import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';

app.listen(PORT, () => {
  clear();
  console.log(chalk.magenta(figlet.textSync('Board Hub API')));
  console.log(chalk.greenBright(`Up and running on http://localhost:${PORT}/`));
});
