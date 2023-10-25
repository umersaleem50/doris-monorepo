import { existsSync, mkdirSync } from 'fs';
import path from 'path';
const makeStorage = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(path.join(__dirname, dir), { recursive: true });
  }
};

export default makeStorage;
