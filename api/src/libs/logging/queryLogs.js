import readLastLines from 'read-last-lines';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';

clear();

console.log(
  chalk.yellow(
    figlet.textSync('BoardHub Logs'),
  ),
);

const argv = yargs(hideBin(process.argv)).argv;
const currentLogFiles = ['exceptions', 'errors', 'rejections'];

const readLogFile = (filename = 'errors', lines = 10) => {
  readLastLines.read(`logs/${filename}.log`, lines)
    .then(data => console.log(data))
    .catch(error => console.log(chalk.red('There was an error, check that the file exists.')));
};

if (!argv.name || argv.lines <= 0) {
  console.log(
    chalk.red('One of the provided args is invalid, default ones will be used.'),
  );
  console.log('');
  readLogFile();
}
else {
  const validLogName = currentLogFiles.find(filename => filename === argv.name);

  if (validLogName) {
    console.log(
      chalk.greenBright(`Querying ${argv.name}!`),
    );
    console.log('');
    readLogFile(argv.name, argv.lines);
  }
  else {
    console.log(
      chalk.red('One of the provided values is invalid, try again.'),
    );
    process.exit();
  }
}
