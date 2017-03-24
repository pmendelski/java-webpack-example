import path from 'path';
import colors from 'chalk';

const cwd = process.cwd();

const getCallerFile = () => {
  let callerfile;
  const prepareStackTraceBackup = Error.prepareStackTrace;
  Error.prepareStackTrace = (e, stack) => stack;
  try {
    const err = new Error();
    const currentfile = err.stack.shift().getFileName();
    while (err.stack.length && (!callerfile || currentfile === callerfile)) {
      callerfile = err.stack.shift().getFileName();
    }
  } finally {
    Error.prepareStackTrace = prepareStackTraceBackup;
  }
  return callerfile;
};

const prefixTestDescription = (testType) => {
  const formatedTestType = colors.magenta(`[@${testType}]`);
  const formatedTestFile = colors.blue(path.relative(cwd, getCallerFile()));
  return colors.bold(`${formatedTestType} ${formatedTestFile}`);
};

const buildTestType = testType =>
  (description, testCase) => {
    const prefix = prefixTestDescription(testType);
    describe(`${prefix}\n  ${description}`, testCase);
  };

export const specTest = buildTestType('spec');

export const uiTest = buildTestType('ui');
