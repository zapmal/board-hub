import readLastLines from 'read-last-lines';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';

clear();

console.log(
  chalk.magenta(
    figlet.textSync('Board Hub Logs'),
  ),
);

const { name, lines } = yargs(hideBin(process.argv)).argv;
const currentLogFiles = ['exceptions', 'errors', 'rejections'];

const readLogFile = (filename = 'errors', linesToDisplay = 10) => {
  readLastLines.read(`logs/${filename}.log`, linesToDisplay)
    .then(data => console.log(data))
    .catch(error => console.log(chalk.red('There was an error, check that the file exists.')));
};

if (!name || lines <= 0) {
  console.log(
    chalk.red('One of the args is missing or it is invalid, default ones will be used.'),
  );
  console.log('');
  readLogFile();
}
else {
  const isValidLogName = currentLogFiles.find(filename => filename === name);

  if (isValidLogName) {
    console.log(
      chalk.greenBright(`Querying ${name}!`),
    );
    console.log('');
    readLogFile(name, lines);
  }
  else {
    console.log(
      chalk.red(`Requested log file "${name}" does not exist.`),
    );
    process.exit();
  }
}
