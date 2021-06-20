import dayjs = require('dayjs');
import utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

export default dayjs;
