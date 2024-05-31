import config from "./../config/config.js";
import { promises as fs } from 'fs';
import path from 'path';

const {rootDirectory} = config;

const listFiles = async (directory) => {
  try {
    const files = await fs.readdir(directory);
    return files.map(file => path.join(directory, file));
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    throw error;
  }
};

export default listFiles;

